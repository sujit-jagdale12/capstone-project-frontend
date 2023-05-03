const forgotPasswordLink = document.getElementById("forgot-password");

forgotPasswordLink.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "../forgot-password/forgotpass.html";
});

const signup = document.getElementById("sign-up-page")
signup.addEventListener("click", function (event){
  window.location.href = "../sign-up/signup.html"
});

