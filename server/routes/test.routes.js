const { authjwt } = require("../middlewares");
const controller = require("../controllers/test.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/bookstore/test/public", controller.publicContent);

  app.get("/bookstore/test/protected", [authjwt.verifyToken], controller.protectedContent);

};
