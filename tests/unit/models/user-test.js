import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | user', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('#name', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('user', {});
    assert.equal(model.name, null, 'both first and last name undefined');

    model.set('lastName', 'Doe');
    assert.equal(model.name, 'Doe', 'only last name defined');

    model.set('firstName', 'John');
    model.set('lastName', undefined);
    assert.equal(model.name, 'John', 'only first name defined');

    model.set('lastName', 'Doe');
    assert.equal(model.name, 'John Doe', 'both first and last name defined');
  });
});
