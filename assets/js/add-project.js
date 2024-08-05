document.getElementById("projectForm").addEventListener("submit", addProject);

function addProject(event) {
  event.preventDefault();

  let dataProject = JSON.parse(localStorage.getItem('projects')) || [];

  let projectName = document.getElementById("projectName").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let description = document.getElementById("description").value;
  let uploadImage = document.getElementById("uploadImage").files[0];
  let technologies = [];
  if (document.getElementById("checkNode").checked) technologies.push("NodeJS");
  if (document.getElementById("checkReact").checked) technologies.push("ReactJs");
  if (document.getElementById("checkNext").checked) technologies.push("NextJs");
  if (document.getElementById("checkTypescript").checked) technologies.push("TypeScript");

  let durationTime = new Date(endDate) - new Date(startDate);

  let reader = new FileReader();
  reader.onload = function (event) {
    let project = {
      projectName,
      durationTime,
      postAt: new Date(),
      description,
      technologies,
      image: event.target.result,
    };

    dataProject.push(project);
    localStorage.setItem('projects', JSON.stringify(dataProject));
    console.log(dataProject);

    // Redirect to the project list page
    window.location.href = 'project.html';
  };

  if (uploadImage) {
    reader.readAsDataURL(uploadImage);
  } else {
    let project = {
      projectName,
      durationTime,
      postAt: new Date(),
      description,
      technologies,
      image: "",
    };

    dataProject.push(project);
    localStorage.setItem('projects', JSON.stringify(dataProject));
    console.log(dataProject);

    // Redirect to the project list page
    window.location.href = 'project.html';
  }
}