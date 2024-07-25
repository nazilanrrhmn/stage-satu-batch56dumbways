// Navbar
function toggleHamburger() {
  const hamburger = document.querySelector(".hamburger-container");

  hamburger.classList.toggle("hide");
}

// Contact
function getData() {
  event.preventDefault();

  let name = document.getElementById("nameInput").value;
  let email = document.getElementById("emailInput").value;
  let phoneInput = document.getElementById("phoneInput").value;
  let position = document.getElementById("position").value;
  let address = document.getElementById("address").value;

  console.log(name);
  console.log(email);
  console.log(phoneInput);
  console.log(position);
  console.log(address);
}
