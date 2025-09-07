import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

const CartSync = () => {
  const items = useSelector((state) => state.cart.items);
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) return;
    const payload = items.map((i) => ({
      productId: i.productID,
      name: i.productName,
      price: i.productPrice,
      image: i.frontImg,
      quantity: i.quantity,
    }));
    fetch(`${API_BASE}/api/cart/set`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ items: payload }),
    }).catch(() => {});
  }, [items]);

  return null;
};

export default CartSync; 