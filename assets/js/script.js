// Assignment Code
var generateBtn = document.querySelector("#generate");

var userInput = {

  passwordLength: null,
  wantsLowerCase: null,
  wantsUpperCase: null,
  wantsNumeric: null,
  wantsSpecialChars: null,

  getLength: function() { //interact with user until input requirements are met
    while (!Number.isInteger(this.passwordLength) || (this.passwordLength < 8 || this.passwordLength > 128)) { //passwordLength needs to be an integer 8-128
      input = window.prompt("How many characters would you like in your password? Please enter an integer between 8 and 128");
      this.passwordLength = Number.parseInt(input);
    }
  },

  getCharSet: function() {
    this.wantsLowerCase = confirm("Would you like your password to have lower case letters?");
    this.wantsUpperCase = confirm("Would you like your password to have upper case letters?");
    this.wantsNumeric = confirm("Would you like your password to have numbers?");
    this.wantsSpecialChars = confirm("Would you like your password to have special characters?");
  }
}


gen = { //i am not calling this 'generate' because that is the id of the button element-object
  pswrd: Array(),
  hasNum: false,
  hasUpper: false,
  hasLower: false,
  HasSpecial: false,

  trackCharTypes: function(letter){ //takes a char argument and checks whether it is numeric, upper case, lowercase, or special
    if(letter >= 48 && letter <= 57) {
      this.hasNum = true;
    }
    else if(letter >= 65 && letter <= 90) {
      this.hasUpper = true;
    }
    else if(letter >= 97 && letter <= 122) {
      this.hasLower = true;
    }
    else {
      this.hasSpecial = true;
    }
  },


  // 
  
  
  Password: function() {

    


    for(i=0; i<userInput.passwordLength; i++) {
      this.pswrd.push(String.fromCharCode(Math.random()*94+32)); //generate random number [32, 126], obtain ascii char with that index, assign to array

      this.trackCharTypes(this.pswrd[i]);//check rand number for whether it is Numeric, upper case, lowercase, or special
      

      //if (!(hasNumeric === userInput.hasNumeric && hasUpperCase === use)

    }
    return this.pswrd; //give the people what they want
    
    this.pswrd = Array(); //reset array in case user presses button again
  }

  

}






// Write password to the #password input
function writePassword() {
  var password = gen.Password();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


generate.onclick = function () {

  userInput.getLength();
  userInput.getCharSet();

  writePassword();
}


