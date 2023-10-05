const nodemailer = require('nodemailer');
// oAuth2Client.setCredentials({ refresh_token: refreshToken });

const sendEmail = async (nome, email, random) => {
    // const accessToken = await oAuth2Client.getAccessToken();
    console.log(random);
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: true
        }
    });
    transport
        .sendMail({
            from: 'progressob3@gmail.com',
            to: `${email}`,
            subject: 'confirmar autenticidade do email',
            text: `olá ${nome}! o codigo de verificação é ${random}`
        })
        .then(() => console.log('email enviado com sucesso'))
        .catch((err) => console.log(err));
};
module.exports = sendEmail;
