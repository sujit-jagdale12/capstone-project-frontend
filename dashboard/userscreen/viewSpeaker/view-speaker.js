
const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
}

function apiGetEventDetails() {
    const id = readIdQueryParam()

    axios.get(`http://localhost:8080/attendee/event/speaker/${id}`)
        .then(function (response) {
            const data = response.data[0];
            console.log(data)
            document.getElementById('speaker').textContent = data.speaker;
            document.getElementById('topic').textContent = data.topic;
            document.getElementById('startTime').textContent = data.startTime;
            document.getElementById('endTime').textContent = data.endTime;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function setupForm() {
    const formEvent = document.getElementById('view-eventdetails')

    formEvent.onsubmit = ev => {
        ev.preventDefault()
        showSuccessModal()
    }
}

setupForm()

apiGetEventDetails()

function logOut() {
    localStorage.setItem("userId", null)
    window.location.href = "../../loginpage/login.html"
}

