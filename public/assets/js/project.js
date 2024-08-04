let dataProject = [];

function addProject(event) {
  event.preventDefault();

  let projectName = document.getElementById("projectName").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let description = document.getElementById("description").value;
  let uploadImage = document.getElementById("uploadImage").files[0];
  let technologies = [];
  if (document.getElementById("checkNode").checked) technologies.push("NodeJS");
  if (document.getElementById("checkReact").checked)
    technologies.push("ReactJs");
  if (document.getElementById("checkNext").checked) technologies.push("NextJs");
  if (document.getElementById("checkTypescript").checked)
    technologies.push("TypeScript");

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
    console.log(dataProject);
    renderProject();
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
    console.log(dataProject);
    renderProject();
  }
}

function renderProject() {
  document.getElementById("content").innerHTML = "";

  dataProject.forEach((project, index) => {
    document.getElementById("content").innerHTML += `
                    <div class="col-md-4 mb-4" id="project-${index}">
                    <div class="card">
                      ${
                        project.image
                          ? `<img src="${project.image}" class="card-img-top" alt="Project Image">`
                          : ""
                      }
                      <span class="post-date" id="postTime-${index}">Posted: ${getPostTime(
      project.postAt
    )}</span>
                      <div class="card-body">
                        <a href="#" class="card-title">${
                          project.projectName
                        }</a>
                        <p class="card-text">
                        ${project.description}
                        </p>
                        <strong>Technologies:</strong> ${project.technologies.join(
                          ", "
                        )}<br />
                        <div class="card-actions d-flex justify-content-end">
                          <button class="btn btn-secondary me-2">Edit</button>
                          <button class="btn btn-danger">Delete</button>
                        </div>
                      </div>
                    </div>
                `;
  });

  // Update time elapsed every second
  setInterval(() => {
    dataProject.forEach((project, index) => {
      document.getElementById(
        `postTime-${index}`
      ).textContent = `Posted: ${getPostTime(project.postAt)}`;
    });
  }, 1000);
}

function getDurationTime(time) {
  let durationTime = time;

  let miliSecond = 1000;
  let secondInDay = 86400;
  let dayInMonth = 30;
  let monthInYear = 12;

  let durationTimeInDay = Math.floor(durationTime / (miliSecond * secondInDay));
  let durationTimeInMonth = Math.floor(
    durationTime / (miliSecond * secondInDay * dayInMonth)
  );
  let durationTimeInYear = Math.floor(
    durationTime / (miliSecond * secondInDay * dayInMonth * monthInYear)
  );

  let restOfMonthInYear = Math.floor(
    (durationTime % (miliSecond * secondInDay * dayInMonth * monthInYear)) /
    (miliSecond * secondInDay * dayInMonth)
  );

  if (durationTimeInYear > 0) {
    if (restOfMonthInYear > 0) {
      return `${durationTimeInYear} tahun ${restOfMonthInYear} bulan`;
    } else {
      return `${durationTimeInYear} tahun`;
    }
  } else if (durationTimeInMonth > 0) {
    return `${durationTimeInMonth} bulan`;
  } else {
    return `${durationTimeInDay} hari`;
  }
}

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
    return `${diffInYears} year ago.`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} month ago.`;
  } else if (diffInDays > 0) {
    return `${diffInDays} day ago.`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour ago.`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute ago.`;
  } else {
    return `${diffInSeconds} second ago.`;
  }
}

function editProject(index) {
  // Populate the form with the project details for editing
  const project = dataProject[index];
  document.getElementById("projectName").value = project.projectName;
  document.getElementById("startDate").value = new Date(project.postAt)
    .toISOString()
    .split("T")[0];
  document.getElementById("endDate").value = new Date(project.postAt)
    .toISOString()
    .split("T")[0];
  document.getElementById("description").value = project.description;

  // Handle technologies
  document.getElementById("checkNode").checked =
    project.technologies.includes("NodeJS");
  document.getElementById("checkReact").checked =
    project.technologies.includes("ReactJs");
  document.getElementById("checkNext").checked =
    project.technologies.includes("NextJs");
  document.getElementById("checkTypescript").checked =
    project.technologies.includes("TypeScript");

  // Optional: Handle image upload similarly
  // For simplicity, this example doesn't include handling of image upload
}

function deleteProject(index) {
  if (confirm("Are you sure you want to delete this project?")) {
    dataProject.splice(index, 1);
    renderProject();
  }
}