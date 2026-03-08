# atdautomotive.github.io

Landing page for **ATD Mobile Automotive** — Japanese and Korean vehicle specialists (workshop in Ferndale, New Plymouth, or mobile by appointment).

**Live site:** [https://atdautomotive.github.io](https://atdautomotive.github.io)

---

## Who should edit

This repo is **public** (anyone can see it). Only the **owner** or **admin** (or whoever has commit access) should make edits. If you haven’t been given access, don’t try to push changes — they’ll be rejected. Repo settings can be tightened so only specific people can commit; that’s separate from this guide.

---

## Guide for owner / admin: find the repo and make edits

### 1. Open the project

1. In your browser go to: **https://github.com/atdautomotive/atdautomotive.github.io**
2. The main file is **`index.html`** — that’s the whole site.

### 2. View the live site

- **https://atdautomotive.github.io** — this is what customers see. Changes you commit can take a minute or two to show up.

### 3. How to edit (recommended)

**Option A — Copy the file into an AI**  
Open `index.html` on GitHub, click **Raw**, then copy the whole page. Paste it into ChatGPT, Claude, or another AI and say what you want changed (e.g. “Update the phone number to 027 123 4567”, “Change the email to …”). Copy the AI’s edited version back, then on GitHub edit `index.html` (pencil icon), paste over the contents, and commit.

**Option B — Use Cursor IDE**  
Open this repo in [Cursor](https://cursor.com) (or clone it and open the folder). Open `index.html` and use the AI in Cursor to make the edits (e.g. “Update the phone number to …”). Save, then push/commit your changes. Cursor can handle Git for you.

**Option C — Edit directly on GitHub**  
On the repo page, click **`index.html`** then the **pencil icon**. Use **Ctrl+F** / **Cmd+F** to find and change text:
- **Phone** — search `027` or `515` or `1399` (stored as `['027', '515', '1399']`).
- **Email** — search `Atdmobileautomotive@outlook.com` and update the `mailto:` link on the same line.
- **Location** — search `Ferndale` or `Workshop in Ferndale`.
- **Tagline** — search `Japanese and Korean` or `by appointment`.  
Then add a commit message and click **Commit changes**.

### 4. What not to change

- Change only **text and numbers**. Do not delete or alter symbols like `<`, `>`, `"`, `'`, or `=` or the page can break.
- If the site breaks after an edit, the repo owner can revert that commit from the GitHub history.
