const express = require("express");
const router = express.Router();

// redirect to original URL
router.get("/:code", async (req, res) => {
  const { code } = req.params;

  // find url in database
  const url = await Url.findOne({ shortCode: code });

  if (!url) {
    return res.status(404).json({ message: "URL not found" });
  }

  // redirect user
  res.redirect(url.originalUrl);
});

module.exports = router;