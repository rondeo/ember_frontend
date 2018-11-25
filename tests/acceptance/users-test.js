import { module, test } from 'qunit';
import { visit, click, currentURL, fillIn, find, findAll } from '@ember/test-helpers';
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

  test('create a new user', async function(assert) {
    await visit('/users');
    assert.equal(
      currentURL(), '/users',
      'could open users page'
    );

    await click('[data-test-link="users.add"]');
    assert.equal(
      currentURL(), '/users/add',
      'click on create user button fires a transition to create user page'
    );

    await fillIn('[data-test-form="user"] [data-test-form-element="first-name"] input', 'John');
    await fillIn('[data-test-form="user"] [data-test-form-element="last-name"] input', 'Doe');
    await fillIn('[data-test-form="user"] [data-test-form-element="email"] input', 'john-doe@examples.com');
    await click('[data-test-form="user"] [data-test-button="submit"]');
    assert.equal(
      currentURL(), '/users',
      'transitioned to users list page after create user form has been submitted successfully'
    );

    let persistedRecord = this.server.db.users.findBy({ firstName: 'John', lastName: 'Doe' });
    assert.ok(persistedRecord, 'new user has been persisted (asserted by first and last name)');
    assert.equal(persistedRecord.email, 'john-doe@examples.com', 'email of new user has been persisted');

    let recordRowSelector = `[data-test-table="users"] [data-test-user="${persistedRecord.id}"]`;
    assert.dom(recordRowSelector).exists('newly created user is listed in users table');
    assert.dom(`${recordRowSelector} [data-test-column="first-name"]`)
      .hasText('John', 'newly created user is listed with correct first name');
    assert.dom(`${recordRowSelector} [data-test-column="last-name"]`)
      .hasText('Doe', 'newly created user is listed with correct last name');
    assert.dom(`${recordRowSelector} [data-test-column="email"]`)
      .hasText('john-doe@examples.com', 'newly created user is listed with correct email');
  });

  test('validates input on creating a new user', async function(assert) {
    await visit('/users/add');
    assert.equal(
      currentURL(), '/users/add',
      'could open users creation page'
    );
    assert.dom('[data-test-form="user"] .form-group .is-invalid')
      .doesNotExist('form elements aren\'t invalid before user interaction');
    assert.dom('[data-test-form="user"] .form-group .is-valid')
      .doesNotExist('form elements aren\'t valid before user interaction');

    await click('[data-test-form="user"] [data-test-button="submit"]');
    assert.equal(
      currentURL(), '/users/add',
      'not transitioned to any other page if submit is clicked on invalid form'
    );
    assert.dom('[data-test-form="user"] [data-test-form-element="first-name"] input')
      .hasClass('is-invalid', 'form element first name is shown as invalid after form has been submitted');
    assert.dom('[data-test-form="user"] [data-test-form-element="last-name"] input')
      .hasClass('is-invalid', 'form element last name is shown as invalid after form has been submitted');
    assert.dom('[data-test-form="user"] [data-test-form-element="email"] input')
      .hasClass('is-invalid', 'form element email is shown as invalid after form has been submitted');

    await fillIn('[data-test-form="user"] [data-test-form-element="first-name"] input', 'John');
    assert.dom('[data-test-form="user"] [data-test-form-element="first-name"] input')
      .hasClass('is-valid', 'form element first name is shown as valid after user filled in a name');

    await fillIn('[data-test-form="user"] [data-test-form-element="last-name"] input', 'Doe');
    assert.dom('[data-test-form="user"] [data-test-form-element="last-name"] input')
      .hasClass('is-valid', 'form element last name is shown as valid after user filled in a name');

    await fillIn('[data-test-form="user"] [data-test-form-element="email"] input', 'john-doe@examples.com');
    assert.dom('[data-test-form="user"] [data-test-form-element="email"] input')
      .hasClass('is-valid', 'form element email is shown as valid after user filled in an email');
  });
});
