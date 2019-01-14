import Route from '@ember/routing/route';

export default Route.extend({
  model({ movie_id: movieId }) {
    return this.store.findRecord('movie', movieId);
  }
});
