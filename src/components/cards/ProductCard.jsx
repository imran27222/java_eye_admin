import { WalletIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ProductCard = ({ id, title, price, image }) => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const onBuyClick = () => {
    if (user) {
      if (user.current_balance > 0) {
        navigate("/buy");
      } else {
        toast.error("Please deposit credit to buy!");
      }
    } else {
      toast.error("Please Login first to buy!");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[47%] sm:w-64 flex-shrink-0">
      {/* Image Section */}
      <img
        src={image} // Replace with your actual image URL
        alt={title}
        height={256}
        width={256}
        className="w-full h-45 object-cover"
      />

      {/* Content Section */}
      <div className="p-1 sm:p-4 flex flex-col sm:flex-row align-middle justify-between">
        <h3 className="text-xs sm:text-lg font-bold text-gray-800">{title}</h3>
        <div className="flex items-center">
          <WalletIcon className="h-3 w-3 sm:h-5 sm:w-5 text-blue-500" />
          <span className="text-blue-500 font-medium text-xs sm:text-lg ml-1">${price}</span>
        </div>
      </div>

      {/* Button Section */}
      <button
        // onClick={() => makePurchase({ product_id: id, product_name: title, product_price: price })}
        onClick={onBuyClick}
        className="w-full text-white bg-green-500 font-semibold uppercase hover:bg-green-600 transition duration-300 rounded-t-none"
      >
        Buy
      </button>
    </div>
  );
};

export default ProductCard;
