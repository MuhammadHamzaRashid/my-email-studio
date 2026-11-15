// Send guard: a PreToolUse hook for the Resend MCP tools.
// It reads the tool call as JSON on standard input.
// Exit 0 = allow. Exit 2 = block (the reason on stderr is shown to Claude).

const ALWAYS_BLOCK = new Set([
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
]);

const CHECK_ADDRESSES = new Set(["send-email", "send-batch-emails"]);

function block(reason) {
  process.stderr.write(`Send guard blocked this: ${reason}\n`);
  process.exit(2);
}

// Turn a to/cc/bcc value (string, list, or missing) into a list of plain addresses.
// Handles "Name <a@b.com>" as well as "a@b.com".
function addresses(value) {
  if (value == null) return [];
  const list = Array.isArray(value) ? value : [value];
  return list.flatMap((item) => String(item).split(",")).map((item) => {
    const match = item.match(/<([^>]+)>/);
    return (match ? match[1] : item).trim().toLowerCase();
  }).filter(Boolean);
}

let raw = "";
for await (const chunk of process.stdin) raw += chunk;

let call;
try {
  call = JSON.parse(raw);
} catch {
  block("could not read the tool call, so it was blocked to be safe.");
}

// "mcp__resend__send-email" -> "send-email"
const tool = String(call.tool_name || "").replace(/^mcp__resend__/, "");
const input = call.tool_input || {};

if (ALWAYS_BLOCK.has(tool)) {
  block(`${tool} can reach whole lists of people, so it is never allowed here.`);
}

if (CHECK_ADDRESSES.has(tool)) {
  const myEmail = (process.env.MY_EMAIL || "").trim().toLowerCase();
  const allowed = (addr) => addr.endsWith("@resend.dev") || (myEmail !== "" && addr === myEmail);

  // send-email has to/cc/bcc at the top. send-batch-emails has a list of emails.
  const emails = tool === "send-batch-emails"
    ? (Array.isArray(input.emails) ? input.emails : [])
    : [input];

  if (tool === "send-batch-emails" && emails.length === 0) {
    block("could not find the list of emails in this batch, so it was blocked to be safe.");
  }

  for (const email of emails) {
    const all = [...addresses(email.to), ...addresses(email.cc), ...addresses(email.bcc)];
    for (const addr of all) {
      if (!allowed(addr)) {
        block(`${addr} is not a @resend.dev test address or your own email (MY_EMAIL).`);
      }
    }
  }
}

process.exit(0);
