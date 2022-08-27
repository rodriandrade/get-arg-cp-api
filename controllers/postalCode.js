const { removeSignsFromString } = require("../utils/stringFormat")
const { findCp } = require("../utils/findCp")
const { cp_capital, provincias } = require("../constants/constants")

exports.getPostalCode = async (req, res) =>{

    console.log(req.query)

    let { provincia, localidad } = req.query;

    console.log(provincia, localidad)

    if(provincia === "Tierra del Fuego, Antártida e Islas del Atlántico Sur"){
        provincia = "Tierra del Fuego";
    }

    // Convertir strings para acoplarse al formato aceptado en la URL de la web a la que se hace scrapping
    const provinciaQuery = provincia.replace(/\s+/g, '-').toLowerCase();
    const localidadQuery = localidad.replace(/\s+/g, '-').toLowerCase();

    const provinciaData = removeSignsFromString(provinciaQuery);
    const localidadData = removeSignsFromString(localidadQuery);

    if(provinciaData !== "ciudad-autonoma-de-buenos-aires"){
        try{
            const postal_code = await findCp(provinciaData, localidadData)
            res.status(200).send({ postal_code: postal_code, type: "string", message: `Codigo postal encontrado para la localidad ${localidad} en la provincia ${provincia}.` })
        } catch (error){
            console.log("algo paso loco");
            res.status(404).send({ postal_code: "", type: "", message: `No se encontró código postal para la localidad ${localidad} en la provincia ${provincia}.` })
        }
    } else if(provinciaData === "ciudad-autonoma-de-buenos-aires"){
        const localidad = localidadData.replace(/\-/g, "");
        const postal_codes = cp_capital[localidad];
        if(postal_codes){
            res.status(200).send({ postal_code: postal_codes, type: "array", message: `Codigo postal encontrado para la localidad ${localidadData} en la provincia ${provincia}.` })
        } else {
            res.status(404).send({ postal_code: "", type: "", message: `No se encontró código postal para la localidad ${localidadData} en la provincia ${provincia}.` })
        }
    }
}