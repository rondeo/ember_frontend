import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import MovieValidations from '../../validations/movie';

export default Controller.extend({
  store: service(),

  MovieValidations,

  actions: {
    save(changeset) {
      let record = this.store.createRecord('movie', changeset.get('change'));
      return record.save()
        .then(() => {
          this.transitionToRoute('movies');
        })
        .catch((error) => {
          alert(`Movie could not be saved: ${error}`);

          record.destroy();
        });
    }
  }
});
