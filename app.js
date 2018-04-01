const express = require('express'),
    movieDB = require('moviedb')('15d2ea6d0dc1d476efbca3eba2b9bbfb'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express();

app.set("view engine", "ejs");
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", (req, res) => {
    res.render("index");

});

app.post("/search", (req, res) => {
    let query = req.body.search;

    movieDB.searchMovie({ query: `${query}` }, (err, result) => {

        // console.log(MOVIEDBAPIKEY);
        if (err || result.total_results == 0) {
            res.render('404');
        } else {
            res.render('show', { result: result });
        }

    });
});

app.listen(8080, () => {
    console.log("the app is running");
});