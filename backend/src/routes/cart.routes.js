import express from "express";
import auth from "../middleware/auth.js";
import { getCart, setCart } from "../controllers/cart.controller.js";

const router = express.Router();

// RESTful cart endpoints
router.get("/", auth, getCart);        // GET /api/cart - get user's cart
router.post("/", auth, setCart);       // POST /api/cart - set/update user's cart

export default router; 