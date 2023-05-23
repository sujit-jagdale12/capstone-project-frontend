const ticketSalesData = {
    vip: 30,
    earlyBird: 50,
    group: 20
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
                'rgba(54, 162, 235, 0.6)',
                'rgba(75, 192, 192, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Ticket Sales Analytics'
            }
        }
    }
});