const notifications = [
    {
      title: 'Important Announcement',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      title: 'Reminder: Event Tomorrow',
      message: 'Don\'t forget about the event happening tomorrow at 7 PM.'
    },
    {
      title: 'System Maintenance',
      message: 'We will be performing system maintenance on Friday, from 10 PM to 12 AM.'
    }
  ];

  function displayNotifications() {
    const notificationList = document.getElementById('notificationList');

    notificationList.innerHTML = '';

    notifications.forEach(notification => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.innerHTML = `
        <h5 class="mb-1">${notification.title}</h5>
        <p class="mb-1">${notification.message}</p>
      `;
      notificationList.appendChild(listItem);
    });
  }
  window.addEventListener('load', displayNotifications);