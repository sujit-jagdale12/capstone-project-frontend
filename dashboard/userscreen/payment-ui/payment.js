const validateForm = ({ cardNumber, cardName, expDate, cvv }) => {

    if (cardNumber.length <= 0 || cardNumber.length > 12) return { msg: 'invalid card number', sts: false }
    if (cardName.length <= 0) return { msg: 'invalid card holder name', sts: false }
    if (cardName === null) return { msg: 'invalid card holder name', sts: false }
    if (!validateExpiryDate(expDate)) return { msg: 'invalid expiry date', sts: false }
    if (cvv.length <= 0 || cvv.length > 3) return { msg: 'invalid card cvv', sts: false }

    return { sts: 'success', msg: 'all fields are valid' }
}

function validateExpiryDate(expiryDate) {
    if (expiryDate.length <= 0) {
        return false;
    }
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;

    if (!regex.test(expiryDate)) {
        return false;
    }
    const parts = expiryDate.split('/');
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10);


    const currentDate = new Date();

    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    console.log(month + " " + year)
    console.log(currentMonth + " " + currentYear)
    if (year < currentYear || year > currentYear + 20) {
        console.log("year error")
        return false;
    }
    return !(year === currentYear && month < currentMonth);
}

function setupForm() {

    const err = document.getElementById('errMsg')
    err.style.display = 'none'

    const formSignup = document.getElementById('paymentForm')

    formSignup.onsubmit = ev => {
        ev.preventDefault()

        const formData = new FormData(ev.target)

        const user = Object.fromEntries(formData.entries())
        const { sts, msg } = validateForm(user)

        if (sts) showSuccessModal();
        else {
            err.style.display = 'block'
            err.innerHTML = `<strong>${msg}</strong>`
        }
    }
}

setupForm()

function showSuccessModal() {
    const myModalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
}

function bookEventByUserId() {
    const userId = localStorage.getItem("userId");

    const eventId = readIdQueryParam()

    const headers = {
        'content-type': 'application/json'
    }
    axios.post(`http://localhost:8080/attendee/${userId}/event/${eventId}`, { headers })

        .then(res => {
            showSuccessModalEventBook()
            hideSetBookEvent()
        }).catch(err => console.log(err))
}

function backToUpdate() {
    window.history.back();
}