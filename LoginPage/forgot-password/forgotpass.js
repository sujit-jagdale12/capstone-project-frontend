
const forgotPasswordForm = document.getElementById("forgot-password-form");

forgotPasswordForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = Object.fromEntries(formData.entries())
    console.log(user)
    validateForm(user)
    axios.post('http://localhost:8080/user/login/forgotpass', user)
        .then((response) => {
            console.log(response.data);
            // window.location.href = "../login.html";
        })
        .catch((error) => {
            console.error(error);
        });
   
});

const validateForm = ({ email }) => {
    if (email.length <= 0) return { msg: 'invalid email', sts: false }
    return { sts: 'success', msg: 'all fields are valid' }
}