const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({
  extended: true
}));

// Using EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));

// Third-party Middleware
app.use(expressLayouts);

// Built-in Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
});

// Function to ensure projects.json file exists
function ensureProjectsFile() {
  if (!fs.existsSync('projects.json')) {
    fs.writeFileSync('projects.json', JSON.stringify([]));
  }
}

// Hapus data yang tidak ada ID
// function removeProjectsWithoutId() {
//   ensureProjectsFile(); // Ensure the file exists
//   let projects = [];
//   try {
//     projects = JSON.parse(fs.readFileSync('projects.json', 'utf8'));
//   } catch (err) {
//     console.error('Error reading projects file:', err);
//   }

//   // Filter out projects that do not have a valid ID
//   const updatedProjects = projects.filter(p => p.id && !isNaN(p.id) && p.id > 0);

//   // Save updated projects
//   fs.writeFileSync('projects.json', JSON.stringify(updatedProjects, null, 2));
// }

// // Call this function when needed, e.g., on startup or as a cleanup task
// removeProjectsWithoutId();


// Home Page
app.get('/', (req, res) => {
  res.render('index', {
    layout: 'layouts/main-layout',
    title: "B56 - Home Page"
  });
});

// Project Page
app.get('/project', (req, res) => {
  ensureProjectsFile(); // Ensure the file exists
  let projects = [];
  try {
    projects = JSON.parse(fs.readFileSync('projects.json', 'utf8'));
  } catch (err) {
    console.error('Error reading projects file:', err);
  }
  res.render('project', {
    layout: 'layouts/main-layout',
    title: "B56 - Project Page",
    projects
  });
});

// Add Project Page
app.get('/add-project', (req, res) => {
  res.render('add-project', {
    layout: 'layouts/main-layout',
    title: "B56 - Add Project"
  });
});

// Add Project Page
app.post('/add-project', upload.single('image'), (req, res) => {
  ensureProjectsFile(); // Ensure the file exists
  let {
    projectName,
    startDate,
    endDate,
    description,
    technologies
  } = req.body;
  let image = req.file ? `/uploads/${req.file.filename}` : "";

  let durationTime = new Date(endDate) - new Date(startDate);

  let projects = [];
  try {
    projects = JSON.parse(fs.readFileSync('projects.json', 'utf8'));
  } catch (err) {
    console.error('Error reading projects file:', err);
  }

  // Ensure technologies is an array
  technologies = Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',') : []);

  // Generate a unique ID for the new project
  let projectId = projects.length > 0 ? projects[projects.length - 1].id + 1 : 1;

  let project = {
    id: projectId,
    projectName,
    durationTime,
    postAt: new Date(),
    description,
    technologies,
    image
  };

  projects.push(project);
  fs.writeFileSync('projects.json', JSON.stringify(projects, null, 2));

  res.redirect('/project');
});

// Edit Project Page
app.get('/edit-project/:projectId', (req, res) => {
  const projectId = parseInt(req.params.projectId, 10); // Corrected parameter name

  ensureProjectsFile(); // Ensure the file exists
  let projects = [];
  try {
    projects = JSON.parse(fs.readFileSync('projects.json', 'utf8'));
  } catch (err) {
    console.error('Error reading projects file:', err);
  }

  const project = projects.find(p => p.id === projectId);

  if (project) {
    res.render('edit-project', {
      layout: 'layouts/main-layout',
      title: "B56 - Edit Project",
      project
    });
  } else {
    res.status(404).send('<h1>404 - Project Not Found</h1>');
  }
});

// Update Project (POST)
app.post('/edit-project/:projectId', upload.single('image'), (req, res) => {
  const projectId = parseInt(req.params.projectId, 10);

  ensureProjectsFile(); // Ensure the file exists
  let projects = [];
  try {
    projects = JSON.parse(fs.readFileSync('projects.json', 'utf8'));
  } catch (err) {
    console.error('Error reading projects file:', err);
  }

  const projectIndex = projects.findIndex(p => p.id === projectId);

  if (projectIndex === -1) {
    return res.status(404).send('<h1>404 - Project Not Found</h1>');
  }

  let {
    projectName,
    startDate,
    endDate,
    description,
    technologies
  } = req.body;
  let image = req.file ? `/uploads/${req.file.filename}` : "";

  let durationTime = new Date(endDate) - new Date(startDate);

  // Ensure technologies is an array
  technologies = Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',') : []);

  // Update project details
  projects[projectIndex] = {
    id: projectId,
    projectName,
    startDate,
    endDate,
    durationTime,
    postAt: projects[projectIndex].postAt, // Keep original postAt
    description,
    technologies,
    image: image || projects[projectIndex].image // Keep original image if no new image uploaded
  };

  // Save updated projects
  fs.writeFileSync('projects.json', JSON.stringify(projects, null, 2));

  res.redirect('/project');
});

// Delete Project (POST)
app.post('/delete-project/:projectId', (req, res) => {
  const projectId = parseInt(req.params.projectId, 10);

  ensureProjectsFile(); // Ensure the file exists
  let projects = [];
  try {
    projects = JSON.parse(fs.readFileSync('projects.json', 'utf8'));
  } catch (err) {
    console.error('Error reading projects file:', err);
  }

  const updatedProjects = projects.filter(p => p.id !== projectId);

  if (projects.length === updatedProjects.length) {
    return res.status(404).send('<h1>404 - Project Not Found</h1>');
  }

  // Save updated projects
  fs.writeFileSync('projects.json', JSON.stringify(updatedProjects, null, 2));

  res.redirect('/project');
});



// app.post('/edit-project/:projectId', upload.single('image'), (req, res) => {
//   const projectId = parseInt(req.params.projectId, 10);

//   ensureProjectsFile(); // Ensure the file exists
//   let projects = [];
//   try {
//     projects = JSON.parse(fs.readFileSync('projects.json', 'utf8'));
//   } catch (err) {
//     console.error('Error reading projects file:', err);
//   }

//   const projectIndex = projects.findIndex(p => p.id === projectId);

//   if (projectIndex === -1) {
//     return res.status(404).send('<h1>404 - Project Not Found</h1>');
//   }

//   let {
//     projectName,
//     startDate,
//     endDate,
//     description,
//     technologies
//   } = req.body;
//   let image = req.file ? `/uploads/${req.file.filename}` : projects[projectIndex].image;
//   let durationTime = new Date(endDate) - new Date(startDate);

//   // Ensure technologies is an array
//   technologies = Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',') : []);

//   projects[projectIndex] = {
//     id: projectId, // Ensure ID is maintained
//     projectName,
//     durationTime,
//     postAt: projects[projectIndex].postAt, // Keep original post date
//     description,
//     technologies,
//     image
//   };

//   fs.writeFileSync('projects.json', JSON.stringify(projects, null, 2));
//   res.redirect('/project');
// });
// app.post('/delete-project/:projectId', (req, res) => {
//   const projectId = parseInt(req.params.projectId, 10);

//   ensureProjectsFile(); // Ensure the file exists
//   let projects = [];
//   try {
//     projects = JSON.parse(fs.readFileSync('projects.json', 'utf8'));
//   } catch (err) {
//     console.error('Error reading projects file:', err);
//   }

//   const updatedProjects = projects.filter(p => p.id === projectId);

//   if (updatedProjects.length === 0) {
//     return res.status(404).send('<h1>404 - Project Not Found</h1>');
//   }

//   // Save updated projects
//   fs.writeFileSync('projects.json', JSON.stringify(updatedProjects, null, 2));
//   res.redirect('/project');
// });


// Testimonial Page

app.get('/detail-project/:projectId', (req, res) => {
  const projectId = parseInt(req.params.projectId, 10);

  ensureProjectsFile(); // Ensure the file exists
  let projects = [];
  try {
    projects = JSON.parse(fs.readFileSync('projects.json', 'utf8'));
  } catch (err) {
    console.error('Error reading projects file:', err);
  }

  const project = projects.find(p => p.id === projectId);

  if (project) {
    res.render('detail-project', {
      layout: 'layouts/main-layout',
      title: "B56 - Project Detail",
      project
    });
  } else {
    res.status(404).send('<h1>404 - Project Not Found</h1>');
  }
});


app.get('/testimonial', (req, res) => {
  res.render('testimonial', {
    layout: 'layouts/main-layout',
    title: "B56 - Testimonial Page"
  });
});

// Contact Page
app.get('/contact', (req, res) => {
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: "B56 - Contact Page"
  });
});

// 404 Error Handling
app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

// Start Server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});