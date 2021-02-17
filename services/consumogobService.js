const fetch = require('node-fetch');
const delay = ms => new Promise(res => setTimeout(res, ms))

async function ConsumirRequisitosByIdGOB(id) 
{
    let url = `https://www.gob.ec/api/v1/tramites/` +id+ `/?institution=332`;
    let respuesta;

    let promesa = fetch(url)
    promesa.then(res => res.json())
    .then(json => {
        respuesta = json
    })
    await delay(5000)
    console.log(respuesta)
    return respuesta
}

module.exports = {
    ConsumirRequisitosByIdGOB
}