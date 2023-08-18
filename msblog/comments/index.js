const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostID = {};

//Get request handler
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostID[req.params.id]) || [];
});

//My post request handler
app.post('/posts/:id/comments', (req, res) => {
    //generate a randombyte ID for comment
    const commentId = randomBytes(4).toString('hex');

    //the content of the comment will be the body of the req
    const { content } = req.body;

    //to fetch the comments made by a specific id or return empty if there isn't
    const comments = commentsByPostID[req.params.id] || [];

    comments.push({ id: commentId, content });

    commentsByPostID[req.params.id] = comments;

    res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log('Listening on 4001')
});