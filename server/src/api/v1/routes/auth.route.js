// analysis-router.js
const express = require("express");

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("FAQ Route");
});

module.exports = router;
