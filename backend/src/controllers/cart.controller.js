import Cart from "../models/Cart.js";

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    return res.json({ 
      success: true, 
      cart: { 
        items: cart ? cart.items : [] 
      } 
    });
  } catch (err) {
    next(err);
  }
};

export const setCart = async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ message: "items array required" });
    
    // Remove duplicates by productId before saving
    const uniqueItems = items.reduce((acc, item) => {
      const existingIndex = acc.findIndex(existing => existing.productId === item.productId);
      if (existingIndex >= 0) {
        // If item exists, add quantities together
        acc[existingIndex].quantity += item.quantity;
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
    
    const cart = await Cart.findOneAndUpdate(
      { userId: req.userId },
      { $set: { items: uniqueItems } },
      { upsert: true, new: true }
    );
    return res.json({ 
      success: true, 
      cart: { 
        items: cart.items 
      } 
    });
  } catch (err) {
    next(err);
  }
}; 