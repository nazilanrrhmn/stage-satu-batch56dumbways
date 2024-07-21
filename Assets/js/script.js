function getData() {
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

// My Projects
document.getElementById("myForm").addEventListener("submit", function (event) {
  // Prevent the default form submission
  event.preventDefault();

  // Get form data
  const projectName = document.getElementById("projectName").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const description = document.getElementById("description").value;
  const checkNode = document.getElementById("checkNode").checked;
  const checkReact = document.getElementById("checkReact").checked;
  const checkNext = document.getElementById("checkNext").checked;
  const checkTypescript = document.getElementById("checkTypescript").checked;
  // const uploadImage = document.getElementById("uploadImage").files[0];

  // Log form data to console
  console.log("Project Name:", projectName);
  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);
  console.log("Description:", description);
  console.log("NodeJS:", checkNode);
  console.log("ReactJs:", checkReact);
  console.log("NextJs:", checkNext);
  console.log("TypeScript:", checkTypescript);
  // console.log(
  //   "Upload Image:",
  //   uploadImage ? uploadImage.name : "No file selected"
  // );
});
