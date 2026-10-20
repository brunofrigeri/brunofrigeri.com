// Generates 1200x630 social preview images into public/og/ using headless
// Chrome (run locally with `yarn og`, then commit the PNGs). Vercel never runs
// this: the images are static assets.
//
//   yarn og            -> every post + the default image
//   yarn og <slug>     -> a single post
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const matter = require("gray-matter");

const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const postsDir = path.join(process.cwd(), "posts");
const outDir = path.join(process.cwd(), "public", "og");

const escapeHtml = (value = "") =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const page = ({ eyebrow, title, highlight, footer }) => `<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; width: 1200px; height: 630px; background: #FAFAF8; color: #0A0A0A; }
  body { font-family: "Bricolage Grotesque", sans-serif; padding: 56px 64px; display: flex; flex-direction: column; border-top: 14px solid #0A0A0A; }
  .brand { display: flex; align-items: center; gap: 16px; font-weight: 800; font-size: 28px; }
  .mark { width: 52px; height: 52px; background: #0A0A0A; color: #FAFAF8; display: grid; place-items: center; font-size: 22px; }
  .eyebrow { margin-left: auto; font-family: "DM Mono", monospace; font-size: 22px; letter-spacing: .08em; text-transform: uppercase; color: #4A4A47; }
  .title { margin: auto 0; font-weight: 800; letter-spacing: -0.045em; line-height: .98; text-wrap: balance; }
  .title.long { font-size: 72px; } .title.mid { font-size: 88px; } .title.short { font-size: 112px; }
  .hl { background: #C6F135; padding: 0 14px; display: inline-block; margin-top: 8px; }
  .footer { display: flex; justify-content: space-between; border-top: 3px solid #0A0A0A; padding-top: 22px; font-family: "DM Mono", monospace; font-size: 24px; color: #4A4A47; white-space: nowrap; }
  .footer .site { background: #C6F135; color: #0A0A0A; padding: 2px 12px; font-weight: 500; }
</style></head><body>
  <div class="brand"><div class="mark">BF</div>Bruno Frigeri<span class="eyebrow">${escapeHtml(eyebrow)}</span></div>
  <div class="title ${title.length > 70 ? "long" : title.length > 38 ? "mid" : "short"}">${escapeHtml(title)}${highlight ? `<br><span class="hl">${escapeHtml(highlight)}</span>` : ""}</div>
  <div class="footer"><span class="site">${escapeHtml(footer[0])}</span><span>${escapeHtml(footer[1])}</span></div>
</body></html>`;

const render = (html, outFile) => {
  const htmlFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "og-")), "og.html");
  fs.writeFileSync(htmlFile, html);
  execFileSync(CHROME, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars",
    "--window-size=1200,630", "--virtual-time-budget=15000",
    `--screenshot=${outFile}`, `file://${htmlFile}`,
  ], { stdio: "ignore" });
  console.log("wrote", path.relative(process.cwd(), outFile));
};

fs.mkdirSync(outDir, { recursive: true });
const only = process.argv[2];

if (!only || only === "default") {
  render(
    page({
      eyebrow: "Software Engineer",
      title: "Senior Software Engineer.",
      highlight: "React · TypeScript · AI",
      footer: ["brunofrigeri.com", "Coinbase"],
    }),
    path.join(outDir, "default.png")
  );
}

fs.readdirSync(postsDir)
  .filter((file) => file.endsWith(".mdx"))
  .forEach((file) => {
    const slug = file.replace(/\.mdx$/, "");
    if (only && only !== slug) return;
    const { data } = matter(fs.readFileSync(path.join(postsDir, file), "utf8"));
    if (data.locale !== "en") return;
    const date = new Date(data.date).toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
    });
    render(
      page({
        eyebrow: (data.stacks || []).slice(0, 3).join(" · "),
        title: data.title,
        footer: ["brunofrigeri.com/blog", date],
      }),
      path.join(outDir, `${slug}.png`)
    );
  });
