const removeSignsFromString = (str) => {
    let a = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let b = a.replace(/\./g, "");
    let c = b.replace(/\'/g, "");
    return c
} 

module.exports = { removeSignsFromString }