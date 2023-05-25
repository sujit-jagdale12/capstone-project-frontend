const validateForm = ({ message }) => {

    if (message.length <= 0) return { msg: 'Enter some message', sts: false }
    return { msg: 'All fields valid', sts: true }
}

const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
}

function setupForm() {

    const err = document.getElementById('errMsg')
    err.style.display = 'none'

    const formSignup = document.getElementById('reminder-form')

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
    const eventId = readIdQueryParam();
    axios.post(`http://localhost:8080/admin/events/${eventId}/notification`, user, { headers })

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
function backToUpdate() {
    window.history.back();
}
function speakerForm(){
    const id = readIdQueryParam()
    window.location.href=`../schedule/speakervendor.html?id=${id}`;
}
function reminder(){
    const id = readIdQueryParam()
    window.location.href=`../notification/sendnotification.html?id=${id}`;
}
function viewAnalytics(){
    const id = readIdQueryParam()
    window.location.href=`../analytics/eventanalytics.html?id=${id}`;
}