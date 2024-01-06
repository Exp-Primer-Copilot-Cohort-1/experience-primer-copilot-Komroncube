// create web server and use express module
// create router object
// use router object to register router
// export router object
var express = require('express');
var router = express.Router();
var commentModel = require('../models/commentModel');
var moment = require('moment');
var now = moment().format('YYYY-MM-DD HH:mm:ss');

// show comments list
router.get('/', function(req, res, next) {
    commentModel.getAllComments(function(err, rows) {
        if (err) {
            res.render('comments', { title: 'Comments - Error', comments: [] });
        } else {
            res.render('comments', { title: 'Comments', comments: rows });
        }
    });
});

// show comment form
router.get('/add', function(req, res, next) {
    res.render('commentForm', { title: 'Add Comment', comment: {}, action: '/comments/add' });
});

// process add comment
router.post('/add', function(req, res, next) {
    var comment = {
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        created_at: now
    };
    commentModel.addComment(comment, function(err, result) {
        if (err) {
            res.render('commentForm', { title: 'Add Comment - Error', comment: comment, action: '/comments/add' });
        } else {
            res.redirect('/comments');
        }
    });
});

// show edit comment form
router.get('/edit/:id', function(req, res, next) {
    commentModel.getCommentById(req.params.id, function(err, result) {
        if (err) {
            res.render('commentForm', { title: 'Edit Comment - Error', comment: {}, action: '/comments/edit/' + req.params.id });
        } else {
            res.render('commentForm', { title: 'Edit Comment', comment: result, action: '/comments/edit/' + req.params.id });
        }
    });
});

// process edit comment
router.post('/edit/:id', function(req, res, next) {
    var comment = {
        id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    };
    commentModel.updateComment(comment, function(err, result) {
        if (err) {
            res.render('commentForm', { title: 'Edit Comment - Error', comment: comment, action: '/comments/edit/' + req.params.id })
        }
    })});