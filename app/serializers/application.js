import DS from 'ember-data';
import { underscore } from '@ember/string';
import { singularize } from 'ember-inflector';
import { assert } from '@ember/debug';

export default DS.RESTSerializer.extend({
  keyForAttribute(attr) {
    return underscore(attr);
  },
  keyForRelationship(attr, relationship) {
    switch (relationship) {
      case 'belongsTo':
        return `${underscore(attr)}_id`;

      case 'hasMany':
        return `${underscore(singularize(attr))}_ids`;
    }
    
    assert(`Serializing relationship type ${relationship} is not supported yet.`);
    return attr;
  }
});
