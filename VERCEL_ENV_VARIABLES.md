# 🔐 Vercel Environment Variables Guide

## From Your server/.env File

### ✅ ADD THESE to Vercel (Required):

| Variable Name | Value from .env | Notes |
|--------------|-----------------|-------|
| `MONGODB_URI` | `mongodb+srv://Blog_App:helloworld123@cluster0.redyb8k.mongodb.net/` | **IMPORTANT:** Already includes trailing slash - code handles it |
| `JWT_SECRET` | `your_jwt_secret_key_here_change_this_to_something_secure` | ⚠️ **Change this!** Generate a secure random string |
| `SELLER_EMAIL` | `seller@greencart.com` | ✅ Keep as is |
| `SELLER_PASSWORD` | `seller123` | ⚠️ **Change this for production!** |
| `CLOUDINARY_CLOUD_NAME` | `dlme1hjfj` | ✅ Keep as is |
| `CLOUDINARY_API_KEY` | `692953547344372` | ✅ Keep as is |
| `CLOUDINARY_API_SECRET` | `QXLpxWFFB3YN2sSX86uGmCDUmTo` | ✅ Keep as is |
| `NODE_ENV` | `production` | ⚠️ **Change from "development" to "production"** |
| `CLIENT_URL` | (not in .env - add after frontend deploys) | Your frontend Vercel URL |

### ❌ SKIP THESE (Not needed in Vercel):

| Variable | Why Skip? |
|----------|-----------|
| `PORT` | Vercel sets this automatically (you can add it, but it's optional) |
| `CLOUDINARY_URL` | Not used in your code (only CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET are used) |

---

## 🔒 Security Recommendations

### ⚠️ Before Deploying - Change These:

1. **JWT_SECRET**: 
   - Current value: `your_jwt_secret_key_here_change_this_to_something_secure`
   - **This is a placeholder!** Generate a secure random string:
   ```bash
   # Generate a secure random secret:
   openssl rand -base64 32
   # Or use: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
   - **Action:** Generate a new secret and update both `.env` and Vercel

2. **SELLER_PASSWORD**:
   - Current value: `seller123`
   - **This is weak!** Use a stronger password for production
   - **Action:** Change to a strong password and update both `.env` and Vercel

---

## 📋 Complete List for Vercel Dashboard

Add these variables in **Settings → Environment Variables**:

```
✅ MONGODB_URI = mongodb+srv://Blog_App:helloworld123@cluster0.redyb8k.mongodb.net/
✅ JWT_SECRET = [GENERATE NEW SECURE SECRET - see above]
✅ SELLER_EMAIL = seller@greencart.com
✅ SELLER_PASSWORD = [CHANGE TO STRONG PASSWORD]
✅ CLOUDINARY_CLOUD_NAME = dlme1hjfj
✅ CLOUDINARY_API_KEY = 692953547344372
✅ CLOUDINARY_API_SECRET = QXLpxWFFB3YN2sSX86uGmCDUmTo
✅ NODE_ENV = production
✅ CLIENT_URL = [Add after frontend deploys - your frontend Vercel URL]
```

---

## 🚨 Critical Notes:

1. **MONGODB_URI**: Your current value has a trailing slash `/` - that's OK! The code handles it correctly.

2. **JWT_SECRET**: You MUST change this from the placeholder value. Use a strong random secret.

3. **SELLER_PASSWORD**: Consider changing this to a stronger password for production.

4. **CLIENT_URL**: Add this AFTER you deploy the frontend and get its URL.

5. **NODE_ENV**: Must be `production` (not `development`) for proper cookie security.

