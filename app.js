'use strict';

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
  Project
} = require('./models'); // Import your model
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({
  extended: true
}));

// Using EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views')); // Correct views path

// Third-party Middleware
app.use(expressLayouts);

// Built-in Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage
});

// Ensure projects.json file exists
function ensureProjectsFile() {
  if (!fs.existsSync('projects.json')) {
    fs.writeFileSync('projects.json', JSON.stringify([]));
  }
}

// Home Page
app.get('/', (req, res) => {
  res.render('index', {
    layout: 'layouts/main-layout',
    title: "B56 - Home Page"
  });
});

// Project Page (List all projects)
app.get('/project', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.render('project', {
      layout: 'layouts/main-layout',
      title: "B56 - Project Page",
      projects
    });
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).send('Server Error');
  }
});

// Add Project Page (Form)
app.get('/add-project', (req, res) => {
  res.render('add-project', {
    layout: 'layouts/main-layout',
    title: "B56 - Add Project"
  });
});

// Add a new project
app.post('/add-project', upload.single('image'), async (req, res) => {
  const {
    projectName,
    startDate,
    endDate,
    description,
    technologies
  } = req.body;

  // Ensure technologies is an array
  const techArray = Array.isArray(technologies) ? technologies : [technologies];

  try {
    await Project.create({
      projectName,
      startDate,
      endDate,
      description,
      technologies: techArray, // Store technologies as an array
      image: req.file ? `/uploads/${req.file.filename}` : "",
      postAt: new Date() // Set postAt to the current date
    });
    res.redirect('/project');
  } catch (err) {
    console.error('Error adding project:', err);
    res.status(500).send('Server Error');
  }
});



// Edit a project
app.get('/edit-project/:projectId', async (req, res) => {
  const projectId = parseInt(req.params.projectId, 10);

  try {
    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).send('<h1>404 - Project Not Found</h1>');
    }

    res.render('edit-project', {
      layout: 'layouts/main-layout',
      title: "B56 - Edit Project",
      project
    });
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).send('Server Error');
  }
});


app.post('/edit-project/:projectId', upload.single('image'), async (req, res) => {
  const projectId = parseInt(req.params.projectId, 10); // Ambil projectId dari parameter URL
  const {
    projectName,
    startDate,
    endDate,
    description,
    technologies
  } = req.body;

  try {
    // Fetch the current project to get the existing `postAt`
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).send('<h1>404 - Project Not Found</h1>');
    }

    // Convert technologies to a string if it is an array
    const technologiesArray = Array.isArray(technologies) ? technologies : [technologies];
    const technologiesString = technologiesArray.join(',');

    // Update project details
    await Project.update({
      projectName,
      startDate,
      endDate,
      description,
      technologies: technologiesString,
      image: req.file ? `/uploads/${req.file.filename}` : project.image, // Preserve existing image if not updated
      postAt: project.postAt // Keep original postAt value
    }, {
      where: {
        id: projectId
      }
    });

    res.redirect('/project');
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).send('Server Error');
  }
});


// Delete Project
app.post('/delete-project/:projectId', async (req, res) => {
  const projectId = parseInt(req.params.projectId, 10);

  try {
    const deleted = await Project.destroy({
      where: {
        id: projectId
      }
    });

    if (deleted) {
      res.redirect('/project');
    } else {
      res.status(404).send('<h1>404 - Project Not Found</h1>');
    }
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).send('Server Error');
  }
});

// Project Detail Page
app.get('/detail-project/:projectId', async (req, res) => {
  const projectId = parseInt(req.params.projectId, 10);

  try {
    const project = await Project.findByPk(projectId);
    if (project) {
      res.render('detail-project', {
        layout: 'layouts/main-layout',
        title: "B56 - Project Detail",
        project
      });
    } else {
      res.status(404).send('<h1>404 - Project Not Found</h1>');
    }
  } catch (err) {
    console.error('Error fetching project details:', err);
    res.status(500).send('Server Error');
  }
});

// Testimonial Page
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