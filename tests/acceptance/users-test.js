import { module, test } from 'qunit';
import { visit, currentURL, find, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | users', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('shows existing users', async function(assert) {
    let users = this.server.createList('user', 10);

    await visit('/users');

    assert.equal(
      currentURL(), '/users',
      'could visit users page'
    );
    assert.equal(
      findAll('[data-test-table="users"] tbody tr').length, users.length,
      'table contains as much rows as users exist'
    );
    users.forEach(({ id, firstName, lastName, email }) => {
      let userRow = find(`[data-test-table="users"] [data-test-user="${id}"]`);
      assert.ok(userRow, `user ${id} exists in table`);
      assert.equal(
        userRow.querySelector('[data-test-column="first-name"]').textContent.trim(), firstName,
        `shows first name of user ${id}`
      );
      assert.equal(
        userRow.querySelector('[data-test-column="last-name"]').textContent.trim(), lastName,
        `shows last name of user ${id}`
      );
      assert.equal(
        userRow.querySelector('[data-test-column="email"]').textContent.trim(), email,
        `shows email of user ${id}`
      );
    });
  });
});
