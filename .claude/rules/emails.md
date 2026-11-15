---
paths:
  - "campaigns/**/emails/*.md"
---

# Email file rules

These rules apply to every email file in any campaign. They don't apply to plans, notes or other files.

Every email file must follow all of these:

1. **Subject and preview come first.**
   - Line 1 is `Subject: ...` and is 50 characters or fewer.
   - Line 2 is `Preview: ...` and is 90 characters or fewer.

2. **Greet the reader by name.** Use `{{first_name}}` in the greeting, for example "Hi {{first_name}},".

3. **Use exactly one main link.** Write it as a button link, like this:

   `[Button text](https://kettlebird.example/steep-club)`

   Change "Button text" to fit the email. Don't add a second main link.

4. **End with the sign-off, then the footer.** First the sign-off from `brand/voice.md`:

   Happy steeping,
   The Kettlebird crew

   Then this two-line footer. Write it as plain text, not inside a code block:

   You're getting this because you joined the Kettlebird Tea waitlist.
   Kettlebird Tea, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

Nothing comes after the footer.
