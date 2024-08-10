'use strict';

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const {
  Project
} = require('./models');
const {
  QueryTypes
} = require('sequelize');
const sequelize = require('./models').sequelize;

const app = express();
const port = 3000;
const saltRounds = 10; // Number of salt rounds for hashing

// Middleware to parse form data
app.use(express.urlencoded({
  extended: true
}));

// Session Middleware
app.use(session({
  secret: 'noname',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 360000,
    secure: false,
    httpOnly: true
  },
  store: new session.MemoryStore(),
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

// Middleware to attach session data to res.locals
app.use((req, res, next) => {
  res.locals.isLogin = req.session.isLogin;
  res.locals.user = req.session.user;
  next();
});

// Home Page
app.get('/', (req, res) => {
  res.render('index', {
    layout: 'layouts/main-layout',
    title: "B56 - Home Page"
  });
});

// Login Page
app.get('/login', (req, res) => {
  res.render('login', {
    layout: 'layouts/main-layout',
    title: "B56 - Login"
  });
});

// Handle Login Form Submission
app.post('/login', async (req, res) => {
  try {
    const query = `SELECT * FROM "Users" WHERE email = :email`;
    const user = await sequelize.query(query, {
      replacements: {
        email: req.body.email
      },
      type: QueryTypes.SELECT
    });

    if (user.length === 0 || !(await bcrypt.compare(req.body.password, user[0].password))) {
      res.redirect('/login');
      return;
    }

    req.session.user = user[0];
    req.session.isLogin = true;
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Registration Page
app.get('/register', (req, res) => {
  const error = req.query.error;
  const success = req.query.success;
  res.render('register', {
    layout: 'layouts/main-layout',
    title: "B56 - Register",
    error,
    success
  });
});

// Handle Registration Form Submission
app.post('/register', async (req, res) => {
  try {
    const {
      username,
      email,
      password
    } = req.body;

    if (!username || !email || !password) {
      return res.redirect('/register?error=All fields are required');
    }

    const existingUser = await sequelize.query(`SELECT * FROM "Users" WHERE email = :email`, {
      replacements: {
        email
      },
      type: QueryTypes.SELECT
    });

    if (existingUser.length > 0) {
      return res.redirect('/register?error=Email sudah terdaftar');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await sequelize.query(`INSERT INTO "Users" (username, email, password, "createdAt", "updatedAt") VALUES (:username, :email, :password, NOW(), NOW())`, {
      replacements: {
        username,
        email,
        password: hashedPassword
      }
    });

    res.redirect('/login?success=Registration successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Server Error');
    }
    res.redirect('/login');
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
  const techArray = Array.isArray(technologies) ? technologies : [technologies];

  try {
    await Project.create({
      projectName,
      startDate,
      endDate,
      description,
      technologies: techArray,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      postAt: new Date()
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
  const projectId = parseInt(req.params.projectId, 10);
  const {
    projectName,
    startDate,
    endDate,
    description,
    technologies
  } = req.body;

  try {
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).send('<h1>404 - Project Not Found</h1>');
    }

    const technologiesArray = Array.isArray(technologies) ? technologies : [technologies];

    await Project.update({
      projectName,
      startDate,
      endDate,
      description,
      technologies: technologiesArray,
      image: req.file ? `/uploads/${req.file.filename}` : project.image,
      postAt: project.postAt
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
    if (isNaN(projectId)) {
      return res.status(400).send('<h1>400 - Bad Request</h1>');
    }

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