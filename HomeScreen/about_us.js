const homeLink = document.getElementById("home-link");
homeLink.addEventListener("click", reloadPage);
function reloadPage() {
  window.location.reload();
}

function showAboutUs() {
  const container = document.getElementById("about-us-container");
  container.style.display = "block";
}


document.getElementById("login-link").addEventListener("click", function() {
  window.location.href = "../LoginPage/login.html";
});



