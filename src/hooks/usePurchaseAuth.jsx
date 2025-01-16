import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/axios";
import { fetchUser } from "../store/user/userSlice";

const usePurchaseAuth = () => {
  const { user, lastPurchase } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const canPurchase = (price) => {
    if (!user) {
      navigate("/login");
      return false;
    }
    if (!user.is_verified) {
      toast.warn("Please verify your email first!");
      return false;
    }
    if (user.current_balance < price) {
      toast.warn("Current Credit is Lower then Product Price!");
      return false;
    }
    if (lastPurchase) {
      const lastPurchaseTime = new Date(lastPurchase.created_at);
      const now = Date.now();
      if (now - lastPurchaseTime < 24 * 60 * 60 * 1000) {
        toast.warn("You can only purchase once every 24 hours!");
        return false;
      }
    }
    return true;
  };

  const makePurchase = async (product) => {
    if (canPurchase(product.product_price)) {
      try {
        const { setLastPurchase } = await import("../store/user/userSlice"); // Import the logout action
        // Make the purchase call here

        const response = await api.post("/products/buy", product);
        if (response) {
          dispatch(setLastPurchase(response.data.product));
          dispatch(fetchUser());
          toast.success("Purchase successful!");
        }
      } catch (error) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error);
        }
      }
    }
  };

  return { canPurchase, makePurchase };
};

export default usePurchaseAuth;
