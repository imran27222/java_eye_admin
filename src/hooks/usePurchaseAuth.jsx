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

  const makePurchase = async ({ cb, amount }) => {
    if (canPurchase(amount)) {
      cb();
    }
  };

  return { canPurchase, makePurchase };
};

export default usePurchaseAuth;
