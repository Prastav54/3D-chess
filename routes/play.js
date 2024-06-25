var express = require("express");
var util = require("../config/util.js");
const { contract } = require("../config/contract.js");
var router = express.Router();

router.get("/", function (req, res) {
  res.render("partials/play", {
    title: "Chess Hub - Game",
    user: req.user,
    isPlayPage: true,
  });
});

router.post("/", function (req, res) {
  var side = req.body.side;
  //var opponent = req.body.opponent; // playing against the machine in not implemented
  var token = util.randomString(20);
  res.redirect("/game/" + token + "/" + side);
});

router.get("/total-token-hold", async function (_req, res) {
  var totalTokenHold = await contract.totalAmountOfTokensHeld();
  return res.status(200).send(totalTokenHold.toString());
});

router.get("/total-bnb-claimed", async function (_req, res) {
  var totalBNBClaimed = await contract.totalBNBClaimed();
  return res.status(200).send(totalBNBClaimed.toString());
});

router.get("/check-auto-claim-enabled", async function (_req, res) {
  var isAutoCliamEnabled = await contract.isAutoClaimEnabled();
  return res.status(200).send(isAutoCliamEnabled);
});

router.post("/check-claim-approved", async function (req, res) {
  const { ofAddress, byAddress } = req.body;
  var isClaimApproved = await contract.isClaimApproved(ofAddress, byAddress);
  return res.status(200).send(isClaimApproved);
});

router.post("/approve-claim", async function (req, res) {
  const { byAddress, isApproved } = req.body;
  const response = await contract.approveClaim(byAddress, isApproved);
  return res.status(200).send(response);
});

module.exports = router;
