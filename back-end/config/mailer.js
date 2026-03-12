const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      },
});

const sendMail = async (to, subject, html) => {

  // convert array to comma-separated string if needed
  const recipients = Array.isArray(to) ? to.join(",") : to;

  await transporter.sendMail({
    from: `"Network request" <${process.env.EMAIL}>`,
    to: recipients,
    subject,
    html
  });

};

module.exports = sendMail;