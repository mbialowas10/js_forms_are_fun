// modified: May 26, 2026
// here, we grab a reference to our form. It's the gateway for user input.
const form = document.getElementById("userForm");

const emailInput = form.elements["email"];
// alternatively, you can access email input via
// const emailInput = document.getElementById("email");


form.addEventListener("submit", (event) => {
    // prevent the default submission
    event.preventDefault();

    const errorMessages = document.querySelectorAll(".error-message");
    console.log(typeof(errorMessages));
    // for(const k,v of errorMessages){
    //     console.log(`Key: ${k} and value:${v}`);
    // }
    errorMessages.forEach(error => {
        error.remove();
    });

    // retrieve the username value
    const username = document.getElementById("username").value;

    // log the username
    console.log("Username entered:", username);

    // let's validate our form....
    if (validateForm()){
        form.submit();
        console.log("Validation successful");
    }else{
        console.log("validation failed.");
    }
});

document.getElementById("username").addEventListener("input", (evt) =>{
    console.log("Username changed to: ", evt.target.value);
});

/***
 * Purpose: a custom validation function for our form
 */
function validateForm(){
    let isValid= true;
    const usernameInput = document.getElementById("username");
    const username = escapeHTML(usernameInput.value);



    //Simple validation rules: username should not be empty
    if (username === ""){
        console.error("Username must be filled out");
        showInputError(usernameInput, "Username is  required.");
        //console.log("showInput Error was called.")
        isValid = false;
    }

    const email = document.getElementById("email");

    const emailInputValue = escapeHTML(email.value)

    console.log("Sanitized username entered:", username);
    console.log("Sanitized emailed entered:", email);

    const simpleEmailPattern = /.+@.+\..+/;

    /**
     * SimpleEmailPattern explained
     * 
     * - `.+`: Matches one or more of any character, except line breaks
     * - @: A liter @ symbol. This symbol is contained in all email addresses
     * - .+ matches 1 or more of any characters after @
     * `\.` A liter dot '.' found in email addresses
     * `.+`  : Matches one or more characters.
     *  ^ -  common in other languages  to indicate string must with 
     *  $ - indicates last character in string
    */

    // a more complex version of the same email validator
    const complexEmailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    /**
     * Explanation
     * [A-Z0-9._%+-]: matches 1 or more alphanumeric characters, dots, 
     *  underscore, percent sign, plus sign and hyphens. 
     * @: A literal @ as the separator
     * [A-Z0-9.-]+`: Matches one or more alphanumeric characters, dots, and hyphens 
     * for the domain name.- `\.`: A literal dot.- `[A-Z]{2,4}$`: 
     * Matches between 2 to 4 uppercase alphabetic characters for the top-level domain.- `/i`: Case-insensitive flag. It makes the pattern match both uppercase and lowercase characters.
     * 
     */

    if (!complexEmailPattern.test(emailInputValue)){
        console.error("Please enter a valid (complex email address");
        showInputError(
            email, 
            "Please enter a valid (simple) email address"
        );
        isValid = false;
    }
    return  isValid;


}

// a function to display error message next to form input
function showInputError(inputElement, message){
    const container = inputElement.closest(".input-container");

    // create a span element for our error message
    const errorDisplay = document.createElement("span");
    errorDisplay.innerHTML = message;
    errorDisplay.className = "error-message";
    errorDisplay.setAttribute("role","alert");

    inputElement.parentElement.appendChild(errorDisplay);

}
// A function to replace special characters with HTML entity character sets
function escapeHTML(input){
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

