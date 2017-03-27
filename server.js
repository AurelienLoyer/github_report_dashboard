const port = 1337;
const config = require('./config.js');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const GitHubApi = require("github");
const oauth = require("oauth").OAuth2;
const OAuth2 = new oauth(config.GITHUB_CLIENT_ID, config.GITHUB_CLIENT_SECRET, "https://github.com/", "login/oauth/authorize", "login/oauth/access_token");

let accessToken

server.listen(port);
console.log('Server listen on port : '+port);

let github = new GitHubApi({
  // optional
  debug: true,
  protocol: 'https',
  host: 'api.github.com', // should be api.github.com for GitHub
  pathPrefix: '', // for some GHEs; none for GitHub
  headers: {
    'user-agent': 'cool-github-commit-report' // GitHub is happy with a unique user agent
  },
  Promise: require('bluebird'),
  followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
  timeout: 5000
});

app.use(express.static('front'));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/auth/github',function(req,res){
  let base_uri = 'http://localhost:1337'
  console.log(req)
  res.writeHead(303, {
    Location: OAuth2.getAuthorizeUrl({
      redirect_uri: base_uri+'/auth/github/callback',
      scope: "user,repo"
    })
  });
  res.end();
});

app.get('/auth/github/callback',function (req, res) {

  if(req.query.error){
    res.send(req.query.error)
    res.end()
  }

  OAuth2.getOAuthAccessToken(req.query.code, {}, function (err, access_token, refresh_token) {
    if (err) {
      console.log(err);
    }
    res.redirect('/?token='+access_token);
  });
});

app.get('/', function(req, res,next) {
  res.sendfile(__dirname +'/front'+ '/index.html');
  app.use(express.static(__dirname + '/front'));
  //app.use('/front/',express.static(__dirname + './front'))
});

app.get('/commits',function(req,res,next){

  let accessToken = req.query.token
  if(!accessToken){
    res.set('Content-Type', 'text/html')
    res.status(401)
    res.end()
  }
  github.authenticate({
    type: "oauth",
    token: accessToken
  })

  let date = new Date()

  if(!req.query.since){
    req.query.since = date.toISOString().split('T')[0]+'T00:00:00Z'
  }

  if(!req.query.until){
    req.query.until = date.toISOString().split('T')[0]+'T23:59:59Z'
  }

  if(!req.query.branch){
    req.query.branch = 'master'
  }

  if(!req.query.repo){
    req.query.repo = 'Lavoir_Moderne'
  }

  if(!req.query.owner){
    req.query.owner = 'Zenika'
  }

  github.repos.getCommits({
    owner: req.query.owner,
    sha: req.query.branch,
    since: req.query.since,
    until: req.query.until,
    repo: req.query.repo
  },function(error, response) {
    res.json(response);
  });

})

app.get('/issues',function(req,res,next){

  let accessToken = req.query.token
  if(!accessToken){
    res.set('Content-Type', 'text/html')
    res.status(401)
    res.end()
  }

  github.authenticate({
    type: "oauth",
    token: accessToken
  })

  if(req.query.repo && req.query.owner){

    github.issues.getForRepo({
      owner: req.query.owner,
      repo: req.query.repo,
      per_page: 100
    }, function(err, response) {
      res.json(response);
    });

  }else{

    github.issues.getAll({
    }, function(err, response) {
      res.json(response);
    });

  }

})

app.get('/stars',function(req,res,next){

  let accessToken = req.query.token
  if(!accessToken){
    res.set('Content-Type', 'text/html')
    res.status(401)
    res.end()
  }
  github.authenticate({
    type: "oauth",
    token: accessToken
  })

  let date = new Date()
  let since = date.toISOString().split('T')[0]

  github.activity.getStarredRepos({}, function(err, response) {
    res.json(response);
  });

})

app.get('/repos',function(req,res,next){

  let accessToken = req.query.token
  if(!accessToken){
    res.set('Content-Type', 'text/html')
    res.status(401)
    res.end()
  }
  github.authenticate({
    type: "oauth",
    token: accessToken
  })

  github.repos.getAll({
    affiliation:'owner'
  }, function(err, response) {
    res.json(response);
  });

})

app.get('/branches',function(req,res,next){

  let accessToken = req.query.token
  if(!accessToken){
    res.set('Content-Type', 'text/html')
    res.status(401)
    res.end()
  }
  github.authenticate({
    type: "oauth",
    token: accessToken
  })

  github.repos.getBranches({
    owner: req.query.owner,
    repo: req.query.repo
  },function(error, response) {
    res.json(response);
  });

})


app.get('/me',function(req,res,next){

  let accessToken = req.query.token
  if(!accessToken){
    res.set('Content-Type', 'text/html')
    res.status(401)
    res.end()
  }
  github.authenticate({
    type: "oauth",
    token: accessToken
  })
  github.users.get({}, function(err, response) {
    res.json(response);
  })

})
