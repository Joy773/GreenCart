# 🔧 Fixing Vercel Build Error

## The Problem
Error: `Cannot find module '/vercel/path0/client/node_modules/vite/dist/node/cli.js'`

This happens when:
1. Vercel is building from the **root directory** instead of the **client directory**
2. Dependencies aren't being installed correctly

## ✅ Solution Options:

### Option 1: Set Root Directory in Vercel (Recommended)

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **General**
2. Find **Root Directory** setting
3. Set it to: `client`
4. Save and redeploy

This tells Vercel to build from the `client/` folder, not the root.

### Option 2: Deploy Client Folder Separately

1. In Vercel Dashboard, click **Add New Project**
2. Import your Git repository
3. **Root Directory**: Set to `client`
4. Deploy

This creates a separate project just for the frontend.

### Option 3: Use Vercel CLI from Client Directory

```bash
cd client
vercel --prod
```

This ensures you're deploying from the correct directory.

## 📝 Important Notes:

1. **Make sure `package-lock.json` is committed:**
   ```bash
   cd client
   git add package-lock.json
   git commit -m "Add package-lock.json"
   git push
   ```

2. **Check Node.js version:**
   - Vercel should auto-detect from `.nvmrc` (20.18.0)
   - Or set in Vercel Settings → General → Node.js Version → 20.x

3. **Verify vercel.json:**
   - Should be in `client/vercel.json`
   - Uses `npm ci` for reliable installs

## 🔍 Verify Setup:

- ✅ `client/package.json` has `vite: "^5.4.11"` in dependencies
- ✅ `client/vercel.json` exists and is configured
- ✅ `client/.nvmrc` has Node version (20.18.0)
- ✅ `client/package-lock.json` is committed to git
- ✅ Root Directory is set to `client` in Vercel settings

