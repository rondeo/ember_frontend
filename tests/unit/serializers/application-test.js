import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import DS from 'ember-data';

module('Unit | Serializer | application', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    let Author = DS.Model.extend({
      firstName: DS.attr(),

      posts: DS.hasMany({ inverse: 'authors' }),
    });

    let Comment = DS.Model.extend({
      post: DS.belongsTo(),
    });
    
    let Post = DS.Model.extend({
      authors: DS.hasMany(),
      comments: DS.hasMany(),
      leadAuthor: DS.belongsTo('author')
    });

    this.owner.register('model:author', Author);
    this.owner.register('model:comment', Comment);
    this.owner.register('model:post', Post);
  });

  test('serialize: attribute name is underscored', function(assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('author', {
      firstName: 'foo',
    });

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord.hasOwnProperty('first_name'));
  });

  test('serialize: belongs-to relationship name is suffixed by _id', function(assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('comment', {
      post: store.createRecord('post', { id: '1' })
    });

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord.hasOwnProperty('post_id'));
  });

  test('serialize: belongs-to relationship name is underscored', function(assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('post', {
      leadAuthor: store.createRecord('author', { id: '1' })
    });

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord.hasOwnProperty('lead_author_id'));
  });

  test('serialize: has-many relationship name is suffixed by _ids', function(assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('author', {
      posts: [
        store.createRecord('post', { id: '1' }),
      ]
    });

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord.hasOwnProperty('post_ids'));
  });
});