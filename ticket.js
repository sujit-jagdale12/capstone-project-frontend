document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('generateTicket').addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const ticketContent = `
            <h2>Event Ticket</h2>
            <p>Name: ${name}</p>
            <!-- Add other attendee details if needed -->
        `;

        html2pdf()
            .set({ filename: 'event_ticket.pdf' })
            .from(ticketContent)
            .save();
    });
});
