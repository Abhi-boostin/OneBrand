# OneBrand Backend

## Setup

1. Create `.env` in `backend/` with:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/onebrand
JWT_SECRET=change_me
SMTP_USER=your_gmail_username@gmail.com
SMTP_PASS=your_gmail_app_password
# Optional: CORS origin (use * for all)
CORS_ORIGIN=*
```

2. Install and run
```
cd backend
npm install
npm run dev
```

If any required env var is missing, the server will throw on startup with a clear error.

## Auth Endpoints
- POST /api/auth/register { email, password }
- POST /api/auth/verify-otp { email, otp }
- POST /api/auth/login { email, password }
- POST /api/auth/forgot-password { email }
- POST /api/auth/reset-password { email, otp, newPassword }
- GET /api/auth/me (Authorization: Bearer <token>)

## Cart Endpoints (Authorization: Bearer <token>)
- GET /api/cart/ → { items }
- POST /api/cart/set → { items: CartItem[] } replace entire cart
- POST /api/cart/add → { productId, name, price, image?, quantity? } add/increment
- POST /api/cart/update → { productId, quantity } set quantity
- POST /api/cart/remove → { productId }
- POST /api/cart/clear → clears all items

CartItem shape:
```
{
  productId: string,
  name: string,
  price: number,
  image?: string,
  quantity: number
}
``` 