# Tesia Srivastava – Personal Portfolio Website

Welcome to your B.Tech AI & Data Science portfolio website! This codebase is clean, zero-dependency, and built from scratch using HTML5, Vanilla CSS, and modern JavaScript. It has been designed specifically to showcase your academic achievements, projects, and soft skills to recruiters and consultants.

---

## 📂 Project Structure

```text
tesia-portfolio/
├── index.html            # Core layout & content sections
├── styles.css            # Custom CSS styles, themes, and animations
├── app.js                # App logic, theme toggle, modals, filters
├── README.md             # Handover instructions (this document)
└── assets/
    ├── profile-avatar.png     # Your profile photo (replace this)
    └── resume-placeholder.pdf  # Your resume PDF (replace this)
```

---

## 🚀 Quick Start (Running Locally)

To view the website on your local computer:
1. Open the folder `tesia-portfolio` in a code editor like **VS Code**.
2. **Double-click `index.html`** to open it directly in any web browser.
3. *Alternative (Recommended)*: Install the **Live Server** extension in VS Code, right-click `index.html`, and select **Open with Live Server** to preview changes in real-time.

---

## 🛠️ How to Customize Your Content

### 1. Update Profile Photo & Resume
- **Profile Photo**: Replace the file inside `assets/profile-avatar.png` with a square photo of yourself (recommended size: `400x400px` or `500x500px`) named exactly `profile-avatar.png`.
- **Resume**: Save your resume as a PDF and replace `assets/resume-placeholder.pdf` with your PDF named exactly `resume-placeholder.pdf`.

### 2. Modify Text Content (Bio, Education, & Contact Links)
Open [index.html](file:///C:/Users/Tesia%20Srivastava/.gemini/antigravity/scratch/tesia-portfolio/index.html) in your editor and look for the following:
- **Hero Title & Bio**: Scroll down to the `<section id="home">` and edit the headings and text descriptions.
- **Education & Experience Timeline**: Go to `<section id="experience">` and update the dates, titles, and descriptive text.
- **Social Media Links**: Look at the bottom of the file in `<div class="social-links">` and replace `#` with your actual LinkedIn and GitHub profile URLs.

### 3. Add or Modify Projects
Projects are loaded dynamically in the modal view, but their cards are written in HTML for SEO indexing.
To edit projects:
1. Open [index.html](file:///C:/Users/Tesia%20Srivastava/.gemini/antigravity/scratch/tesia-portfolio/index.html) and search for the `<div class="projects-grid">`. You can edit or add project cards here.
2. Open [app.js](file:///C:/Users/Tesia%20Srivastava/.gemini/antigravity/scratch/tesia-portfolio/app.js) and look for the `projectsData` object at the top. To edit project details or add a new one, follow this template format:

```javascript
'project-id': {
    title: "Project Title",
    tags: ["Tag1", "Tag2"],
    link: "GitHub Link",
    problem: "What problem does this project solve?",
    dataTools: "What tools did you use?",
    approach: "1. Step one\n2. Step two\n3. Step three",
    results: "What did you achieve?",
    lessons: "Key learnings"
}
```
*Note: Ensure the `data-id` attribute on your HTML button card matches the key in `app.js` (e.g., `project-1`).*

### 4. Write New Blog Posts
Blog card lists exist in [index.html](file:///C:/Users/Tesia%20Srivastava/.gemini/antigravity/scratch/tesia-portfolio/index.html) inside `<section id="blog">`.
To write a new blog post:
1. Add a card in HTML inside `<div class="blog-grid">` matching the structure.
2. Open [app.js](file:///C:/Users/Tesia%20Srivastava/.gemini/antigravity/scratch/tesia-portfolio/app.js) and scroll to `blogData`. Add your post details following this format:

```javascript
'blog-id': {
    title: "Article Title",
    meta: "June 2026 • 5 min read",
    content: `
        <p class="modal-intro">Intro paragraph...</p>
        <div class="modal-body-section">
            <h4>Heading 1</h4>
            <p>Body text...</p>
        </div>
    `
}
```

---

## 🎨 Changing the Theme Colors
If you want to change the primary brand color (for example, to make it more purple or teal):
1. Open [styles.css](file:///C:/Users/Tesia%20Srivastava/.gemini/antigravity/scratch/tesia-portfolio/styles.css).
2. Go to the `:root` section.
3. Change the hex code for `--accent-primary` and its matching red-green-blue value in `--accent-primary-rgb` (used for glass opacity effects).
   - *Example (Teal)*: `--accent-primary: #0f766e;` and `--accent-primary-rgb: 15, 118, 110;`

---

## 🌐 How to Deploy for Free

Once your changes are ready, you can deploy your portfolio online so recruiters can access it.

### Option A: GitHub Pages (Recommended)
1. Initialize a Git repository inside your local folder, commit all files, and push them to a public repository on your GitHub account (e.g., `https://github.com/your-username/portfolio`).
2. On GitHub, navigate to your repository's **Settings** tab.
3. Select **Pages** from the sidebar on the left.
4. Under **Build and deployment**, select **Deploy from a branch** as the source.
5. Set the branch to `main` (or `master`) and folder to `/ (root)`. Click **Save**.
6. Wait 1-2 minutes. GitHub will provide you with a live URL (e.g., `https://your-username.github.io/portfolio`).

### Option B: Vercel / Netlify
1. Go to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) and create a free account.
2. Click **Add New Project** and connect your GitHub account.
3. Select your portfolio repository.
4. Leave all settings at default and click **Deploy**.
5. Your website will be live on a production-grade URL instantly!
