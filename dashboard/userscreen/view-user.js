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
    const formEvent = document.getElementById('view-eventdetails');

    formEvent.onsubmit = ev => {
        ev.preventDefault();
        showPrice()
        showSuccessModal();
    };

    const ticketTypeInput = document.getElementById('ticketType');
    ticketTypeInput.addEventListener('change', showPrice);
}

setupForm();


apiGetEventDetails()

function logOut() {
    localStorage.setItem("userId", null)
    window.location.href = "../../loginpage/login.html"
}

function apiOrderTicket() {
    const ticketType = document.getElementById("ticketType").value;
    const quantity = document.getElementById("quantity").value;

    const userId = localStorage.getItem("userId");
    const eventId = readIdQueryParam()

    const requestData = {
        tickettype: ticketType,
        quantity: quantity
    };

    const headers = {
        'content-type': 'application/json'
    }
    axios.post(`http://localhost:8080/attendee/${userId}/event/${eventId}/order`, requestData, { headers })
        .then(
            axios.post(`http://localhost:8080/attendee/${userId}/event/${eventId}`, { headers })
                .then(
                    window.location.href = "./payment-ui/payment.html"
                ).catch(err => console.log(err))
            // window.location.href = "./payment-ui/payment.html"
        ).catch(err => console.log(err))
}


function showSuccessModal() {
    const myModalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
}

function showPrice() {
    const err = document.getElementById('errMsg')
    err.style.display = 'none'
    const ticketType = document.getElementById("ticketType").value;
    const eventId = readIdQueryParam();

    axios
        .get(`http://localhost:8080/attendee/tickets/${eventId}`)
        .then(function (response) {

            const ticketPrices = response.data;
            let price = "";
            if (ticketPrices) {
                if (ticketType === "vip") {
                    price = ticketPrices.find(ticket => ticket.type === "vip").price;
                } else if (ticketType === "earlybird") {
                    price = ticketPrices.find(ticket => ticket.type === "earlybird").price;
                } else if (ticketType === "group") {
                    price = ticketPrices.find(ticket => ticket.type === "group").price + " for 5 people";
                }
            }

            const priceContainer = document.getElementById("priceContainer");
            priceContainer.innerHTML = "Price:<br><b>$" + price + "</b>";
        })
        .catch(function (error) {
            const errMsg = document.getElementById('errMsg');
            errMsg.style.display = 'block'
            errMsg.innerHTML = "Price for selected ticket has not set.try again later.";
        });
}



