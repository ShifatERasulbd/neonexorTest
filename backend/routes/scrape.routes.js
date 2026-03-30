const express = require("express");
const {
  scrapeSingleUniversity,
  scrapeSeedUniversities,
} = require("../controllers/scrape.controller");

const router = express.Router();

router.post("/", scrapeSingleUniversity);
router.post("/seed", scrapeSeedUniversities);

module.exports = router; 
