// Here, we grab a reference to out form. It's the gateway for user input.
const form = document.getElementById("userForm");

const emailInput = form.elements["email"]

//  Alternative to the code above: you can access email input via the code given below
// const emailInput = document.getElementById("email")

form.addEventListener("submit", (event) => {

    // prevent the default submission 
    event.preventDefault();
    
    const errorMessage = document.querySelectorAll(".error-message");
    for(const message of errorMessage){
        message.remove();
    }


    // retrieve the username value
    const username = document.getElementById("username").value;

    // log the username
    console.log("Username entered: ", username);

    // lets validate our form
    if(validateForm()){
        form.submit();
        console.log("Validation successful");
    }
    else{
        console.log("Validation failed");
    }
});

document.getElementById("username").addEventListener("input", (event) =>{
    console.log("Username changed to: ", event.target.value); 
});

/***
 * Purpose: A custom validation function for out form.
 */
function validateForm(){
    let isValid=true;
    const usernameInput = document.getElementById("username");
    const username = usernameInput.value;

    // Simple validation rule: username should not be empty 
    if(username === ""){
               
        showInputError(usernameInput, "Username is required");
        isValid=false;
    }

    const email = document.getElementById("email");
    const emailInputValue = email.value;
    const simpleEmailPattern = /.+@.+\..+/;

    /**
     * SimpleEmailPattern: 
     * - `.+`: Matched one or more of any characters, except line breaks 
     * - `@`: A liter @# symbol. This symbol is contained in all email addresses
     * - `.+`: Matches one or more characters after @ symbol
     * - `.\`: A liter dot '.' found in email addresses
     * - `.+`: Matches one or more of any characters.
     * - `^`: Common in other languages to indicate string must start with. 
     * - `$`: Indicates last character in string. 
     * 
     */

    // a more complex version of the same email validator.
    const complexEmailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    /**
     * EXPLANATION:
     * [A-Z0-9._%+-]: Matches one or more alphanumeric characters, dots, underscore, percentage, plus or hyphen `-`.
     * `@`: A Literal @ as the separator
     * [A-Z0-9,-]: Matches one or more alphanumeric characters, dots, underscore or hyphen`-`.
     * `\.` : fot the domain name. 
     * [A-Z]{2,4}$: Matches between 2 to 4 uppercase alphabetic characters for the top-level domain 
     */

    if(!complexEmailPattern.test(emailInputValue)){
        console.error("Please enter a valid (complex email address)");
        showInputError(email, "Please enter a valid (simple) email address");
        isValid=false;
    }
    return isValid;
}

//  a function to display error message next to form input
function showInputError(inputElement, message){
    const container = inputElement.closest(".input-container");

    // create a span elements for our error messages
    const errorDisplay = document.createElement("span");
    errorDisplay.innerHTML=message;
    errorDisplay.className = "error-message";
    errorDisplay.setAttribute("role","alert");

    inputElement.parentElement.appendChild(errorDisplay);

}