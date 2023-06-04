/* eslint-disable no-undef */
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const ENV = process.env;

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: ENV.MAILER_HOST,
      auth: {
        user: ENV.MAILER_SENDER_EMAIL,
        pass: ENV.MAILER_PASSWORD,
      },
    });
  }

  async sendEmail(to, location = "Ali Town, Lahore") {
    try {
      let from = `${ENV.APP_NAME} <no-reply${ENV.MAILER_DOMAIN}>`;
      if (!to) throw new Error("Recipent required!");

      // Email Starts
      const filePath = path.join(
        // eslint-disable-next-line no-undef
        __dirname,
        "../html_templates/location.html"
      );
      const source = fs.readFileSync(filePath, "utf-8").toString();
      const template = handlebars.compile(source);
      const replacements = {
        location,
      };
      const htmlToSend = template(replacements);

      await this.transporter.sendMail({
        from,
        to: to,
        subject: "Geo Location ",
        html: htmlToSend,
      });
    } catch (error) {
      console.log(error, "error");
    }
    return;
  }
}

// eslint-disable-next-line no-undef
module.exports = new MailService();
