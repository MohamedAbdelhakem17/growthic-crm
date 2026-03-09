const authRouter = require("./auth.route");
const leadsRouter = require("./leads.route");
const notesRouter = require("./notes.route");
const disqualifiedReasonsRouter = require("./disqualified-reasons.route");

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
  {
    path: `${API_PREFIX}/notes`,
    router: notesRouter,
  },
  {
    path: `${API_PREFIX}/disqualified-reasons`,
    router: disqualifiedReasonsRouter,
  },
];

const AppRouter = (app) => {
  Routes.forEach((route) => {
    app.use(route.path, route.router);
  });
};

module.exports = AppRouter;
