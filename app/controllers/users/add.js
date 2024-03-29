import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import UserValidations from '../../validations/user';

export default Controller.extend({
  store: service(),

  UserValidations,

  actions: {
    save(changeset) {
      let record = this.store.createRecord('user', changeset.get('change'));
      return record.save()
        .then(() => {
          this.transitionToRoute('users');
        })
        .catch((error) => {
          alert(`Mitarbeiter konnte nicht gespeichert werden: ${error}`);

          record.destroy();
        });
    }
  }
});
