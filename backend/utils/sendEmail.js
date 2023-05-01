const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      service: process.env.SMTP_SERVICE,
      auth: {
        user: "sendmail2159@gmail.com",
        pass: "gwhdkgiivpnsecji",
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    const info = await transporter.sendMail(mailOptions);

  //  console.log(`Message sent: ${info.messageId}`);

    return { success: true ,
    info};
  } catch (error) {
   // console.log(`Error occurred while sending email: ${error}`);
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;






// zxfjamtzdpkhtdnt