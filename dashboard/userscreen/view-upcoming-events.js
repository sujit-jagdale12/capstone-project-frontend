const validateForm = ({ location }) => {

    if (location.length <= 0) return { msg: 'Enter location to search', sts: false }

    return { sts: 'success', msg: 'all fields are valid' }
}

function setupTable() {

    const table = document.getElementById('tableEvent')

    const btnSearch = document.getElementById('btnSearch')

    btnSearch.onclick = () => {
        const form = {
            location: document.getElementById('location').value,
            date: document.getElementById('date').value,
        };

        // const validation = validateForm(form);

        // if (validation.sts === false) {
        //     const errMsg = document.getElementById('errMsg');
        //     errMsg.innerHTML = `<strong>${validation.msg}</strong>`;
        //     return;
        // }

        if (form.location.length > 0) {
            apiFetchAllLocationEvents(table, form.location);
        } else {
            apiFetchEventsByDate(table, form.date);
        }
    };
    apiFetchAllEvents(table)
}

setupTable()

function propulateActualData(table, events) {
    const errMsg = document.getElementById('errMsg');
    errMsg.innerHTML = '';

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    if (events.length === 0) {
        const errMsg = document.getElementById('errMsg');
        errMsg.innerHTML = "<strong><h2>No events found.</h2></strong>";
        return;
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
        row.insertCell(6).innerHTML = `<a href='${viewPageUrl}' style="font-size:24px;color:blue"><i class='fas fa-eye'></i></a>`;
        row.insertCell(7).innerHTML = `<a href='${viewSpeaker}'>Speaker</a>`;
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
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }
        });
}
function apiFetchEventsByDate(table, date) {
    const url = 'http://localhost:8080/attendee/events/date';
    axios
        .get(url, {
            params: {
                date: date,
            },
        })
        .then(res => {
            const { data } = res;
            propulateActualData(table, data);
        })
        .catch(error => {
            const errMsg = document.getElementById('errMsg');
            errMsg.innerHTML = "<strong><h2>No event found for the selected date.</h2></strong>";
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }
        });
}

function logOut() {
    localStorage.setItem("userId", null)
    window.location.href = "../../loginpage/login.html"
}