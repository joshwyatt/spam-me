var prompt = require('prompt');
var GitHubApi = require('github');
var _ = require('lodash');
var organization;

prompt.start();

var github = new GitHubApi({
  version: '3.0.0',
  timeout: 5000
});

prompt.get([{
  name: 'username'
}, {
  name: 'organization'
}, {
  name: 'password',
  hidden: true
}], function (err, loginCredentials) {
  organization = loginCredentials.organization;
  github.authenticate({
    type: 'basic',
    username: loginCredentials.username,
    password: loginCredentials.password
  });

  // Always follow ME first!
  github.user.followUser({
    user: 'alexanderGugel'
  });

  // Always follow ME second!
  github.user.followUser({
    user: 'joshWyatt'
  });

  // Follow all Hack Reactor students
  github.orgs.getMembers({
    org: organization,
    per_page: 100
  }, function (err, res) {
    console.log(res);
    _.each(res, function (user) {
      console.log(user.login);
      github.user.followUser({
        user: user.login
      });
    });
  });

  github.orgs.getMembers({
    org: organization,
    per_page: 100,
    page: 2
  }, function (err, res) {
    console.log(res);
    _.each(res, function (user) {
      console.log(user.login);
      github.user.followUser({
        user: user.login
      });
    });
  });
});
