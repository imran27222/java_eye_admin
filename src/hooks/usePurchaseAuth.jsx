import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BUY_TIME } from "../utils/timeLimit";
import { formatMilliseconds } from "../utils/formatMilisecond";

const usePurchaseAuth = () => {
  const { user, lastPurchase } = useSelector((state) => state.user);
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
      if (now - lastPurchaseTime < BUY_TIME) {
        toast.warn(`You can only purchase once every ${formatMilliseconds(BUY_TIME)}!`);
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
