# 🚀 Step-by-Step Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at https://vercel.com (free account works)
2. **Vercel CLI** (optional, but recommended):
   ```bash
   npm install -g vercel
   ```

---

## 📋 Step 1: Prepare for Deployment

### 1.1 Check Your Project Structure
Make sure you have:
- ✅ `client/` folder (frontend)
- ✅ `server/` folder (backend)
- ✅ Both have their own `package.json`

### 1.2 Commit Your Changes
```bash
cd /home/ami_joy/Projects/GreenCart
git add .
git commit -m "Ready for Vercel deployment"
git push
```

---

## 🔧 Step 2: Deploy Backend (Server)

### 2.1 Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

### 2.2 Deploy Backend
```bash
cd server
vercel
```

**First time setup:**
- You'll be asked to log in: Choose "Login" and follow the browser prompts
- **Link to existing project?** → Type `N` (No) for first deployment
- **Project name?** → Type: `greencart-backend` (or your preferred name)
- **Directory?** → Press Enter (current directory: `./server`)
- **Override settings?** → Type `N` (No)

This will deploy and give you a URL like: `https://greencart-backend.vercel.app`

**📝 IMPORTANT:** Copy this URL - you'll need it for the frontend!

### 2.3 Set Backend Environment Variables

1. Go to https://vercel.com/dashboard
2. Click on your backend project (`greencart-backend`)
3. Go to **Settings** → **Environment Variables**
4. Add the following variables (one by one):

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `MONGODB_URI` | `mongodb+srv://Blog_App:helloworld123@cluster0.redyb8k.mongodb.net/greencart` | Your MongoDB connection |
| `JWT_SECRET` | (your JWT secret from server/.env) | Get from server/.env |
| `SELLER_EMAIL` | `seller@greencart.com` | From server/.env |
| `SELLER_PASSWORD` | (your seller password) | From server/.env |
| `CLOUDINARY_CLOUD_NAME` | `dlme1hjfj` | From server/.env |
| `CLOUDINARY_API_KEY` | `692953547344372` | From server/.env |
| `CLOUDINARY_API_SECRET` | `QXLpxWFFB3YN2sSX86uGmCDUmTo` | From server/.env |
| `CLIENT_URL` | (leave empty for now, add after frontend deploys) | Will add in Step 4 |
| `NODE_ENV` | `production` | Set to production |

**For each variable:**
- Click **Add New**
- Paste the **Variable Name**
- Paste the **Value**
- Select **Production** (and optionally Preview/Development)
- Click **Save**

### 2.4 Redeploy Backend
After adding environment variables, you need to redeploy:
```bash
cd server
vercel --prod
```

Or go to Vercel Dashboard → **Deployments** → Click the 3 dots → **Redeploy**

---

## 🎨 Step 3: Deploy Frontend (Client)

### 3.1 Deploy Frontend
```bash
cd ../client
vercel
```

**First time setup:**
- **Link to existing project?** → Type `N` (No)
- **Project name?** → Type: `greencart-frontend` (or your preferred name)
- **Directory?** → Press Enter (current directory: `./client`)
- **Override settings?** → Type `N` (No)

This will deploy and give you a URL like: `https://greencart-frontend.vercel.app`

**📝 IMPORTANT:** Copy this URL - you'll need it for the backend CORS!

### 3.2 Set Frontend Environment Variables

1. Go to Vercel Dashboard
2. Click on your frontend project (`greencart-frontend`)
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `VITE_BACKEND_URL` | `https://greencart-backend.vercel.app` | Your backend URL from Step 2.2 |
| `VITE_CURRENCY` | `৳` | Currency symbol |

**For each variable:**
- Click **Add New**
- Paste the **Variable Name** and **Value**
- Select **Production** (and optionally Preview/Development)
- Click **Save**

### 3.3 Redeploy Frontend
```bash
cd client
vercel --prod
```

Or redeploy from Vercel Dashboard.

---

## 🔗 Step 4: Connect Frontend and Backend

### 4.1 Update Backend CORS Configuration

1. Go to Vercel Dashboard → Backend project
2. Go to **Settings** → **Environment Variables**
3. Find or add `CLIENT_URL`
4. Set value to your frontend URL: `https://greencart-frontend.vercel.app`
5. Click **Save**

### 4.2 Redeploy Backend (Final Step)
```bash
cd server
vercel --prod
```

Or redeploy from Vercel Dashboard.

---

## ✅ Step 5: Verify Deployment

### 5.1 Test Backend
Visit: `https://greencart-backend.vercel.app`

You should see: `API is working...`

### 5.2 Test Frontend
Visit: `https://greencart-frontend.vercel.app`

The website should load!

### 5.3 Test Functionality
1. ✅ User registration/login
2. ✅ Seller login
3. ✅ Product listing
4. ✅ Add to cart
5. ✅ Place order

---

## 🔄 Quick Commands Reference

```bash
# Deploy backend
cd server
vercel --prod

# Deploy frontend
cd client
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]
```

---

## ⚠️ Troubleshooting

### Issue: "Environment variable not found"
- Make sure you added env vars in Vercel Dashboard
- Redeploy after adding env vars
- Check variable names match exactly (case-sensitive)

### Issue: CORS errors
- Make sure `CLIENT_URL` in backend matches your frontend URL
- Redeploy backend after updating `CLIENT_URL`

### Issue: MongoDB connection fails
- Check `MONGODB_URI` is correct (no trailing slash)
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### Issue: Build fails
- Check Node.js version matches (should be 20.x)
- Check `package.json` has correct scripts
- Check `vercel.json` configuration

---

## 📝 Next Steps

1. **Custom Domain** (optional):
   - Go to Project Settings → Domains
   - Add your custom domain

2. **Monitor Deployments**:
   - Check Vercel Dashboard for build logs
   - Monitor function logs for errors

3. **Update Environment Variables**:
   - Any changes to env vars require redeployment

---

## 🎉 Success!

Once deployed, your app will be live at:
- **Frontend:** `https://greencart-frontend.vercel.app`
- **Backend:** `https://greencart-backend.vercel.app`

**Note:** Vercel gives you free HTTPS and global CDN automatically!
