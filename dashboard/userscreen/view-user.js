const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
}

function apiGetEventDetails() {
    const id = readIdQueryParam()

    axios.get(`http://localhost:8080/admin/events/${id}`)
        .then(function (response) {
            const data = response.data.bd;
            document.getElementById('title').textContent = data.title;
            document.getElementById('description').textContent = data.description;
            document.getElementById('startdate').textContent = data.startdate;
            document.getElementById('enddate').textContent = data.enddate;
            document.getElementById('time').textContent = data.time;
            document.getElementById('location').textContent = data.location;
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


function bookEventByUserId() {
    const userId = localStorage.getItem("userId");

    const eventId = readIdQueryParam()

    const headers = {
        'content-type': 'application/json'
    }
    axios.post(`http://localhost:8080/attendee/${userId}/event/${eventId}`, { headers })

        .then(
            window.location.href = "./payment-ui/payment.html"
        ).catch (err => console.log(err))
}


function showSuccessModal() {
    const myModalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
}

function showPrice() {
    const ticketType = document.getElementById("ticketType").value;

    let price;
    if (ticketType === "vip") {
      price = "$100";
    } else if (ticketType === "earlybird") {
      price = "$75";
    } else if (ticketType === "group") {
      price = "$50";
    } else {
      price = "";
    }

    document.getElementById("priceContainer").textContent = "Price: " + price;
  }