
var cors = require('cors')
let User =  require('./controllers/UserController');
let FCM =  require('./controllers/FirebaseController');


module.exports = function(app) {
  app.use(cors())
  // UserList Routes
  app.route('/user')
    .get(User.get)
    .post(User.store);

  app.route('/user/search/:name?')
    .get(User.search)
    .put(User.update)
    .delete(User.delete);

  app.route('/user/:userId')
    .get(User.search)
    .put(User.update)
    .delete(User.delete);

  };

  


