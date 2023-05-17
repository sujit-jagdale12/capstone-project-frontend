const validateForm = ({ speaker, topic, startTime, endTime, vendor, service }) => {

    if (speaker.length <= 0) return { msg: 'enter speaker name', sts: false }
    if (topic.length <= 0) return { msg: 'name the topic', sts: false }
    if (vendor.length <= 0) return { msg: 'enter vendor name', sts: false }
    if (service.length <= 0) return { msg: 'enter service details', sts: false }
    if (startTime.length <= 0) return { msg: 'invalid time', sts: false }
    if (endTime.length <= 0) return { msg: 'invalid time', sts: false }
    return { sts: 'success', msg: 'all fields are valid' }
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

    const formSignup = document.getElementById('schedule-speaker-vendor')

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

    const eventId=readIdQueryParam();
    axios.post(`http://localhost:8080/admin/events/${eventId}/speakervendor`, user, { headers })

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

