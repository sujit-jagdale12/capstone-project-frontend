const validateForm = ({ location }) => {

    if (location.length <= 0) return { msg: 'Enter location to search', sts: false }

    return { sts: 'success', msg: 'all fields are valid' }
}

function setupTable() {
    const btnSearch = document.getElementById('btnSearch');

    btnSearch.onclick = () => {
        const location = document.getElementById('location').value;
        const date = document.getElementById('date').value;

        if (location.length > 0) {
            apiFetchAllLocationEvents(location);
        } else {
            apiFetchEventsByDate(date);
        }
    };

    apiFetchAllEvents();
}

setupTable();


function propulateCardData(events) {
    const eventCards = document.getElementById('eventCards');
    eventCards.innerHTML = '';

    if (events.length === 0) {
        const errMsg = document.getElementById('errMsg');
        errMsg.innerHTML = "<strong><h2>No events found.</h2></strong>";
        return;
    }

    for (const event of events) {
        const { id, title, startdate, enddate, location, time } = event;
        const viewPageUrl = `./view-event.html?id=${id}`;
        const viewSpeaker = `./viewSpeaker/view-speaker.html?id=${id}`;

        const card = document.createElement('div');
        card.className = 'col-md-4 mb-3';

        const cardContent = `
            <div class="event-card">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">
                        <strong>Start Date:</strong> ${startdate}<br>
                        <strong>End Date:</strong> ${enddate}<br>
                        <strong>Location:</strong> ${location}<br>
                        <strong>Time:</strong> ${time}
                    </p>
                    <a href="${viewPageUrl}" class="btn btn-primary">View Event</a>
                    <a href="${viewSpeaker}" class="btn btn-secondary">View Speaker</a>
                </div>
            </div>
        `;

        card.innerHTML = cardContent;
        eventCards.appendChild(card);
    }
}



function apiFetchAllEvents() {
    axios
        .get('http://localhost:8080/attendee/upcomingevents')
        .then(res => {
            const { data } = res;
            propulateCardData(data);
        })
        .catch(error => {
            console.error('Error fetching events:', error);
            const errMsg = document.getElementById('errMsg');
            errMsg.innerHTML = "<strong><h2>No upcoming events found. Please try again later.</h2></strong>";
        });
}


function apiFetchAllLocationEvents(loc) {
    const url = 'http://localhost:8080/attendee/events';
    axios
        .get(url, {
            params: {
                location: loc,
            },
        })
        .then(res => {
            const { data } = res;
            propulateCardData(data);
        })
        .catch(error => {
            const errMsg = document.getElementById('errMsg');
            errMsg.innerHTML = "<strong><h2>No event found for the given location.</h2></strong>";
            const eventCards = document.getElementById('eventCards');
            eventCards.innerHTML = '';
        });
}

function apiFetchEventsByDate(date) {
    const url = 'http://localhost:8080/attendee/events/date';
    axios
        .get(url, {
            params: {
                date: date,
            },
        })
        .then(res => {
            const { data } = res;
            propulateCardData(data);
        })
        .catch(error => {
            const errMsg = document.getElementById('errMsg');
            errMsg.innerHTML = "<strong><h2>No event found for the selected date.</h2></strong>";
            const eventCards = document.getElementById('eventCards');
            eventCards.innerHTML = '';
        });
}


function logOut() {
    localStorage.setItem("userId", null)
    window.location.href = "../../loginpage/login.html"
}