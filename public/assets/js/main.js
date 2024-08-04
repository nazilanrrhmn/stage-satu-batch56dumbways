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