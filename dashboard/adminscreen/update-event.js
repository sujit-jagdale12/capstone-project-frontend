const validateForm = ({ title, description, startdate, enddate, location, time }) => {

    if (title.length <= 0) return { msg: 'invalid title', sts: false }
    if (location.length <= 0) return { msg: 'invalid location', sts: false }
    if (description.length <= 0) return { msg: 'invalid description', sts: false }
    if (!validateDate(startdate)) return { msg: 'invalid startdate', sts: false }
    if (!validateDate(enddate)) return { msg: 'invalid enddate', sts: false }
    if (time.length <= 0) return { msg: 'invalid time', sts: false }

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
const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
}

function apiGetEventDetails() {
    const id = readIdQueryParam()

    axios.get(`http://localhost:8080/admin/events/${id}`)
        .then(httpReponse => httpReponse.data)
        .then(data => populateForm(document.getElementById('form-update-link'), data.bd))
        .catch(err => console.log(err))
}

function apiUpdateExistingForm(invoice, form) {
    axios.put('http://localhost:8080/admin/updateevent', invoice)
        .then(httpResponse => httpResponse.data)
        .then(data => console.log(data.msg))
        .then(res => {
            showSuccessModal()
        })
        .catch(err => console.log(err))
}

function populateForm(form, data) {
    const { elements } = form;

    const entries = Object.entries(data)

    for (const entry of entries) {
        const [key, value] = entry
        const inputField = elements.namedItem(key)
        if (inputField) inputField.value = value
    }

}

function setupForm() {
    const err = document.getElementById('errMsg')
    err.style.display = 'none'
    const er = document.getElementById('errTicketMsg')
    err.style.display = 'none'
    const formEvent = document.getElementById('form-update-link')

    formEvent.onsubmit = ev => {
        const formData = new FormData(ev.target)

        ev.preventDefault()

        const rawData = Object.fromEntries(formData.entries())
        const id = readIdQueryParam()
        const event = { ...rawData, id }
        console.log(rawData)
        console.log(event)
        const { sts, msg } = validateForm(rawData)
        if (sts) apiUpdateExistingForm(event, formEvent)
        else {
            err.style.display = 'block'
            err.innerHTML = `<strong>${msg}</strong>`
        }

    }

    const ticketForm = document.getElementById("ticket-form")

    ticketForm.onsubmit = ev => {

        ev.preventDefault()

        const formData = new FormData(ev.target)

        const ticket = Object.fromEntries(formData.entries())
        console.log(ticket)

        const { sts, msg } = validateTicketForm(ticket)

        if (sts) apiUpdateTicket(ticket, ticketForm)
        else {
            er.style.display = 'block'
            er.innerHTML = `<strong>${msg}</strong>`
        }
    }

}

const validateTicketForm = ({ type, price }) => {
    if (!validTicketType(type)) return { msg: 'invalid ticket type', sts: false }
    if (type.length <= 0) return { msg: 'invalid ticket type', sts: false }
    if (price <= 0) return { msg: 'Price can\'t be Zero/Negative', sts: false }

    return { sts: 'success', msg: 'all fields are valid' }
}
function validTicketType(type) {
    if (type === 'vip' || type === 'earlybird' || type === 'group') return true
    return false
}

function apiUpdateTicket(ticket) {
    const id = readIdQueryParam()
    const url = `http://localhost:8080/admin/events/${id}/tickets`
    const headers = {
        'content-type': 'application/json'
    }
    axios.post(url, ticket, { headers })
        .then(res => {
            showSuccessTicket()
            hideSetTicket()
        }).catch(err => console.log(err))
}



setupForm()

apiGetEventDetails()

function showSuccessModal() {
    const myModalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
}
function showSuccessTicket() {
    const myModalEl = document.getElementById('successModalTicket');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
}


function showSetTicket() {
    const container = document.getElementById("set-ticket-container");
    container.style.display = "block";
}

function hideSetTicket() {
    const container = document.getElementById("set-ticket-container");
    container.style.display = "none";
}

const ticketLink = document.getElementById("ticket-submit");
ticketLink.addEventListener("click", goToTicket);
function goToTicket() {
    showSetTicket()
}