const notifications = [];

function apiGetEventNotifications() {
  const userId = localStorage.getItem("userId");

  axios.get(`http://localhost:8080/attendee/${userId}/notification`)
    .then(function (response) {
      const data = response.data.bd;
      console.log(data);
      notifications.length = 0;

      data.forEach(item => {
        const notification = {
          message: item.message,
          date: item.date
        };
        notifications.push(notification);
      });

      displayNotifications();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function displayNotifications() {
  const notificationList = document.getElementById('notificationList');

  notificationList.innerHTML = '';

  if (notifications.length === 0) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = 'No notifications found.';
    notificationList.appendChild(listItem);
  } else {
    notifications.reverse().forEach(notification => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.innerHTML = `
      <text class="mb-1" style="font-size: smaller;">${notification.date}</text>
        <h5><p class="mb-1">${notification.message}</p></h5>
      `;
      notificationList.appendChild(listItem);
    });
  }
}

window.addEventListener('load', apiGetEventNotifications);
