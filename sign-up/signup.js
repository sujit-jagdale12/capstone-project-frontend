const signup = document.getElementById("signup-link")
signup.addEventListener("submit", function (event) {
    event.preventDefault();
    window.location.href = "../loginpage/login.html";
});