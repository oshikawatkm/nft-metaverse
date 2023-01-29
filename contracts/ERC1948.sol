pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./IERC1948.sol";
import "./ERC721.sol";

contract ERC1948 is IERC1948, MetaverseModel {

  mapping(uint256 => string) data;

  /**
   * @dev See `IERC1948.readData`.
   *
   * Requirements:
   *
   * - `tokenId` needs to exist.
   */
  function readData(uint256 tokenId) external view override returns (string memory) {
    require(_exists(tokenId));
    return data[tokenId];
  }

  /**
   * @dev See `IERC1948.writeData`.
   *
   * Requirements:
   *
   * - `msg.sender` needs to be owner of `tokenId`.
   */
  function writeData(uint256 tokenId, string memory newData) override external {
    require(msg.sender == ownerOf(tokenId));
    emit DataUpdated(tokenId, data[tokenId], newData);
      _setTokenURI(tokenId, newData);
    data[tokenId] = newData;
  }

}