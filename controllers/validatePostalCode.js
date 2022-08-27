const { removeSignsFromString } = require("../utils/stringFormat")
const { findCp } = require("../utils/findCp")
const { cp_capital, provincias } = require("../constants/constants")

exports.validate = async (req, res) =>{
    let { provincia, localidad, departamento, localidad_censal, municipio, codigo_postal } = req.query;

    if(provincia === "Tierra del Fuego, Antártida e Islas del Atlántico Sur"){
        provincia = "Tierra del Fuego";
    }

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

    let cp2 = [];
    let validateCP;

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
                            cp2 = f;
                        }
                    } else {
                        cp2 = f;
                    }
                } else {
                    cp2 = f;
                }
            } else {
                cp2 = f;
            }
        } catch (error){
            console.log("algo paso loco");
            res.json(error);
        }
    } else if(provinciaData === "ciudad-autonoma-de-buenos-aires"){
        let localidad = localidadData.replace(/\-/g, "");
        let data = cp_capital[localidad];
        cp2 = data;
    }
   
    if(Array.isArray(cp2)){
        validateCP = cp2.some(cp =>{
            return cp == codigo_postal
        })
        if(validateCP){
            res.json({ message: 'El CP ingresado es válido :)', isValid: true})
        } else {
            res.json({ message: 'El CP ingresado no es válido :(', isValid: false})
        }
    } else if(cp2 === codigo_postal){
        res.json({ message: 'El CP ingresado es válido :)', isValid: true})
    } else{
        res.json({ message: 'El CP ingresado no es válido :(', isValid: false})
    }
}