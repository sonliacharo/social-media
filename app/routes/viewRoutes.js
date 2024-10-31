const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/auth/register.html'));
});

router.get('/confirmation', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/auth/confirmation.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/auth/login.html'));
});

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard/home.html'));
});

router.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/post/post.html'));
});

router.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/user/profile.html'));
});

router.get('/my-posts', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/post/my-posts.html'));
});

router.get('/delete-post', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/post/delete.html'));
});

module.exports = router;
