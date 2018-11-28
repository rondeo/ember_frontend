import Controller from '@ember/controller';
import UserValidations from '../../validations/user';

export default Controller.extend({
  UserValidations,

  actions: {
    save(changeset) {
      let user = this.model;
      user.setProperties(
        changeset.get('change')
      );
      return user.save()
        .then(() => {
          this.transitionToRoute('users');
        })
        .catch((error) => {
          alert(`Konnte die Änderungen an Mitarbeiter ${user.name} nicht speichern.`);
          throw error;
        });
    }
  }
});
