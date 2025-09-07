import Cart from "../models/Cart.js";

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    return res.json({ items: cart ? cart.items : [] });
  } catch (err) {
    next(err);
  }
};

export const setCart = async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ message: "items array required" });
    const cart = await Cart.findOneAndUpdate(
      { userId: req.userId },
      { $set: { items } },
      { upsert: true, new: true }
    );
    return res.json({ items: cart.items });
  } catch (err) {
    next(err);
  }
};

export const addItem = async (req, res, next) => {
  try {
    const { productId, name, price, image, quantity = 1 } = req.body;
    if (!productId || !name || !price) return res.status(400).json({ message: "Missing product fields" });
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      const created = await Cart.create({ userId: req.userId, items: [{ productId, name, price, image, quantity }] });
      return res.json({ items: created.items });
    }
    const idx = cart.items.findIndex((i) => i.productId === productId);
    if (idx >= 0) {
      cart.items[idx].quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, image, quantity });
    }
    await cart.save();
    return res.json({ items: cart.items });
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const item = cart.items.find((i) => i.productId === productId);
    if (!item) return res.status(404).json({ message: "Item not found" });
    item.quantity = quantity;
    await cart.save();
    return res.json({ items: cart.items });
  } catch (err) {
    next(err);
  }
};

export const removeItem = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.items = cart.items.filter((i) => i.productId !== productId);
    await cart.save();
    return res.json({ items: cart.items });
  } catch (err) {
    next(err);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndUpdate({ userId: req.userId }, { $set: { items: [] } }, { new: true });
    return res.json({ items: cart ? cart.items : [] });
  } catch (err) {
    next(err);
  }
}; 