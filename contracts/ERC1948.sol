pragma solidity ^0.8.0;

import "./IERC1948.sol";
import "./ERC721.sol";

contract ERC1948 is IERC1948, GameItem {

  mapping(uint256 => bytes32) data;

  /**
   * @dev See `IERC1948.readData`.
   *
   * Requirements:
   *
   * - `tokenId` needs to exist.
   */
  function readData(uint256 tokenId) external view override returns (bytes32) {
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
  function writeData(uint256 tokenId, bytes32 newData) override external {
    require(msg.sender == ownerOf(tokenId));
    emit DataUpdated(tokenId, data[tokenId], newData);
    data[tokenId] = newData;
  }

}