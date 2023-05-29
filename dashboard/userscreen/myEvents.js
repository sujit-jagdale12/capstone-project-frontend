
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
            <style>
                body {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    padding: 0;
                }
                .ticket {
                    background-color: #f9f9f9;
                    border-top: 2px solid #ccc;
                    border-bottom: 2px solid #ccc;
                    padding: 20px;
                    margin-top: 30px;
                    text-align: center;
                }
                h1 {
                    margin-bottom: 10px;
                }
                p {
                    margin: 8px 0;
                }
            </style>
        </head>
        <body>
            <div class="ticket">
                <h1>${title}</h1>
                <p><strong>Ticket Code:</strong> ${ticketCode}</p>
                <p><strong>Start Date:</strong> ${startdate}</p>
                <p><strong>End Date:</strong> ${enddate}</p>
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Time:</strong> ${time}</p>
            </div>
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



