const express = require("express");

const {addMatch, getAllMatches, modifyMatch, getMatchById} = require("../Controller/adminController");

const router = express.Router();

router.get("/getAllMatches", getAllMatches);
router.post("/addMatch", addMatch);
router.put("/modifyMatch/:matchId", modifyMatch);
router.get("getMatch/:matchId", getMatchById); 

module.exports = router;
