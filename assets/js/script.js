var generateBtn = document.querySelector("#generate");

var userInput = { // object to handle all interaction with the user

  passwordLength: null,
  wantsLowerCase: null,
  wantsUpperCase: null,
  wantsNumeric: null,
  wantsSpecialChars: null,

  setFormInput: function() {
    this.passwordLength = document.querySelector("#length").value;
    this.wantsLowerCase = document.querySelector("#includeLowercase").checked;
    this.wantsUpperCase = document.querySelector("#includeUppercase").checked;
    this.wantsNumeric = document.querySelector("#includeNumbers").checked;
    this.wantsSpecialChars = document.querySelector("#includeSpecialCharacters").checked;
    this.excludedCharacters = document.querySelector("#exclude").value;
  },

  getLength: function() { // ask user how long they want the password to be, enforcing interger [8, 128]
    while (!Number.isInteger(this.passwordLength) || (this.passwordLength < 8 || this.passwordLength > 128)) { //passwordLength needs to be an integer 8-128
      input = window.prompt("How many characters would you like in your password? Please enter an integer between 8 and 128");
      this.passwordLength = Number.parseInt(input);
    }
    alert("Okay, the password will have " + input + " characters.");
  },

  getCharSet: function() { // promt user for which types of chars they want - do not allow them to choose none
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

    if (!this.wantsLowerCase && !this.wantsUpperCase && !this.wantsNumeric && !this.wantsSpecialChars) {
      alert("You need to make at least one selection! Please try again:");
      this.getCharSet();
    }
  }
}

gen = { // object to handle password generation - i am not calling this 'generate' because that is the id of the button element-object
  pswrd: Array(), // naming 'pswrd' so as not to conflict with 'password' element-object
  hasNum: false,
  hasUpper: false,
  hasLower: false,
  hasSpecial: false,
  randNum: 0,
  meetsCriteria: false,

  criteriaCheck: function() { // check that full array 'pswrd' has or doesnt have ALL types of charcters users specify
    if (this.hasLower == userInput.wantsLowerCase && this.hasUpper == userInput.wantsUpperCase && this.hasNum == userInput.wantsNumeric && this.hasSpecial == userInput.wantsSpecialChars) {
      this.meetsCriteria = true;
    } else {
      this.meetsCriteria = false;
    }
  },

  currentCharMeetsCriteria: function(ASCIIindex) { // checks to see if (index of) char in question meets criteria specified by the user, keeps track of types of chars used
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

  setCharSet: function() {
    var charSet = Array();
    if (userInput.wantsLowerCase) {
      charSet = charSet.concat(Array.from({length: 26}, (_, i) => String.fromCharCode(i + 97)));
    }
    if (userInput.wantsUpperCase) {
      charSet = charSet.concat(Array.from({length: 26}, (_, i) => String.fromCharCode(i + 65)));
    }
    if (userInput.wantsNumeric) {
      charSet = charSet.concat(Array.from({length: 10}, (_, i) => String.fromCharCode(i + 48)));
    }
    if (userInput.wantsSpecialChars) {
      charSet = charSet.concat(Array.from({length: 15}, (_, i) => String.fromCharCode(i + 33)));
    }
    if (userInput.excludedCharacters.length > 0) {
      charSet = charSet.filter(char => !userInput.excludedCharacters.includes(char));
    }
    return charSet;
  },
  
  // password generation driver 
  makePassword: function() {
    this.resetPswrd();
    // get set of characters to select randomly from the user inputs
    var charSet = this.setCharSet();
   
    // this loop generates the password   
    for(i=0; i<userInput.passwordLength; i++) { 
      this.randNum = parseInt(Math.random()*charSet.length);

      //obtain ascii char with that index, assign to array
      this.pswrd.push(charSet[this.randNum]);
    }
    
    return this.pswrd;
  }
} 

// Write password to the #password input
function writePassword() {

  var password = gen.makePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password.join("");

}

function generatePassword() {
 
  console.log("Generate button clicked");
  userInput.setFormInput();

  writePassword();
}

// Add event listener to generate button
generateBtn.addEventListener("click", generatePassword);




