const express = require('express');

const app = express();

app.use((req, res, next) =>{
  console.log('This is the first middleware.');
  next();
  console.log('returning from first middleware');
});

app.use((req, res, next) =>{
  console.log('second middleware');
  res.send('Hello from express!')
  console.log('returning from second middleware');
});

module.exports = app;
