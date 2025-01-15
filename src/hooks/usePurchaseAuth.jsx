import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { setLastPurchase } from "../store/user/userSlice";

const usePurchaseAuth = () => {
  const { user, lastPurchase } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const canPurchase = () => {
    if (!user) {
      navigate("/login");
      return false;
    }
    if (!user.is_verified) {
      toast.warn("Please verify your email first!");
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
    if (canPurchase()) {
      // Make the purchase call here

      const { setLastPurchase } = await import("../store/user/userSlice"); // Import the logout action
      dispatch(setLastPurchase({ ...product, created_at: new Date().toISOString() })); // Change product to the actual purchase data
      toast.success("Purchase successful!");
    }
  };

  return { canPurchase, makePurchase };
};

export default usePurchaseAuth;
