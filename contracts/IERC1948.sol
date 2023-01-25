pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC1948 contract.
 */
interface IERC1948 {

  event DataUpdated(uint256 indexed tokenId, bytes32 oldData, bytes32 newData);

  function readData(uint256 tokenId) external view returns (bytes32);

  function writeData(uint256 tokenId, bytes32 newData) external;

}