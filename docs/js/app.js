App = {  
  contracts: {},
  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    //var Web3 = require('web3')  ;  
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {

      //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        App.acc=await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = App.acc[0];  
    
  },
  loadContract: async () => {
      const Student = await $.getJSON('Student.json')
   App.contracts.Student = TruffleContract(Student)
    App.contracts.Student.setProvider(App.web3Provider)    
    App.student = await App.contracts.Student.deployed()
   
  },
  render: async () => {
    
  },
  displayCreateSudent:async ()=>{
    $("#createstudentpage").show()
    $("#displaystudent").hide()
    $("#searchstudentpage").hide();
    
  },
  displayViewSudent:async ()=>{
    $("#displaystudent").show()
    $("#createstudentpage").hide();
    $("#searchstudentpage").hide();
    $("#studentinfo").empty();
    var totalcount=await App.student.totalStudent(); 
    for(var i=1;i<=totalcount;i++){
      var st=await App.student.students(i);
      console.log(st)
      var str="<tr><td>"+i+"</td><td>"+st[0]+"</td><td>"+st[1]+"</td><td>"+st[2]+"</td><td>"+st[3]+"</td><td>"+st[4]+"</td></tr>";
      $("#studentinfo").append(str);
    }

  },
  addNewStudent :async () =>{
      var stName=$("#stName").val()
      var stClass=$("#stClass").val()
      var stCollege=$("#stCollege").val()
      var stPhone=$("#stPhone").val()
      var stEmail=$("#stEmail").val() 
      await App.student.addstudent(stName,stClass,stCollege,stPhone,stEmail,{from:App.account})  
  },
  searchSudent:async ()=>{
   $("#searchstudentpage").show();
   $("#createstudentpage").hide()
   $("#displaystudent").hide()
  },
  searchById:async () =>{
    $("#Searchstudentinfo").empty()
    var stId=$("#stId").val();
    var st=await App.student.students(stId);
    var str="<tr><td>"+stId+"</td><td>"+st[0]+"</td><td>"+st[1]+"</td><td>"+st[2]+"</td><td>"+st[3]+"</td><td>"+st[4]+"</td></tr>";
    $("#Searchstudentinfo").append(str);

  }
}
$(function () {
  $(window).load(function () { 
       App.load();
  })
});










