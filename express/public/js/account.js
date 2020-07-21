const validateEmail = (input) => {
  let email = input.value;
  console.log("Here is the email", input.value);
  if ((email || email.length > 0) && isEmail(email) === true) {
    fetch(`/account/validateEmail?email=${email}`)
      .then((response) => {
        if (response.status != 200) {
          console.log("record not available....");
          document.getElementById("signup").disabled = false;
          document.getElementById("emailMessage").innerHTML = "";
        } else if (response.status === 200) {
          console.log("record  available....");
          document.getElementById("signup").disabled = true;
          document.getElementById("emailMessage").innerHTML =
            "Email already exists try login or reset your password !!";
        }
      })
      .catch((error) => {
        if (error) {
          console.error("error in getting the response ...", error);
        }
      });
  }
};

const validatePassword = (input) => {
  let password = document.getElementById("password").value;

  console.log("passwrod ", password);
  console.log("conformpassword ", input.value);

  if (input.value === password) {
    document.getElementById("signup").disabled = false;
    document.getElementById("passwordError").innerHTML = "";
  } else {
    document.getElementById("signup").disabled = true;
    document.getElementById("passwordError").innerHTML =
      "Passwords do not match !!";
  }
};

function isEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
