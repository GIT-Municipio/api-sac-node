const request = require('request')
const { response } = require('express')

function consumirWSFW(req, res) {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <ObtenerToken xmlns="http://tempuri.org/">
        <token>` + req.body.token + `</token>
      </ObtenerToken>
    </soap:Body>
  </soap:Envelope>`
    const opts = {
        body: xml,
        headers: {
            'Content-Type': 'text/xml; charset=utf-8'
        }
    }
    const url = 'https://www.fielweb.com/servicios/aerip.asmx'
    try {
        let tk = "";
        const body = request.post(url, opts, (err, response) => {
            console.log('response', response.body)
            tk = response.body;
            res.status(200).send({
                mensaje: 'OK',
                token: tk
            })
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message })
    }

}
module.exports = {
    consumirWSFW
}