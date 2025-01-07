var express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
var router = express.Router();

// Create a transporter object
let transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use any email service like Yahoo, Outlook, etc.
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "do4250894@gmail.com",
    pass: "cmjv ydly phtk srve",
  },
});

let emailFrom = 'do4250894@gmail.com'
let emailTo = "luongtuz082111@gmail.com"

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/chartdata", (req, res) => {
  let envirData = fs.readFileSync("envirData.json", "utf-8");
  envirData = JSON.parse(envirData);
  if (envirData.length > 10) {
    return res.json(envirData.slice(envirData.length - 10));
  } else {
    return res.json(envirData);
  }
});

router.get('/send-email', (req, res) => {
  // Set up email data
  let mailOptions = {
    from: emailFrom,
    to: emailTo,
    subject: 'Canh bao nguy hiem',
    text: 'Nguoi gia dang co trieu chung nguy hiem, vui long kiem tra nguoi than tai vi tri https://maps.app.goo.gl/ZZtLyZBui1GZwgHq8!',
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.json({ success: true, message: "Email sent successfully", message_id: info.messageId });
  });
});

module.exports = router;
