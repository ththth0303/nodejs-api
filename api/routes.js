
var cors = require('cors')
let User =  require('./controllers/UserController');
module.exports = function(app) {
  app.use(cors())
  // UserList Routes
  app.route('/user')
    .get(User.get)
    .post(User.store);


  app.route('/user/:userId')
    .get(User.detail)
    .put(User.update)
    .delete(User.delete);
};
