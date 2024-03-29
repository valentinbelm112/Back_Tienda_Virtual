const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");

const UsersService = require("../../../services/user");
// para implementar la estrategia hacemos uso de Passport.use
passport.use(
  new BasicStrategy(async (email, password, cb) => {
    const userService = new UsersService();
    console.log(password, "FFFSD");
    // vamos a verificar si el usurio existe o no
    try {
      const user = await userService.getUser({ email });
      console.log(user, "FFFFFFgrtgr");
      if (!user) {
        return cb(boom.unauthorized(), false);
      }

      console.log(user.password + "fffffffffffffffff")
      console.log(password + "444444444444444444444444444444444")
      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }

      // antes de la validación, eliminamos el password del objeto user
      // así nos aseguramos que ahí en adelante en el uso de la aplicación no sea visible
      // el password del usuario
      delete user.password;

      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  })
);
