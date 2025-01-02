var express = require('express');
const nodemailer = require('nodemailer');
var router = express.Router();

// Create a transporter object
let transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service like Yahoo, Outlook, etc.
  auth: {
    user: 'your-email@gmail.com', // Your email id
    pass: 'your-email-password'   // Your email password
  }
});

let emailFrom = "abc@gmail.com"
let emailTo = "abcd@gmail.com"

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/chartdata", (req, res) => {
  let envirData = fs.readFileSync("envirData.json", "utf-8");
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
    text: 'Nguoi gia dang co trieu chung nguy hiem, vui long kiem tra lai!',
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
