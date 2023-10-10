// Dependencies ////////////////////////////////////////////
import express from 'express'

// Configuration ///////////////////////////////////////////
const PORT = process.env.PORT || 5163

// Routes //////////////////////////////////////////////////
app.get('/chapters', function (req, res) {
  res.send('Display all items here')
})

// Web server setup ////////////////////////////////////////
const app = express()
app.use(express.static('./public'))

// Ready for browsers to connect ///////////////////////////
const displayPort = function () {
  console.log('Listening on ' + PORT)
}

app.listen(PORT, displayPort)

// Routes
const express = require('express');

// Sample database of chapters
const chapters = [
  { id: 1, title: 'Chapter 1', content: 'This is chapter 1.' },
  { id: 2, title: 'Chapter 2', content: 'This is chapter 2.' },
  // Add more chapters as needed
];

// Define a route for displaying chapters
app.get('/chapter/:id', (req, res) => {
  const chapterId = parseInt(req.params.id); // Retrieve the chapter ID from the URL

  // Find the chapter with the matching ID in your database
  const chapter = chapters.find(chap => chap.id === chapterId);

  if (!chapter) {
    // Handle the case where the chapter doesn't exist
    res.status(404).send('Chapter not found');
  } else {
    // Render a template or send the chapter content to the user
    res.render('chapter-detail', { chapter });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

