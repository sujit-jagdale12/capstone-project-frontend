const validateForm = ({ title, description, startdate, enddate, location, time }) => {

    if (title.length <= 0) return { msg: 'invalid title', sts: false }
    if (validateDate1(startdate,enddate)) return { msg: 'The end date cannot be before the start date.', sts: false }
    if (!validateDate(startdate)) return { msg: 'invalid startdate', sts: false }
    if (!validateDate(enddate)) return { msg: 'invalid enddate', sts: false }
    if (location.length <= 0) return { msg: 'invalid location', sts: false }
    if (time.length <= 0) return { msg: 'invalid time', sts: false }
    if (description.length <= 0) return { msg: 'invalid description', sts: false }

    return { sts: 'success', msg: 'all fields are valid' }
}
function validateDate(dateStr) {
    if (!dateStr) {
        return false;
    }
    const currentDate = new Date();
    const inputDate = new Date(dateStr);
    return inputDate >= currentDate;
}
function validateDate1(dateStr,dt) {
    if (!dateStr || !dt) {
        return false;
    }
    const start = new Date(dateStr);
    const end = new Date(dt);
    return end < start;
}

function setupForm() {

    const err = document.getElementById('errMsg')
    err.style.display = 'none'

    const formSignup = document.getElementById('new-event-link')

    formSignup.onsubmit = ev => {
        ev.preventDefault()

        const formData = new FormData(ev.target)

        const user = Object.fromEntries(formData.entries())
        console.log(user)

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
    axios.post('http://localhost:8080/admin/newevent', user, { headers })

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

function logOut() {
    localStorage.setItem("userId", null)
    window.location.href = "../../loginpage/login.html"
}