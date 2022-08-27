const axios = require('axios')
const cheerio = require('cheerio')

// Función para buscar CP 
const findCp = async (provincia, localidad) =>{
    try{
        const html = await axios.get(`https://codigo-postal.co/argentina/${provincia}/${localidad}/`);
        const $ = cheerio.load(html.data);
        const heading = $('p');
        const cp = heading.find('strong').text();
        const data = cp.slice(17, 21);
        const checkCp = isNaN(data); // Si devuelve "TRUE" significa que el string no contiene un número. Si devuelve "FALSE", es posible que el string contenga un número valido.

        if(checkCp){ // Si es true, entonces busca en la tabla la lista de CPS. Si es false, retorna el cp.
            let cps = [];
            $("td:nth-child(3)").each((index, element) => {
                cps.push($(element).text())
            });
            return cps
        } else {
            return data
        }
        
    } catch(error){
        return 
    }
}

module.exports = { findCp }