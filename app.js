const express = require('express'),
    movieDB = require('moviedb')('15d2ea6d0dc1d476efbca3eba2b9bbfb'),
    app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    movieDB.searchMovie({ query: 'lord of the rings' }, (err, result) => {

        // console.log(MOVIEDBAPIKEY);
        if (err || result.total_results == 0) {
            res.send('Please try again');
        } else {
            res.render('index', { result: result });
        }

    });
});

app.listen(8080, () => {
    console.log("the app is running");
});