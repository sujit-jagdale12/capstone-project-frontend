for(const invoice of invoices) {

    const { id, client, invDt, amt } = invoice
    const updatePageUrl = `./update-invoice.html?id=${id}`
    const viewPageUrl = `./view-invoice.html?id=${id}`

    const row = table.insertRow()
    row.insertCell(0).innerHTML = id
    row.insertCell(1).innerHTML = client
    row.insertCell(2).innerHTML = amt
    row.insertCell(3).innerHTML = invDt
    row.insertCell(4).innerHTML = `
        <a href='${viewPageUrl}'>View</a> 
        <a class='ms-2' href='${updatePageUrl}'>Update</a> 
        <a class='ms-2' onclick='showConfirmDeleteModal(${id})'>Delete</a> 
    `
}