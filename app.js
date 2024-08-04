const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

// Using EJS
app.set('view engine', 'ejs');
app.set('views', 'public/views');

// Third-party Middleware
app.use(expressLayouts);

// Build-in Middleware
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', {
    layout: 'layouts/main-layout',
    title: "B56 - Home Pages"
  });
})

app.get('/project', (req, res) => {
  res.render('project', {
    layout: 'layouts/main-layout',
    title: "B56 - Project Pages"
  });
})

app.get('/contact', (req, res) => {
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: "B56 - Contact Pages"
  });
})

app.get('/testimonial', (req, res) => {
  res.render('testimonial', {
    layout: 'layouts/main-layout',
    title: "B56 - Testimonial Pages"
  });
})

app.use((req, res) => {
  res.status(404);
  res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})