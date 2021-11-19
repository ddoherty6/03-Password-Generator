// Assignment Code
var generateBtn = document.querySelector("#generate");

var Generate = {

  passwordLength: "",


  function forceInt() { //interact with user until input requirements are met

    while (parseInt(this.passwordLength) === NaN) { //passwordLength needs to be a number
      this.passwordLength = prompt("How many characters do you want in your password?");
      if (this.passwordLength <8 || this.passwordLength > 128) { //passwordLength needs to be a number 8-128
        alert("I can only do a password between 8 and 128 characters long - please enter again");
      } else {
        alert("Please enter a valid number");
      }
    }
  },


  function generatePassword() {

    console.log(this.passwordLength);
  }
}





// Write password to the #password input
function writePassword() {
  var password = generate.Password();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
