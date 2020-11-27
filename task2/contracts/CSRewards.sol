// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;

import "./IERC20.sol";
import "./SafeMath.sol";


contract CSRewards is IERC20 {
    using SafeMath for uint256;

    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;

    uint256 private _totalSupply;
  
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    address private _admin;
    
    constructor (string memory name, string memory symbol,uint8 decimal) {
        _name = name;
        _symbol = symbol;
        _decimals = decimal;
        _admin = msg.sender;
    }

    /* -----------Core ERC20 Functions ------------*/
    
    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function totalSupply() override public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) override public view returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) override public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function allowance(address owner, address spender) override public view returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) override public returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) override public returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }

    /* ------------------------- */
    
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }

    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }

    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
    
    /*-------------------------*/ 
    
    /*------------Custom Function and State variables--------*/
    struct club {
        string clubname;
        string incharge;
    }
    
    mapping(uint => uint) public StudentInClub;
    mapping (uint => string) public students;
    mapping (uint => club) public clubs;
    
    function enrollStudent(uint _id, string memory _sname) public {
        students[_id] = _sname;
        _mint(_admin, 1000);
    }
    
    function startAClub(uint _clubid, string memory _clubname, string memory _inchargeName) public {
        clubs[_clubid].clubname = _clubname;
        clubs[_clubid].incharge = _inchargeName;
    }
    
    function enrollStudentInClub(uint _studentid, uint _clubid, address _inchargeAddress) public {
        StudentInClub[_studentid] = _clubid;
        _approve(_admin, _inchargeAddress, _allowances[_admin][_inchargeAddress].add(1000));
    }
    
    function reward(address _studentAdress, uint _amount) public {
        transferFrom(_admin, _studentAdress, _amount);
    }
    /*-------------------------*/

}