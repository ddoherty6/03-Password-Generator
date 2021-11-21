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

var pswrd = null; //creating this var outside of function - the function calls itself - idk what happens if you instantiate multiple times
var generatePassword = function() {
  

  for(i=0; i<userInput.passwordLength; i++) {
    pswrd.push(String.fromCharCode(Math.random()*94+32)); //generate random number [32, 126], obtain ascii char with that index, assign to array


    //check rand number for whether it is Numeric, upper case, lowercase, or special
    if(pswrd[i] >= 48 && pswrd[i] <= 57) {
      hasNum = true;
    }
    else if(pswrd[i] >= 65 && pswrd[i] <= 90) {
      hasUpper = true;
    }
    else if(pswrd[i]>= 97 && pswrd[i] <= 122) {
      hasLower = true;
    }
    else {
      hasSpecial = true;
    }

    //if (!(hasNumeric === userInput.hasNumeric && hasUpperCase === use)


    return pswrd; //give the people what they want
  }

  


}






// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


generate.onclick = function () {

  userInput.getLength();
  userInput.getCharSet();

  generatePassword();
  writePassword();
}


