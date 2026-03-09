const authRouter = require("./auth.route");
const leadsRouter = require("./leads.route");

const API_PREFIX = "/api/v1";

const Routes = [
  {
    path: `${API_PREFIX}/auth`,
    router: authRouter,
  },
  {
    path: `${API_PREFIX}/leads`,
    router: leadsRouter,
  },
];

const AppRouter = (app) => {
  Routes.forEach((route) => {
    app.use(route.path, route.router);
  });
};

module.exports = AppRouter;
