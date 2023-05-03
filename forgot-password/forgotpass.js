
const forgotPasswordForm = document.getElementById("forgot-password-form");

forgotPasswordForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const message = "Password reset link has been sent to your email!";
    alert(message);
    window.location.href = "../loginpage/login.html";
});
