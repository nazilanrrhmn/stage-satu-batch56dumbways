let dataProject = [];

function addProject(event) {
  event.preventDefault();

  let projectName = document.getElementById("projectName").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let description = document.getElementById("description").value;

  let durationTime = new Date(endDate) - new Date(startDate);

  let project = {
    projectName,
    durationTime,
    postAt: new Date(),
    description,
  };

  dataProject.push(project);

  console.log(dataProject);
  renderProject();
}

function renderProject() {
  document.getElementById("content").innerHTML = "";

  dataProject.forEach((project, index) => {
    document.getElementById("content").innerHTML += `
        <div class="container-card" id="project-${index}">
            <img src="./assets/img/luffy.jpg" alt="img-profile">
            <h4><a href="./detail_project.html">${project.projectName}</a></h4>
            <span id="postTime-${index}">Posted: ${getPostTime(
      project.postAt
    )}</span>
            <p>${project.description}</p>
            <div class="container-logo">
              <i class="fa-brands fa-google-play"></i>
              <i class="fa-brands fa-android"></i>
              <i class="fa-brands fa-java"></i>
            </div>
            <div class="container-button">
              <button class="edit-button">edit</button>
              <button class="delete-button">delete</button>
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