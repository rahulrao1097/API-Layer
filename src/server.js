//cookie
const cookieParser = require('cookie-parser');
// use the express library
const fetch = require('node-fetch');
const express = require('express');

// create a new server application
const app = express();

// Define the port we will listen on
// (it will attempt to read an environment global
// first, that is for when this is used on the real
// world wide web).
const port = process.env.PORT || 3000;


// The main page of our website
app.get("/trivia", async (req, res) => {
  // fetch the data
  const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");

  // fail if bad response
  if (!response.ok) {
    res.status(500);
    res.send(`Open Trivia Database failed with HTTP code ${response.status}`);
    return;
  }

  // interpret the body as json
  
  const content = await response.json();
  console.log(content);
  const question = content.results[0]['question'];

  let crctans = content.results[0]['correct_answer'];

  let incorrect_ans = content.results[0]['incorrect_answers'];

  let answers = incorrect_ans.concat(crctans);

  let difficulty = content.results[0]['difficulty'];

  let category = content.results[0]['category'];
  

  // fail if db failed
  //if (data.response_code !== 0) {
    //res.status(500);
    //res.send(`Open Trivia Database failed with internal response code ${data.response_code}`);
    //return;
  //}
  

  // respond to the browser
  // TODO: make proper html

  res.render('trivia',{
    question: question,
    answers: answers,
    category: category,
    difficulty: difficulty,
    crctans:crctans


  });
});
app.listen(port);
app.use(express.static('public'));
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(cookieParser());

// Printout for readability
console.log("Server Started!");
