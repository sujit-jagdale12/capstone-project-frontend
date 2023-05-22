const validateForm = ({ location }) => {

    if (location.length <= 0) return { msg: 'Enter location to search', sts: false }

    return { sts: 'success', msg: 'all fields are valid' }
}

function setupTable() {

    const table = document.getElementById('tableEvent')

    const btnSearch = document.getElementById('btnSearch')

    btnSearch.onclick = () => {

        apiFetchAllLocationEvents(table, document.getElementById('location').value)
    }

    apiFetchAllEvents(table)
}

setupTable()

function propulateActualData(table, events) {
    const errMsg = document.getElementById('errMsg');
    errMsg.innerHTML = ''; // Clear any previous error message

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    for (const event of events) {
        const { id, title, startdate, enddate, location, time } = event;
        const viewPageUrl = `./view-event.html?id=${id}`;
        const viewSpeaker = `./viewSpeaker/view-speaker.html?id=${id}`;

        const row = table.insertRow();
        row.insertCell(0).innerHTML = id;
        row.insertCell(1).innerHTML = title;
        row.insertCell(2).innerHTML = startdate;
        row.insertCell(3).innerHTML = enddate;
        row.insertCell(4).innerHTML = location;
        row.insertCell(5).innerHTML = time;
        row.insertCell(6).innerHTML = `<a href='${viewPageUrl}'>View Event</a>`;
        row.insertCell(7).innerHTML = `<a href='${viewSpeaker}'>Event Speaker</a>`;
    }

}


function apiFetchAllEvents(table) {
    axios
        .get('http://localhost:8080/attendee/upcomingevents')
        .then(res => {
            const { data } = res;
            propulateActualData(table, data);
        })
        .catch(error => {
            console.error('Error fetching events:', error);
            const errMsg = document.getElementById('errMsg');
            errMsg.innerHTML = "<strong><h2>No upcoming events found. Please try again later.</h2></strong>";
        });
}

function apiFetchAllLocationEvents(table, loc) {
    const url = 'http://localhost:8080/attendee/events';
    axios
        .get(url, {
            params: {
                location: loc,
            },
        })
        .then(res => {
            const { data } = res;
            propulateActualData(table, data);
        })
        .catch(error => {
            const errMsg = document.getElementById('errMsg');
            errMsg.innerHTML = "<strong><h2>No event found for given location.</h2></strong>";
        });
}

function logOut() {
    localStorage.setItem("userId", null)
    window.location.href = "../../loginpage/login.html"
}