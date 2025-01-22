// export function findExactNfts(nfts, amount) {
//   let result = null;
//   const randomNFTs = nfts.sort(() => Math.random() - 0.5);

//   function backtrack(startIndex, currentSelection, currentTotal) {
//     // Base case: If the total matches the amount, save the selection and return
//     if (currentTotal === amount) {
//       result = [...currentSelection];
//       return true; // Stop further exploration
//     }

//     // If the total exceeds the amount, stop this path
//     if (currentTotal > amount) {
//       return false;
//     }

//     // Explore combinations starting from the current index
//     for (let i = startIndex; i < randomNFTs.length; i++) {
//       if (
//         backtrack(
//           i + 1, // Move to the next NFT
//           [...currentSelection, randomNFTs[i]], // Add current NFT to the selection
//           currentTotal + randomNFTs[i].price, // Update the total
//         )
//       ) {
//         return true;
//       }
//     }

//     return false; // No valid combination found
//   }

//   backtrack(0, [], 0);
//   return result || [];
// }

export function findExactNfts(nfts, amount) {
  let result = null;

  // Shuffle the NFTs for random exploration
  const randomNFTs = nfts.sort(() => Math.random() - 0.5);

  function backtrack(startIndex, currentSelection, currentTotal) {
    // Base case: If the total matches the amount, save the selection and return
    if (currentTotal === amount) {
      result = [...currentSelection];
      return true; // Stop further exploration
    }

    // If the total exceeds the amount, stop this path
    if (currentTotal > amount) {
      return false;
    }

    // Explore combinations prioritizing unique items
    for (let i = startIndex; i < randomNFTs.length; i++) {
      const nft = randomNFTs[i];
      if (
        backtrack(
          i + 1, // Move to the next unique NFT
          [...currentSelection, nft], // Add current NFT to the selection
          currentTotal + nft.price, // Update the total
        )
      ) {
        return true;
      }
    }

    // If no unique combinations work, allow repeating items
    for (let i = 0; i < randomNFTs.length; i++) {
      const nft = randomNFTs[i];
      if (
        backtrack(
          i, // Allow the same NFT to be used again
          [...currentSelection, nft], // Add the current NFT to the selection
          currentTotal + nft.price, // Update the total
        )
      ) {
        return true;
      }
    }

    return false; // No valid combination found
  }

  backtrack(0, [], 0);
  return result || [];
}
