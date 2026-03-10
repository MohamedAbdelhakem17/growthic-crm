const authRouter = require("./auth.route");
const leadsRouter = require("./leads.route");
const notesRouter = require("./notes.route");
const disqualifiedReasonsRouter = require("./disqualified-reasons.route");
const branchesRouter = require("./branches.route");
const servicesRouter = require("./services.route");
const workTimeRouter = require("./work-time.route");
const businessProfileRouter = require("./business-profile.route");

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
  {
    path: `${API_PREFIX}/branches`,
    router: branchesRouter,
  },
  {
    path: `${API_PREFIX}/services`,
    router: servicesRouter,
  },
  {
    path: `${API_PREFIX}/work-times`,
    router: workTimeRouter,
  },
  {
    path: `${API_PREFIX}/business-profile`,
    router: businessProfileRouter,
  },
];

const AppRouter = (app) => {
  Routes.forEach((route) => {
    app.use(route.path, route.router);
  });
};

module.exports = AppRouter;
