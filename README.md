# atdautomotive.github.io

Landing page for **ATD Mobile Automotive** — Japanese and Korean vehicle specialists (workshop in Ferndale, New Plymouth, or mobile by appointment).

**Live site:** [https://atdautomotive.github.io](https://atdautomotive.github.io)

---

## Who should edit

This repo is **public** (anyone can see it). Only the **owner** or **admin** (or whoever has commit access) should make edits. If you haven’t been given access, don’t try to push changes — they’ll be rejected. Repo settings can be tightened so only specific people can commit; that’s separate from this guide.

---

## Guide for owner / admin: find the repo and make edits

### 1. Open the project

1. In your browser go to: **https://github.com/ATD-Automotive/atdautomotive.github.io**
2. **Files to edit:**
   - **`index.html`** — all visible text (name, tagline, services, about, contact, meta tags, JSON-LD). Start here for copy changes.
   - **`css/styles.css`** — colours (top `:root` block), fonts, spacing, layout. Edit to change look.
   - **`js/main.js`** — phone number (the `['027', '515', '1399']` array) and tap-to-call behaviour.
3. GitHub Pages serves everything from the repo root; the site works with these relative paths. Don’t move or rename `index.html`, `css/`, or `js/` unless you update the links.

### 2. View the live site

- **https://atdautomotive.github.io** — this is what customers see. Changes you commit can take a minute or two to show up.

### 3. How to edit (recommended)

**Option A — Copy the file into an AI**  
Open `index.html` on GitHub, click **Raw**, then copy the whole page. Paste it into ChatGPT, Claude, or another AI and say what you want changed (e.g. “Update the phone number to 027 123 4567”, “Change the email to …”). Copy the AI’s edited version back, then on GitHub edit `index.html` (pencil icon), paste over the contents, and commit.

**Option B — Use Cursor IDE**  
Open this repo in [Cursor](https://cursor.com) (or clone it and open the folder). Open `index.html` and use the AI in Cursor to make the edits (e.g. “Update the phone number to …”). Save, then push/commit your changes. Cursor can handle Git for you.

**Option C — Edit directly on GitHub**  
Click the file you need, then the **pencil icon**. Use **Ctrl+F** / **Cmd+F** to find text:
- **index.html**: Email (`Atdmobileautomotive@outlook.com`), location text (`Ferndale`), tagline, services, about copy.
- **js/main.js**: Phone number — edit the array `['027', '515', '1399']`.
- **css/styles.css**: Colours — edit the `:root` block at the top.  
Then add a commit message and click **Commit changes**.

### 4. Making the site Google searchable and visible on Maps

**Already in the site (no extra work):**

- **Structured data** — The page includes local-business markup (JSON-LD) so Google can understand the business and show it in search and on Maps.
- **NZ-only signals** — The page declares it’s for New Zealand: `hreflang="en-NZ"`, `geo.region`, and `areaServed` (Country: NZ + Place: New Plymouth). This helps Google show the site to NZ searchers rather than internationally.
- **Canonical URL and meta tags** — So search engines know the main URL and how to describe the site.
- **`robots.txt`** — Tells crawlers they can index the site and where the sitemap is.
- **`sitemap.xml`** — Tells Google which page(s) exist so it can crawl them.

**What you need to do in Google’s tools:**

1. **Google Search Console** (free)  
   - Go to [search.google.com/search-console](https://search.google.com/search-console).  
   - Add a property with your site URL (the same URL as the live site, e.g. `https://atd-automotive.github.io/atdautomotive.github.io/`).  
   - Prove you own the site (e.g. add the HTML tag they give you into the `<head>` of `index.html`, or use the DNS method if you have a custom domain).  
   - Submit your sitemap: `https://atd-automotive.github.io/atdautomotive.github.io/sitemap.xml`.  
   - **International targeting:** In Search Console, open **Settings** → **International targeting** and set **Country** to **New Zealand**. That tells Google to treat the site as NZ-only and prefer it for NZ searches.  
   - Google will then crawl and can show the site in search (especially to NZ users).

2. **Google Business Profile** (free) — so the business appears on Google Maps and in local search:  
   - Go to [business.google.com](https://business.google.com).  
   - Create or claim the business (e.g. “ATD Mobile Automotive”, Ferndale / New Plymouth).  
   - Add your **website URL** (the same as above).  
   - Add phone, area served (e.g. New Plymouth / Taranaki), and “By appointment”.  
   - Complete verification (usually by postcard to the business address).  
   Once verified, Google can link your website to the map listing; the structured data in the page helps with that.

**When you add a custom domain (e.g. atdautomotive.co.nz):**  
Update in `index.html`: the `rel="canonical"` link, the `og:url` meta tag, and the `url` inside the `<script type="application/ld+json">` block. Update `robots.txt` and `sitemap.xml` to use the new domain.

---

### 5. What not to change

- Change only **text and numbers**. Do not delete or alter symbols like `<`, `>`, `"`, `'`, or `=` or the page can break.
- If the site breaks after an edit, the repo owner can revert that commit from the GitHub history.
