const express = require("express");
const router = express.Router();

// shorten URL
router.post("/shorten", async (req, res) => {
  const { url } = req.body;

  // generate short code
  const shortCode = generateShortCode();

  // save to database
  await Url.create({
    originalUrl: url,
    shortCode: shortCode
  });

  // return shortened link
  res.json({
    shortUrl: `${process.env.BASE_URL}/${shortCode}`
  });
});

module.exports = router;

function generateShortCode(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
}