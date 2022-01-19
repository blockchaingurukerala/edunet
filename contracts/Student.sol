// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Student {
    uint public totalStudent=0;
    struct student{
        string name;
        string classname;
        string college;
        string phno;
        string email;
    } 
    
    mapping (uint=>student) public students;

    function addstudent(string memory _n,string memory _c,string memory _co,string memory _p,string memory _e) public {
        totalStudent=totalStudent+1;
        students[totalStudent]=student(_n,_c,_co,_p,_e);
    }
}
