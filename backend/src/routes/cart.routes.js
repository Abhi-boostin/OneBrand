import express from "express";
import auth from "../middleware/auth.js";
import { getCart, setCart, addItem, updateItem, removeItem, clearCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", auth, getCart);
router.post("/set", auth, setCart);
router.post("/add", auth, addItem);
router.post("/update", auth, updateItem);
router.post("/remove", auth, removeItem);
router.post("/clear", auth, clearCart);

export default router; 