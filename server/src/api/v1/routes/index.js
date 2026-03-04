const API_PREFIX = "/api/v1";

const Routes = [
  {
    path: `${API_PREFIX}/auth`,
    router: require("./auth.route"),
  },
];

const AppRouter = (app) => {
  for (const route of Routes) {
    app.use(route.path, route.router);
  }
};

module.exports = AppRouter;
