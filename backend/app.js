const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/node-angular?retryWrites=true")
.then( () => {
  console.log('Connected to database!');
})
.catch( ()=> {
  console.log('Connection to database failed!');
});

app.use( bodyParser.json());
app.use( bodyParser.urlencoded( {extended:false}));

app.use( (req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  )

  next();

});

app.post( '/api/posts', (req, res, next) =>{

  const post = new Post({
    title : req.body.title,
    content : req.body.content
  });
  console.log("This is the post from the client");
  console.log(post);
  post.save().then( result => {
    res.status(201).json( {
      message : 'Post added successfully',
      postId : result._id
    });
  }
  );
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    console.log(documents)
    
    res.status(200).json(
      {
        message: 'Posts fetched successfully!',
        posts : documents
      }
    
    )
  });
  
});

app.get('/api/posts/:id', (req, res, next) => {
  console.log("Inside get. Params:")
  console.log(req.params.id);
  Post.findOne( {_id : req.params.id}).then( postFetched => {
    console.log(postFetched);
    res.status(200).json(
      { message : 'Post fetched!',
        post : postFetched
     });
  });

})

app.delete('/api/posts/:id', (req, res, next) => {

  console.log(req.params.id);

  Post.deleteOne( {_id : req.params.id}).then( result => {
    console.log(result);
    res.status(200).json({ message : 'Post deleted!' });
  });

})
module.exports = app;
