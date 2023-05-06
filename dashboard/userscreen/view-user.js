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
        .then(data => populateForm(document.getElementById('view-eventdetails'), data.bd))
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
    const formEvent = document.getElementById('view-eventdetails')

    formEvent.onsubmit = ev => {
        ev.preventDefault()

        showSuccessModal()
    }
}

setupForm()
function showSuccessModal() {
    const myModalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
}
apiGetEventDetails()

function logOut() {
    localStorage.setItem("userId", null)
    window.location.href = "../../loginpage/login.html"
}