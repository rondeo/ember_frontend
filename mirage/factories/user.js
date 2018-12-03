import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  city: faker.address.city, 
  email: faker.internet.email,
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  street: faker.address.streetAddress,
  zipCode: faker.address.zipCode,
  mobil: faker.address.phone,
});
