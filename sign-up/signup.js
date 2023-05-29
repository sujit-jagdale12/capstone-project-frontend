const validateForm = ({ email, password, gender, role }) => {
    const roles = ['admin', 'user'];

    if (email.length <= 0) {
        return { msg: 'Enter email', sts: false };
    }
    if (!validateEmail(email)) {
        return { msg: 'Invalid email', sts: false };
      }

    const passwordValidation = validatePassword(password); 
    if (!passwordValidation.sts) {
        return { msg: passwordValidation.message, sts: false };
    }

    if (gender == null) return { msg: 'Invalid gender', sts: false };

    if (role.length <= 0 || !roles.includes(role)) {
        return { msg: 'Invalid role', sts: false };
    }

    return { sts: true, msg: 'All fields are valid' };
};
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
const validatePassword = (password) => {
    if (password.length < 8) {
        return { sts: false, message: 'Password must be at least 8 characters long.' };
    }

    if (!/[A-Z]/.test(password)) {
        return { sts: false, message: 'Password must contain at least one uppercase letter.' };
    }

    if (!/[a-z]/.test(password)) {
        return { sts: false, message: 'Password must contain at least one lowercase letter.' };
    }

    if (!/\d/.test(password)) {
        return { sts: false, message: 'Password must contain at least one number.' };
    }

    return { sts: true, message: 'Password is valid.' };
};


function setupForm() {

    const err = document.getElementById('errMsg')
    err.style.display = 'none'

    const formSignup = document.getElementById('signup-link')

    formSignup.onsubmit = ev => {

        ev.preventDefault()

        const formData = new FormData(ev.target)

        const user = Object.fromEntries(formData.entries())

        const { sts, msg } = validateForm(user)

        if (sts) apiSignup(user, formSignup)
        else {
            err.style.display = 'block'
            err.innerHTML = `<strong>${msg}</strong>`
        }

    }
}

setupForm()

function apiSignup(user, form) {
    const headers = {
        'content-type': 'application/json'
    }
    axios.post('http://localhost:8080/user/', user, { headers })

        .then(res => {
            form.reset()
            showSuccessModal()
        }).catch(err => console.log(err))
}

function showSuccessModal() {
    const myModalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
}

