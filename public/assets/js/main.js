// Nav is Active
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default action

      // Remove 'active' class from all nav-links
      navLinks.forEach(nav => nav.classList.remove('active'));

      // Add 'active' class to clicked nav-link
      this.classList.add('active');

      // Optional: Navigate to the clicked link's href
      window.location.href = this.getAttribute('href');
    });
  });
});

// Get Post AT
function getPostTime(postAt) {
  let now = new Date();
  let postDate = new Date(postAt);
  let diff = now - postDate;

  let miliSecond = 1000;
  let secondInMinute = 60;
  let minuteInHour = 60;
  let hourInDay = 24;
  let dayInMonth = 30;
  let monthInYear = 12;

  let diffInSeconds = Math.floor(diff / miliSecond);
  let diffInMinutes = Math.floor(diff / (miliSecond * secondInMinute));
  let diffInHours = Math.floor(
    diff / (miliSecond * secondInMinute * minuteInHour)
  );
  let diffInDays = Math.floor(
    diff / (miliSecond * secondInMinute * minuteInHour * hourInDay)
  );
  let diffInMonths = Math.floor(
    diff / (miliSecond * secondInMinute * minuteInHour * hourInDay * dayInMonth)
  );
  let diffInYears = Math.floor(
    diff /
    (miliSecond *
      secondInMinute *
      minuteInHour *
      hourInDay *
      dayInMonth *
      monthInYear)
  );

  if (diffInYears > 0) {
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago.`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago.`;
  } else if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago.`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago.`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago.`;
  } else {
    return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago.`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const postTimeElement = document.getElementById('post-time');
  const postAt = "<%= project.postAt %>";
  postTimeElement.textContent = getPostTime(postAt);
});