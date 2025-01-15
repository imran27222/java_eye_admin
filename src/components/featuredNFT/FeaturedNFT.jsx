// src/components/FeatureNFT.js
import React from "react";
import ProductCard from "../cards/ProductCard";
import nfts from "../../data/nfts";

const FeatureNFT = () => {
  return (
    <div className="p-4">
      <p className="text-2xl text-center font-bold pb-4">Our Featured NFTs</p>
      <div className="flex flex-wrap gap-4 justify-center">
        {nfts.map((nft) => (
          <ProductCard key={nft.id} {...nft} />
        ))}
      </div>
    </div>
  );
};

export default FeatureNFT;
