import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');


  this.route('users', function() {
    this.route('add');
  });
  this.route('user', { path: 'user/:user_id' }, function() {
    this.route('edit');
  });


  this.route('movie', { path: 'movie/:movie_id' },function() {
    this.route('edit');
  });
  this.route('movies', function() {
    this.route('add');
  });


  this.route('projects', function() {
    this.route('add');
  });
  this.route('project', { path: 'project/:project_id' }, function() {
    this.route('edit');
  });
});

export default Router;
