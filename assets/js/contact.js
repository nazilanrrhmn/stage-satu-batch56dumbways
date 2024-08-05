// Contact
function getData(event) {
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

// Attach the getData function to form submission
document.getElementById("contactForm").addEventListener("submit", getData);
