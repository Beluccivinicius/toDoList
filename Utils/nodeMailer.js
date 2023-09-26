const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURI = 'https://developers.google.com/oauthplayground';
const refreshToken = process.env.REFRESH_TOKEN;
const pass = process.env.EMAIL_PASSWORD;
const user = process.env.MY_EMAIL;

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectURI);

oAuth2Client.setCredentials({ refresh_token: refreshToken });

const sendEmail = async (nome, email, random) => {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: '0Auth2',
            user,
            pass,
            clientId,
            clientSecret,
            refreshToken,
            accessToken
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
