const express = require('express');
const axios = require('axios')
const cheerio = require('cheerio')
const app = express();

app.get('/', async (req, res) => {
    const { provincia, localidad } = req.query;
    const provinciaData = provincia.toLowerCase();
    const localidadData = localidad.replace(/\s/g, '').toLowerCase();
    const html = await axios.get(`https://codigopostal.com.ar/site/manual/${provinciaData}/${localidadData}`);
    const $ = cheerio.load(html.data);
    const heading = $('.jumbotron');
    const cp = heading.find('p.lead').text();
    const data = cp.substr(14);
    res.send(data);
})

app.listen(3000,() => {
    console.log("Started on PORT 3000");
})