
function setupTable() {
    const table = document.getElementById('tableEvent')
    apiFetchAllEvents(table)
}

setupTable()

function propulateActualData(table, events) {
    while (table.rows.length > 1) {
        table.deleteRow(1)
    }
    for (const event of events) {
        const { id, title, startdate, enddate, location, time } = event

        const row = table.insertRow()
        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = title
        row.insertCell(2).innerHTML = startdate
        row.insertCell(3).innerHTML = enddate
        row.insertCell(4).innerHTML = location
        row.insertCell(5).innerHTML = time
    }
}

function apiFetchAllEvents(table) {
    axios.get(`http://localhost:8080/attendee/${2}`)
        .then(res => {
            const { data } = res
            propulateActualData(table, data)
        })
        .catch(err => console.log(err))
}

function getUserId() {
    axios.get('http://192.168.43.37:5500/api/current-user')
        .then(response => {
            const userId = response.data.id;
            console.log(`User ID: ${userId}`);
            return userId;
        })
        .catch(error => console.error(error));
}

getUserId()

