import { WalletIcon } from "@heroicons/react/24/solid";

const ProductCard = ({ title, price, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-64">
      {/* Image Section */}
      <img
        src={image} // Replace with your actual image URL
        alt={title}
        height={256}
        width={256}
        className="w-full h-45 object-cover"
      />

      {/* Content Section */}
      <div className="p-4 flex align-middle justify-between">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <div className="flex items-center">
          <WalletIcon className="h-5 w-5 text-blue-500" />
          <span className="text-blue-500 font-medium text-lg ml-1">${price}</span>
        </div>
      </div>

      {/* Button Section */}
      <button className="w-full text-white bg-green-500 font-semibold uppercase hover:bg-green-600 transition duration-300 rounded-t-none">Buy</button>
    </div>
  );
};

export default ProductCard;
