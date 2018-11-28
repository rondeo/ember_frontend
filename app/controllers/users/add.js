import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

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
