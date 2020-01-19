function mail(to,subject,text,html,response) {
    const mailer = require("nodemailer");
    var transporter = mailer.createTransport({
        host: "smtp.gmail.com", // hostname
        secureConnection: true, // TLS requires secureConnection to be false
        port: 465, // port for secure SMTP
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: 'testconfidence112@gmail.com',
            pass: 'Mon*av2U'
        }
    });
    var from = '"confidence " <confidence@gmail.fr>'
    var mailOptions = {
        from: from,
        to: to, // list of receivers (who receives)
        subject:subject,
        text: text,
        html: html
        // html body
    } 
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
    });  
}

exports.mail = mail
