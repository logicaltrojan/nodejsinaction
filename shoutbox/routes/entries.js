

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('post', { title: 'Post' });
});

router.post('/', function (req, res, next) {

    const data = req.body.entry;
    const user = req.locals.user;
    const username = user ? user.name : null;
    const entry = new Entry({
        username : username,
        title : data.title,
        body : data.body
    });
    entry.save((err) => {
        if(err) next(err);
        res.redirect('/');
    })
});

module.exports = router;


