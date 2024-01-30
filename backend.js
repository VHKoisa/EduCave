const express = require("express");
const fs = require("fs");
const app = express();
const mysql = require("mysql");

// Set up middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/'));
const port = 3000; //as port 80 is used by apache server we are using other port
const home = fs.readFileSync('index.html');
const about = fs.readFileSync('aboutus.html');
const demo = fs.readFileSync('demo.html');
const scholarship = fs.readFileSync('scholarship.html');
const privacy = fs.readFileSync('privacy.html');
const refund = fs.readFileSync('refund.html');
const terms = fs.readFileSync('terms.html');
const form = fs.readFileSync('form.html');
const teachers = fs.readFileSync('teachers.html');


app.get(["/","/index"],(req,res)=>{
    res.end(home);
})
app.get("/about",(req,res)=>{
    res.end(about);
})
app.get("/appointment",(req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.end(form);
})
app.get("/demo",(req,res)=>{
    res.end(demo);
})
app.get("/scholarship",(req,res)=>{
    res.end(scholarship);
})
app.get("/privacy",(req,res)=>{
    res.end(privacy);
})
app.get("/refund",(req,res)=>{
    res.end(refund);
})
app.get("/terms",(req,res)=>{
    res.end(terms);
})
app.get("/teachers",(req,res)=>{
  res.end(teachers);
})

//the post method to handle form submission
app.post("/submit-form", (req, res) => {
    const { fname, lname, state, city, pin, mobile, email } = req.body;
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'webwonders',
    });
  
    // Connect to the database
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting server:', err);
        res.status(500).send('Error connecting to the server.');
        return;
      }
  
      // Insert data into the table 'webwarriers'
      const insertQuery = `INSERT INTO webwarriers VALUES (?, ?, ?, ?, ?, ?, ?)`;
      connection.query(insertQuery, [fname, lname, state, city, pin, mobile, email], (error, results) => {
        connection.end();
        if (error) {
          console.error('Error saving data to server:', error);
          res.status(500).send('Error saving data to the server.');
        } else {
          console.log('Data successfully saved to server.');
          res.status(200).send('Data successfully saved.');
        }
      });
    });
  });
  
app.listen(port,()=>{
    console.log(`The server is started successfully on port ${port}`);
})