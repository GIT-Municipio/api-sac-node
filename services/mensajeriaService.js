const nodemailer = require('nodemailer');

let transpotador = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rchistoso@gmail.com',
        pass: 'rikigamer'
    }
});

let Opciones_mailer = {
    from: 'rchistoso@gmail.com',
    to: 'toledoc509@gmail.com',
    subject: 'Pruebas de envio de email',
    text: 'HOLA MUNDOOOOOOOO'
};

transpotador.sendMail(Opciones_mailer, function(err, data)
{
    if(err)
    {
        console.log('Ha ocurrido un error');
    }else
    {
        console.log('!!!!!!Email enviado!!!!!!')
    }
});