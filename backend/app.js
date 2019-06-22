const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://ionut:1x9Emj5blBay5vNN@cluster0-xsvms.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() => {
    console.log("Connection successful");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type , Accept ');
  res.setHeader('Access-Control-Allow-Methods', 'GET , POST , PATCH, DELETE, OPTIONS');
  next();
})

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: result._id,
    });
  });


});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Post deleted' });
    })
});

app.use('/api/posts', (req, res, next) => {
  Post.find()
    .then(data => {
      res.status(200).json({
        message: 'Post fetched successfully',
        posts: data,
      });
    })

});



module.exports = app;
