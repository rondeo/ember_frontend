import Route from '@ember/routing/route';

export default Route.extend({
  model({ user_id: userId }) {
    return this.store.findRecord('user', userId);
  }
});
