pragma solidity ^0.4.24;

contract ProductResume {

  string id;
  string name;
  string info;

  // Contract version
  function getVersion() public pure returns(string) {
    return "0.1";
  }

  // Save product information
  function save(string _id, string _name, string _info) public {

    bytes memory idTest = bytes(_id);

    require(idTest.length > 0, "Product ID is required");

    id = _id;
    name = _name;
    info = _info;
  }

  function get() public view returns (string, string, string) {
    return (id, name, info);
  }
}
