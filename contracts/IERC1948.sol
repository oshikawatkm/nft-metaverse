pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC1948 contract.
 */
interface IERC1948 {

  event DataUpdated(uint256 indexed tokenId, string oldData, string newData);

  function readData(uint256 tokenId) external view returns (string memory);

  function writeData(uint256 tokenId, string memory newData) external;

}