const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const corsOptions = {
    origin: 'https://Ramashka-Luba.github.io/portfolio-react/',
    credentials:true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let smtp_login = process.env.SMTP_LOGIN || "---";
let smtp_password = process.env.SMTP_PASSWORD || "---";

let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 25,
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.get('/', function (req, res) {
    res.send('Hello man!');
});

app.post('/sendMessage', async function (req, res) {

    let {name, email, phone, message} = req.body;
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: email, // sender address
        to: "lromashko911@gmail.com", // list of receivers
        subject: "HR wants me)", // Subject line
       // text: "Hello, learning nodejs", // plain text body
        html: `<b>Message from portfolio page</b>
<div>
${name}
</div>
<div>
${email}
</div>
<div>
${phone}
</div>
<div>
${message}
</div>`, // html body
    });
    res.send("ok")
});

let port = process.env.PORT || 3010

app.listen(port, function () {
    console.log('Start')
})