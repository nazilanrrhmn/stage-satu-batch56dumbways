// JavaScript untuk halaman edit (edit-project.js)
function loadProjectForEdit() {
  // Ambil parameter ID dari URL
  const urlParams = new URLSearchParams(window.location.search);
  const index = urlParams.get('index');

  if (index !== null) {
    let dataProject = JSON.parse(localStorage.getItem('projects')) || [];
    const project = dataProject[index];

    if (project) {
      document.getElementById("projectName").value = project.projectName;
      document.getElementById("startDate").value = new Date(project.postAt).toISOString().split("T")[0];
      document.getElementById("endDate").value = new Date(project.postAt).toISOString().split("T")[0];
      document.getElementById("description").value = project.description;

      // Handle technologies
      document.getElementById("checkNode").checked = project.technologies.includes("NodeJS");
      document.getElementById("checkReact").checked = project.technologies.includes("ReactJS");
      document.getElementById("checkNext").checked = project.technologies.includes("NextJS");
      document.getElementById("checkTypescript").checked = project.technologies.includes("TypeScript");

      // Optional: Handle image preview if needed
      if (project.image) {
        document.getElementById("imagePreview").src = project.image;
      }
    } else {
      console.error("Project not found");
    }
  } else {
    console.error("No index provided");
  }
}

window.onload = function () {
  loadProjectForEdit();
};


// function editProject(index) {
//   let dataProject = JSON.parse(localStorage.getItem('projects')) || [];
//   const project = dataProject[index];

//   document.getElementById("projectIndex").value = index;
//   document.getElementById("projectName").value = project.projectName;
//   document.getElementById("startDate").value = new Date(project.startDate).toISOString().split("T")[0];
//   document.getElementById("endDate").value = new Date(project.endDate).toISOString().split("T")[0];
//   document.getElementById("description").value = project.description;

//   // Handle technologies
//   document.getElementById("checkNode").checked = project.technologies.includes("NodeJS");
//   document.getElementById("checkReact").checked = project.technologies.includes("ReactJS");
//   document.getElementById("checkNext").checked = project.technologies.includes("NextJS");
//   document.getElementById("checkTypescript").checked = project.technologies.includes("TypeScript");
// }

// function updateProject() {
//   const index = document.getElementById("projectIndex").value;
//   let dataProject = JSON.parse(localStorage.getItem('projects')) || [];

//   const updatedProject = {
//     projectName: document.getElementById("projectName").value,
//     startDate: document.getElementById("startDate").value,
//     endDate: document.getElementById("endDate").value,
//     description: document.getElementById("description").value,
//     technologies: Array.from(document.querySelectorAll('input[name="technologies"]:checked')).map(cb => cb.value),
//     image: document.getElementById("uploadImage").files[0] ? URL.createObjectURL(document.getElementById("uploadImage").files[0]) : null
//   };

//   dataProject[index] = updatedProject;
//   localStorage.setItem('projects', JSON.stringify(dataProject));

//   // Redirect or update UI
//   window.location.href = '/project'; // Redirect to project list page or update UI as needed
// }