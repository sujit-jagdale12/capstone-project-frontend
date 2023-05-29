
function setupTable() {
    const table = document.getElementById('tableEvent')
    apiFetchAllEvents(table)
}

setupTable()

function propulateActualData(table, events) {
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    for (const event of events) {
        const { id, title, startdate, enddate, location, time } = event;

        const row = table.insertRow();
        row.insertCell(0).innerHTML = id;
        row.insertCell(1).innerHTML = title;
        row.insertCell(2).innerHTML = startdate;
        row.insertCell(3).innerHTML = enddate;
        row.insertCell(4).innerHTML = location;
        row.insertCell(5).innerHTML = time;

        const downloadButtonCell = row.insertCell(6);
        const downloadButton = document.createElement("button");
        downloadButton.innerText = "Download";
        downloadButton.addEventListener("click", () => {
            downloadEventAsPdf(event);
        });
        downloadButtonCell.appendChild(downloadButton);
    }
}

function downloadEventAsPdf(event) {
    const ticketCode = generateTicketCode(); // Generate a unique ticket code
    const htmlContent = createHtmlContent(event, ticketCode);
    console.log(event)
    html2pdf()
        .set({ filename: 'event_ticket.pdf' })
        .from(htmlContent)
        .save();
}

function createHtmlContent(event, ticketCode) {
    const { title, startdate, enddate, location, time } = event;

    const htmlContent = `
      <html>
        <head>
          <title>${title}</title>
        </head>
        <body>
          <h1>${title}</h1>
          <p><b>Ticket Code:</b> ${ticketCode}</p>
          <p><b>Start Date:</b> ${startdate}</p>
          <p><b>End Date:</b> ${enddate}</p>
          <p><b>Location:</b> ${location}</p>
          <p><b>Time:</b> ${time}</p>
        </body>
      </html>
    `;

    return htmlContent;
}

function generateTicketCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let ticketCode = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        ticketCode += characters[randomIndex];
    }

    return ticketCode;
}



function logOut() {
    localStorage.setItem("userId", null)
    window.location.href = "../../loginpage/login.html"
}


function apiFetchAllEvents(table) {
    const id = localStorage.getItem("userId");
    axios.get(`http://localhost:8080/attendee/${id}`)
        .then(res => {
            const { data } = res
            propulateActualData(table, data)
        })
        .catch(err => console.log(err))
}



