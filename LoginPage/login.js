const forgotPasswordLink = document.getElementById("forgot-password");

forgotPasswordLink.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "../forgot-password/forgotpass.html";
});

