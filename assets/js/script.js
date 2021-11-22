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
    if (this.wantsLowerCase === true) {
      alert("Including lower case letters.");
    } else {
      alert("Okay, there will be no lower case letters in this password.")
    }

    this.wantsUpperCase = confirm("Would you like your password to have upper case letters?");
    if (this.wantsUpperCase === true) {
      alert("Including upper case letters.");
    } else {
      alert("Okay, there will be no upper case letters in this password.")
    }

    this.wantsNumeric = confirm("Would you like your password to have numbers?");
    if (this.wantsNumeric === true) {
      alert("Including numbers.");
    } else {
      alert("Okay, there will be no numbers in this password.");
    }

    this.wantsSpecialChars = confirm("Would you like your password to have special characters?");
    if (this.wantsSpecialChars === true) {
      alert("Including special characters.");
    } else {
      alert("Okay, there will be no special characters in this password.");
    }
  }
}

gen = { //i am not calling this 'generate' because that is the id of the button element-object
  pswrd: Array(), //naming pswrd so as not to conflict with password class html element-object
  hasNum: false,
  hasUpper: false,
  hasLower: false,
  hasSpecial: false,
  randNum: 0,
  meetsCriteria: false,

  /*
  trackCharTypes: function(letter) { //takes an ascii index argument and checks whether it is numeric, upper case, lowercase, or special
    if (letter >= 48 && letter <= 57) {
      this.hasNum = true;
    }
    else if (letter >= 65 && letter <= 90) {
      this.hasUpper = true;
    }
    else if (letter >= 97 && letter <= 122) {
      this.hasLower = true;
    }
    else {
      this.hasSpecial = true;
    }
  }, */

  criteriaCheck: function() { //check that password has or doesnt have the types of charcters users specify
    if (this.hasLower == userInput.wantsLowerCase && this.hasUpper == userInput.wantsUpperCase && this.hasNum == userInput.wantsNumeric && this.hasSpecial == userInput.wantsSpecialChars) {
      this.meetsCriteria = true;
    } else {
      this.meetsCriteria = false;
    }
  },

  currentCharMeetsCriteria: function(ASCIIindex) { //checks to see if (index of) char in question meets criteria specified by the user
    if (ASCIIindex >= 48 && ASCIIindex <= 57 && userInput.wantsNumeric) {
      this.hasNum = true;
      return true;
    }
    else if (ASCIIindex >= 65 && ASCIIindex <= 90 && userInput.wantsUpperCase) {
      this.hasUpper = true;
      return true;
    }
    else if (ASCIIindex >= 97 && ASCIIindex <= 122 && userInput.wantsLowerCase) {
      this.hasLower = true;
      return true;
    }
    else {
      if (userInput.wantsSpecialChars) {
        this.hasSpecial = true;
        return true;
      }
    }
    return false;
  },

  resetPswrd: function() {
    this.pswrd = Array();
    this.hasNum = false;
    this.hasUpper = false;
    this.hasLower = false;
    this.hasSpecial = false;
    this.meetsCriteria = false;
  },
  
  makePassword: function() {
    while (!this.meetsCriteria) { //keep generating passwords until one meets criteria set by the user
      this.resetPswrd(); //reset pswrd to prepare it for the loop
debugger;
      for(i=0; i<userInput.passwordLength; i++) {
        
        this.randNum = parseInt(Math.random()*94+32); //generate random number [32, 126], which is the range of characters we want in ascii index
        this.pswrd.push(String.fromCharCode(this.randNum)); //obtain ascii char with that index, assign to array

          while (!this.currentCharMeetsCriteria(this.randNum)) { //check that (index of) current char meets criteria set by user, if not, regen the number at array index and check again
            this.randNum = parseInt(Math.random()*94+32);
            this.pswrd[i] = String.fromCharCode(this.randNum);
            console.log("check char");
          }
        //this.trackCharTypes(this.randNum); //check the entire array to make sure all requirements are met
      }

      this.criteriaCheck();
    }
    return this.pswrd; //give the people what they want
  }
} 





console.log('before writePassword');
// Write password to the #password input
function writePassword() {

  
  var password = gen.makePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password.join("");

}

// Add event listener to generate button
console.log('before generateBtn');
//generateBtn.addEventListener("click", writePasswrod); //had to comment this out - it was running the writePassword function at this line upon click
console.log('after generateBtn');


generate.onclick = function () {
 
  userInput.getLength();
  userInput.getCharSet();

  writePassword();
}


