const express = require('express');
const app = express();
const validatePostalCodeRouter = require("./routes/validatePostalCode")
const getPostalCodeRouter = require("./routes/getPostalCode")

app.use(express.json());

app.get('/', (req, res) =>{
    res.send("Welcome to the arg-cp API!");
})

app.use('/validate', validatePostalCodeRouter)
app.use('/postal_code', getPostalCodeRouter)

/*
// Endpoint para averiguar el CP de una localidad
app.get('/cpv2', async (req, res) => {

    console.log(req.query);
    let { provincia, localidad, departamento, localidad_censal, municipio } = req.query;
    
    // EXCEPCIONES ///////

    let findLocalidad;

    if(provincia === "Tierra del Fuego, Antártida e Islas del Atlántico Sur"){
        provincia = "Tierra del Fuego";
    }

    console.log(provincia);

    // Chequear excepciones para las localidades
    const provinciaToLoop = provincias.find(prov =>{
        return prov.nombre === provincia
    })

    if(provinciaToLoop != null){
        findLocalidad = provinciaToLoop.localidades.find(loc =>{
            return loc.old === localidad
        })
    }

    if(findLocalidad != null){
        const newLocalidad = findLocalidad.new;
        localidad = newLocalidad;
    }

    ///////////

    // Convertir strings para acoplarse al formato aceptado en la URL de la web a la que se hace scrapping
    const provinciaQuery = provincia.replace(/\s+/g, '-').toLowerCase();
    const localidadQuery = localidad.replace(/\s+/g, '-').toLowerCase();

    let departamentoQuery;
    let localidadCensalQuery;
    let municipioQuery;

    if(departamento){
        departamentoQuery = departamento.replace(/\s+/g, '-').toLowerCase();
    }
    if(localidad_censal){
        localidadCensalQuery = localidad_censal.replace(/\s+/g, '-').toLowerCase();
    }
    if(municipio){
        municipioQuery = municipio.replace(/\s+/g, '-').toLowerCase();
    }

    const provinciaData = removeSignsFromString(provinciaQuery);
    const localidadData = removeSignsFromString(localidadQuery);

    let departamentoData;
    let localidadCensalData;
    let municipioData;

    if(departamentoQuery){
        departamentoData = removeSignsFromString(departamentoQuery);
    }
    if(localidadCensalQuery){
        localidadCensalData = removeSignsFromString(localidadCensalQuery);
    }
    if(municipioQuery){
        municipioData = removeSignsFromString(municipioQuery);
    }
    
    if(provinciaData !== "ciudad-autonoma-de-buenos-aires"){
        try{
            let f = await findCp(provinciaData, localidadData);
            if(f === ""){
                //console.log("Vengo a buscar por departamento");
                f = await findCp(provinciaData, departamentoData);
                if(f === ""){
                    //console.log("Vengo a buscar por localidad_censal");
                    f = await findCp(provinciaData, localidadCensalData);
                    if(f === ""){
                        //console.log("Vengo a buscar por municipio");
                        f = await findCp(provinciaData, municipioData);
                        if(f === ""){
                            res.json("Mudate ami, imposible encontrar esto");
                        } else {
                            res.json(f);
                        }
                    } else {
                        res.json(f);
                    }
                } else {
                    res.json(f);   
                }
            } else {
                res.json(f); 
            }
        } catch (error){
            console.log("algo paso loco");
            res.json(error);
        }
    } else if(provinciaData === "ciudad-autonoma-de-buenos-aires"){
        let localidad = localidadData.replace(/\-/g, "");
        let data = cp_capital[localidad];
        res.json(data);
    }  

})
*/

app.listen(5000,() => {
    console.log('Started on PORT 5000');
})

