export default function(server) {
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
    
    ok. here were created 11 dummy users.
  */

  server.createList('user', 11);
}
