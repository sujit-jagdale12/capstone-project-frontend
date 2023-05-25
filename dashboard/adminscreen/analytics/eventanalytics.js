const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id;
};

function apiTicketAnalytics() {
    const eventId = readIdQueryParam();
    axios.get(`http://localhost:8080/admin/events/analytics/${eventId}`)
        .then(res => {
            const { data } = res;
            console.log(data);

            for (const item of data) {
                const { ticketType, ticketCount, totalQuantity } = item;
                ticketSalesData[ticketType] = totalQuantity;
            }

            if (areAllTicketCountsZero(ticketSalesData)) {
                const errMsg = document.getElementById('errMsg');
                errMsg.innerHTML = "<strong><h2>No data found.</h2></strong>";
            }
            console.log(ticketSalesData);

            updateChart();
        })
        .catch(err => console.log(err));
}


apiTicketAnalytics();
const ticketSalesData = {
    vip: 0,
    earlybird: 0,
    group: 0
};

const ctx = document.getElementById('ticketSalesChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: Object.keys(ticketSalesData),
        datasets: [{
            label: 'Ticket Sales',
            data: Object.values(ticketSalesData),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(252, 186, 3, 0.6)',
                'rgba(54, 162, 235, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(252, 186, 3, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    }
});

function updateChart() {
    chart.data.labels = Object.keys(ticketSalesData);
    chart.data.datasets[0].data = Object.values(ticketSalesData);
    chart.update();
}
function areAllTicketCountsZero(ticketSalesData) {
    for (const ticketType in ticketSalesData) {
        if (ticketSalesData.hasOwnProperty(ticketType) && ticketSalesData[ticketType] !== 0) {
            return false;
        }
    }
    return true;
}
function backToUpdate() {
    window.history.back();
}