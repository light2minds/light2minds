Deployment to Vercel

This project is a static site. To deploy `www.light2minds.com` on Vercel, follow these steps.

1) Push repository to GitHub (if not already)

   git init
   git add .
   git commit -m "Initial site"
   gh repo create YOUR_GITHUB_USERNAME/light2minds --public --source=. --remote=origin
   git push -u origin main

2) Import project into Vercel

- Go to https://vercel.com and sign in (GitHub recommended).
- Click "New Project" → Import Git Repository → select this repo.
- For Framework Preset choose "Static Site" (or leave autodetect). No build command is required for plain HTML/CSS/JS.
- Set the output directory to `/` (root) if prompted.
- Deploy.

3) Add your custom domain in Vercel

- In your Vercel project dashboard, go to "Settings" → "Domains" → "Add" and enter `www.light2minds.com`.
- Vercel will show the DNS records you need to add at your domain registrar.

DNS guidance (common setup):
- For `www` (recommended): create a CNAME record with host `www` and value `cname.vercel-dns.com` (or use the exact alias Vercel shows).
- For the root/apex domain (`light2minds.com`): add A records to `76.76.21.21` (Vercel's A record) OR follow Vercel's recommended configuration in the dashboard.

4) Verify and enable HTTPS

- After DNS changes propagate (can take minutes to hours), Vercel will verify the domain and issue HTTPS automatically.
- If verification fails, follow the domain-specific instructions shown in the Vercel dashboard.

Optional: Use Vercel CLI

- Install: `npm i -g vercel`
- Login: `vercel login`
- Deploy: `vercel --prod`
- Add domain via CLI: `vercel domains add www.light2minds.com`

Notes & Next steps

- If you want `light2minds.com` to redirect to `www.light2minds.com`, configure the redirect in Vercel's Domains settings (or add an apex domain and set a redirect rule).
- If you prefer I connect the repository to Vercel for you, grant access or provide the GitHub repo URL and I can create a suggested `vercel.json` and finalize settings.

GitHub Actions automatic deploy (optional)

If you'd like every push to `main` to deploy automatically via GitHub Actions, do the following:

1. Create a Vercel Personal Token:
   - In Vercel: Settings → Account → Tokens → Create Token (copy value)

2. Get your Vercel Organization ID and Project ID:
   - In your Vercel project: Settings → General → Project ID
   - For teams, grab the Team/Org ID from the Team settings.

3. In your GitHub repo settings, add the following repository secrets:
   - `VERCEL_TOKEN` — the personal token value
   - `VERCEL_ORG_ID` — your organization/team id
   - `VERCEL_PROJECT_ID` — your project id

4. A sample GitHub Actions workflow named `.github/workflows/vercel-deploy.yml` is included in this repo. Once secrets are set, pushes to `main` will trigger deployment to Vercel.

Files added to this repo to support Vercel:
- `vercel.json` — minimal Vercel config
- `CNAME` — contains `www.light2minds.com` (convenience for some registrars/workflows)
- `.github/workflows/vercel-deploy.yml` — optional GitHub Actions deploy workflow (requires secrets)

If you want, I can push this repo to GitHub and help finish the Vercel setup. Provide a GitHub repo URL or permission to create one under your account.
