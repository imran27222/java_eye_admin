import React from "react";
import ProductCard from "../cards/ProductCard";
import nft1 from "../../assets/images/nft/nft1.png";
import nft2 from "../../assets/images/nft/nft2.jfif";
import nft3 from "../../assets/images/nft/nft3.jfif";
import nft4 from "../../assets/images/nft/nft4.jpg";
import nft5 from "../../assets/images/nft/nft5.jfif";
import nft6 from "../../assets/images/nft/nft6.jfif";
import nft7 from "../../assets/images/nft/nft7.jfif";
import nft8 from "../../assets/images/nft/nft8.jfif";
import nft9 from "../../assets/images/nft/nft9.png";
import nft10 from "../../assets/images/nft/nft10.jfif";
import nft11 from "../../assets/images/nft/nft11.jfif";
import nft12 from "../../assets/images/nft/nft12.jfif";

const nfts = [
  { title: "PixelProwler", price: 50, image: nft1 },
  { title: "PixelProwler", price: 100, image: nft2 },
  { title: "PixelProwler", price: 150, image: nft3 },
  { title: "PixelProwler", price: 200, image: nft4 },
  { title: "PixelProwler", price: 250, image: nft5 },
  { title: "PixelProwler", price: 300, image: nft6 },
  { title: "PixelProwler", price: 350, image: nft7 },
  { title: "PixelProwler", price: 400, image: nft8 },
  { title: "PixelProwler", price: 450, image: nft9 },
  { title: "PixelProwler", price: 500, image: nft10 },
  { title: "PixelProwler", price: 550, image: nft11 },
  { title: "PixelProwler", price: 600, image: nft12 },
];

const FeatureNFT = () => {
  return (
    <div className="p-4">
      <p className="text-2xl text-center font-bold pb-4">Our Featured NFTs</p>
      <div className="flex flex-wrap gap-4 justify-center">
        {nfts.map((nft, index) => (
          <ProductCard key={index} {...nft} />
        ))}
      </div>
    </div>
  );
};

export default FeatureNFT;
