import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../../Features/Cart/cartSlice";
import { useAuth } from "../Authentication/AuthContext";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

const CartHydration = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    // Fetch user's cart from backend
    const fetchCart = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/cart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.cart && data.cart.items) {
            // Transform backend cart items to frontend format
            const transformedItems = data.cart.items.map((item) => ({
              productID: item.productId,
              productName: item.name,
              productPrice: item.price,
              frontImg: item.image,
              quantity: item.quantity,
            }));
            dispatch(setCart(transformedItems));
          }
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    fetchCart();
  }, [dispatch, isAuthenticated]);

  return null;
};

export default CartHydration; 