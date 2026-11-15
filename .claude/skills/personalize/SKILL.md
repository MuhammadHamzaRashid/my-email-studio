---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize a campaign for each lead group

Campaign folder: $ARGUMENTS

## 1. Check the campaign folder

- If no campaign folder was given, stop. Use Glob on `campaigns/*/` and list the campaign folders that exist. Ask which one to use. Don't write anything.
- If the folder was given but has no `emails/` folder with `.md` files in it, stop and say so. Don't write anything.

## 2. Find the lead groups

- Read `leads/leads.csv`. Use the `group` column.
- Make one list of the group names, with no repeats. Right now these should be `tea-curious`, `gift-buyers` and `daily-drinkers`.
- Only read the `group` column. Don't copy names or email addresses from the file into any email.

## 3. Read the rules first

Before you write, read these and follow them:

- `brand/voice.md`: our voice, the words we avoid and the claims we never make.
- `.claude/rules/emails.md`: the rules every email file must follow.

## 4. Write one version per group

Do this for every `.md` file in `<campaign folder>/emails/`, and for every group.

**Keep exactly the same:**
- The structure: same sections, in the same order.
- The `Subject:` line and the `Preview:` line.
- The one main link, with its button text and URL.
- The sign-off and the two-line footer, as plain text.
- Every placeholder, like `{{first_name}}`, `{{company_address}}` and `{{unsubscribe_url}}`.

**Change only two things:**
1. **The opening line**: the first sentence after the greeting. Rewrite it so it speaks to that group.
2. **One example**: pick one example, detail or picture in the body and swap it for one that fits that group.

How each group feels:
- **tea-curious**: new to loose-leaf tea. They want a gentle start and no fuss.
- **gift-buyers**: looking for a present for someone else. Talk about the person they're giving to.
- **daily-drinkers**: already have tea every day. They want something new for a ritual they already love.

Keep everything else word for word. Don't add new claims, prices, dates or facts. If you're not sure something is true, leave it out.

## 5. Save the files

- Save each version to `<campaign folder>/groups/<group>/emails/<same file name>`.
- If that file already exists, don't overwrite it. Skip it and say so in the summary.

## 6. Check your work

Before you reply, check every file you wrote:
- Subject, preview, link and footer match the original exactly.
- No words from the "Words we avoid" list in `brand/voice.md`.
- No health claims, and no "organic" unless the original says it.
- No three backticks in a row.

Fix anything that fails.

## 7. Reply with a short summary only

Reply with just this:

- How many files you wrote (and how many you skipped, if any).
- One example opening line for each group.

Nothing else. Don't paste the full emails.
