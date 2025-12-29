# 🚀 Vercel Deployment Checklist

## ✅ Project Status: READY FOR DEPLOYMENT

### ✅ What's Working:
1. **Client builds successfully** - Tested with `npm run build`
2. **All configuration files present**:
   - `client/vercel.json` ✅
   - `server/vercel.json` ✅
   - `client/.nvmrc` (Node 20.18.0) ✅
   - `.gitignore` excludes `.env` files ✅

3. **Code Quality**:
   - MongoDB connection fixed (trailing slash issue resolved)
   - CORS configured for production
   - All critical bugs fixed

### ⚠️  BEFORE DEPLOYING - Set Up Environment Variables in Vercel:

#### For CLIENT (Frontend):
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `VITE_BACKEND_URL` = Your backend Vercel URL (e.g., `https://your-backend.vercel.app`)
   - `VITE_CURRENCY` = `৳`

#### For SERVER (Backend):
1. Go to Vercel Dashboard → Your Backend Project → Settings → Environment Variables
2. Add ALL of these:
   - `MONGODB_URI` = `mongodb+srv://Blog_App:helloworld123@cluster0.redyb8k.mongodb.net/greencart`
   - `JWT_SECRET` = (your JWT secret)
   - `SELLER_EMAIL` = `seller@greencart.com`
   - `SELLER_PASSWORD` = (your seller password)
   - `CLOUDINARY_CLOUD_NAME` = `dlme1hjfj`
   - `CLOUDINARY_API_KEY` = `692953547344372`
   - `CLOUDINARY_API_SECRET` = `QXLpxWFFB3YN2sSX86uGmCDUmTo`
   - `CLIENT_URL` = Your frontend Vercel URL (e.g., `https://your-frontend.vercel.app`)
   - `NODE_ENV` = `production`
   - `PORT` = (Vercel sets this automatically, but you can set it as backup)

### 📝 Deployment Steps:

1. **Deploy Backend First:**
   ```bash
   cd server
   vercel --prod
   ```
   - Copy the deployment URL (e.g., `https://your-backend.vercel.app`)
   - Add environment variables in Vercel dashboard
   - Redeploy if needed

2. **Deploy Frontend:**
   ```bash
   cd client
   vercel --prod
   ```
   - Set `VITE_BACKEND_URL` to your backend URL
   - Redeploy after adding env vars

3. **Update Backend CORS:**
   - After frontend is deployed, update `CLIENT_URL` in backend env vars
   - Redeploy backend

### ⚠️  Important Notes:
- MongoDB URI should NOT have trailing slash (already fixed in code)
- CORS is configured to accept your production client URL via `CLIENT_URL` env var
- Make sure to deploy backend FIRST, then frontend, then update CORS

### 🔍 Testing After Deployment:
1. Test user registration/login
2. Test seller login
3. Test product listing
4. Test cart functionality
5. Test order placement

