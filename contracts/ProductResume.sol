pragma solidity ^0.4.16;

contract ProductResume {
    
  struct Product {
    string id;
    string name;
    string info;
    //
    uint seq;
    uint8 flag; // 0: product不存在, 1: product存在
  }
    
    // product id => product
  mapping(string => Product) products;
    
  // seq => product id
  string[] idList;
    
  // Contract version
  // 0.1.1 : Add multi product
  function getVersion() public pure returns(string) {
    return "0.1.1";
  }
    
    // 新增產品
  function addProduct(string _id, string _name, string _info) public {
    require(bytes(_id).length > 0, "Product id cannot be empty");
    require(products[_id].flag == 0, "Product id is duplicated");
    
    products[_id] = Product({
        id: _id,
        name: _name,
        info: _info,
        seq: idList.length,
        flag: 1
    });
      
      // 紀錄product id
      idList.push(_id);
    }
    
  // 更新產品
  function updateProduct(string _id, string _name, string _info) public {
    require(products[_id].flag == 1, "Product id does not exist"); 
    
    products[_id] = Product({
      id: _id,
      name: _name,
      info: _info,
      seq: products[_id].seq,
      flag: 1
    });
  }
  
  // 由 product id 取得產品
  function getProduct(string _productId) public view returns(string _id, string _name, string _info, uint _seq) {
    require(idList.length > 0, "There is no product");
    
    Product memory p = products[_productId];
    
    return (p.id, p.name, p.info, p.seq);
  }
  
  // 取得產品數量
  function getProductCount() public view returns(uint count) {
    return idList.length;
  }
  
  // 由產品流水號 seq 取得產品
  function getProductBySeq(uint _productSeq) public view returns(string _id, string _name, string _info, uint _seq) {
    require(idList.length > 0, "There is no product");
    require(idList.length > _productSeq, "Seq is out of range");
      
    // Get product id from id list
    string memory pid = idList[_productSeq];
    
    // Get prodcut
    Product memory p = products[pid];
    
    return (p.id, p.name, p.info, p.seq);
  }
}