import Controller from '@ember/controller';
import MovieValidations from '../../validations/movie';

export default Controller.extend({
  MovieValidations,

  actions: {
    save(changeset) {
      let movie = this.model;
      movie.setProperties(
        changeset.get('change')
      );
      return movie.save()
        .then(() => {
          this.transitionToRoute('movies');
        })
        .catch((error) => {
          alert(`Movie ${movie.title} could not be saved.`);
          throw error;
        });
    }
  }
});
