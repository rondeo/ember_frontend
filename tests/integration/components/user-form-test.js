import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | user-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a form', async function(assert) {
    this.set("saveAction", () => {});
    await render(hbs`<UserForm @onSave={{action saveAction}} />`);

    assert.ok(this.element.querySelector('form'));
  });
});
