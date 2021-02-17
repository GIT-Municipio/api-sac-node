const nodemailer = require('nodemailer');
require('dotenv').config()

function Enviar_Emial(emitente, remitente, asunto, cuerpo)
{
    let transpotador = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let Opciones_mailer = {
        from: emitente,
        to: remitente,
        subject: asunto,
        html: cuerpo
    };

    transpotador.sendMail(Opciones_mailer, function(err, data)
    {
        if(err)
        {
            console.log('NO SE PUDO ENVIAR EL EMAIL', err);
        }else
        {
            console.log('!!!!!!EMAIL ENVIADO!!!!!!')
        }
    });
}

module.exports={
    Enviar_Emial
}