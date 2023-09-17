// require apth so express can always access views folder even if run from elsewhere
const path = require('path');

// require and set up express
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// data:
const redditData = require('./data.json');

// Use is middleware, it runs between each request and response - for serving static files
app.use(express.static(path.join(__dirname, '/public')));

// set view engine to ejs - after installing ejs
app.get ('/', (req, res) => {
    const date = new Date();
    res.render('home',
      { date: date }
    );
});

// Using params from the URL entered
app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  console.log(data)
  if (data) {
    res.render('subreddit', {  ...data });
  } else {
    res.render('notfound', { subreddit })
  }

});


app.get('/r/:subreddit/:postId', (req, res) => {
  console.log(req.params);
  const { subreddit, postId } = req.params;
  res.send(`<h1>Post: ${postId} on r/${subreddit}</h1>`);
});

app.get('/cats', (req, res) => {
  res.send('cats');
});

app.get('/dogs', (req, res) => {
  res.send('WOOFEY');
});

app.get('/rand', (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render('random',
    { rand: num }
  );
});

app.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.send('Cannot search with no input')
  } else {
    res.send(`<h1>Results for '${q}'</h1>`);
  }
});

app.get('*', (req, res) => {
  res.send('Path unknown');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
