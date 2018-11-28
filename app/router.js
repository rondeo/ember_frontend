import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('users', function() {
    this.route('add');
  });

  this.route('user', { path: 'user/:user_id' }, function() {
    this.route('edit');
  });
});

export default Router;
