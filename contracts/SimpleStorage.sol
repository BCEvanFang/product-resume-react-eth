pragma solidity ^0.4.24;

contract SimpleStorage {
  uint storedData;

  function getVersion() public pure returns(string) {
    return "0.1";
  }

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
