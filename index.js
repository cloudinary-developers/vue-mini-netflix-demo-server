var Express = require('express');
var Webtask = require('webtask-tools');
var bodyParser = require('body-parser');
var app = Express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// yet to be created
app.use(require('./middleware/db').connectDisconnect);

app.post('/movies', (req, res) => {
  const newMovie = new req.movieModal(
    Object.assign(req.body, { created_at: Date.now() })
  );
  console.log(req.body);
  newMovie.save((err, savedMovie) => {
    res.json(savedMovie);
  });
});

app.get('/movies', (req, res) => {
  req.movieModal
    .find({})
    .sort({ created_at: -1 })
    .exec((err, movies) => res.json(movies));
});

module.exports = Webtask.fromExpress(app);
