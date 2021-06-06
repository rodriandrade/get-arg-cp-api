const express = require('express');
const axios = require('axios')
const cheerio = require('cheerio')
const app = express();

const cp_capital = {
    agronomia: [1417, 1419, 1427, 1431],
    almagro: [1172, 1247],
    balvanera: [1020, 1022, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1036, 1039, 1040, 1044, 1045, 1046, 1051, 1052, 1056, 1079,   1080, 1081, 1083, 1089, 1090, 1091, 1094, 1096, 1098, 1170, 1171, 1172, 1173, 1174, 1179, 1180, 1181, 1183, 1186, 1187, 1189, 1190, 1191, 1193, 1194, 1196, 1197, 1198, 1201, 1203, 1204, 1207, 1209, 1210, 1211, 1212, 1213, 1214, 1215, 1219, 1222, 1223, 1225, 1227, 1229],
    barracas: [1066, 1104, 1110, 1138, 1139, 1140, 1141, 1143, 1152, 1153, 1164, 1255, 1260, 1265, 1267, 1268, 1269, 1270, 1271, 1272, 1273, 1274, 1275, 1276, 1277, 1278, 1279, 1280, 1281, 1282, 1283, 1284, 1285, 1286, 1287, 1288, 1289, 1290, 1291, 1292, 1293, 1294, 1295, 1296, 1425, 1437],
    belgrano: [1424, 1425, 1426, 1428, 1429, 1430, 1468],
    boca: [1063, 1065, 1155, 1157, 1158, 1160, 1161, 1162, 1163, 1164, 1165, 1166, 1167, 1169, 1185, 1265, 1266],
    boedo: [1218, 1220, 1221, 1226, 1228, 1230, 1231, 1232, 1233, 1235, 1236, 1237, 1238, 1239, 1240, 1241, 1250],
    chacarita: [1414, 1416, 1418, 1427],
    coghlan: [1428, 1429, 1430, 1431],
    colegiales: [1414, 1426, 1427, 1428],
    constitucion: [1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1080, 1099, 1100, 1101, 1102, 1103, 1107, 1110, 1130, 1133, 1134, 1135, 1136, 1137, 1138, 1139, 1140, 1147, 1148, 1150, 1151, 1152, 1153, 1154, 1159, 1180, 1206, 1245, 1261, 1407, 1426, 1427, 1480],
    floresta: [1406, 1407, 1416, 1419, 1440, 1471],
    monserrat: [1000, 1002, 1010, 1014, 1020, 1033, 1041, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1079, 1080, 1082, 1084, 1085, 1086, 1087, 1088, 1091, 1092, 1093, 1095, 1096, 1097, 1098, 1100, 1101, 1107, 1110, 1134, 1135, 1136, 1158, 1168, 1405, 1406, 1407, 1416, 1424],
    montecastro: [1407, 1408, 1416, 1417, 1419],
    nuevapompeya: [1263, 1429, 1436, 1437],
    nuñez: [1428, 1429],
    palermo: [1004, 1007, 1019, 1055, 1113, 1172, 1175, 1176, 1177, 1179, 1180, 1181, 1182, 1183, 1186, 1188, 1404, 1414, 1416, 1425, 1426, 1428, 1429, 1439],
    parquechas: [1427, 1431],
    parquepatricios: [1234, 1241, 1243, 1244, 1245, 1247, 1249, 1254, 1256, 1258, 1259, 1260, 1261, 1262, 1263, 1264, 1275, 1282, 1283, 1284, 1437],
    paternal: [1416, 1417, 1427],
    puertomadero: [1000, 1001, 1005, 1006, 1007, 1010, 1184, 1425],
    recoleta: [1000, 1001, 1011, 1012, 1013, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1055, 1057, 1059, 1060, 1061, 1062, 1091, 1108, 1111, 1112, 1114, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1122, 1123, 1124, 1125, 1126, 1127, 1128, 1129, 1170, 1171, 1172, 1173, 1174, 1175, 1180, 1186, 1187, 1188, 1215, 1414, 1425],
    retiro: [1001, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1016, 1021, 1025, 1054, 1055, 1057, 1058, 1059, 1061, 1062, 1099, 1104, 1111, 1120, 1125, 1156, 1416],
    saavedra: [1428, 1429, 1430, 1431, 1431],
    sancristobal: [1080, 1099, 1133, 1151, 1219, 1220, 1221, 1222, 1223, 1224, 1225, 1227, 1229, 1230, 1231, 1232, 1233, 1234, 1242, 1243, 1244, 1246, 1247, 1248, 1249, 1251, 1252, 1253, 1254, 1256, 1259],
    sannicolas: [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1022, 1023, 1025, 1026, 1028, 1033, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1044, 1045, 1047, 1048, 1049, 1050, 1053, 1053, 1055, 1056, 1066, 1084, 1105, 1106, 1190, 1416, 1425],
    santelmo: [1063, 1064, 1065, 1066, 1068, 1069, 1091, 1098, 1099, 1100, 1101, 1102, 1103, 1107, 1114, 1140, 1141, 1143, 1147, 1150, 1152, 1153, 1154, 1165, 1217, 1426],
    velezsarsfield: [1407],
    versalles: [1086, 1407, 1408],
    villacrespo: [1069, 1183, 1189, 1405, 1414, 1416, 1425],
    villadelparque: [1084, 1407, 1414, 1416, 1417, 1417, 1419, 1425, 1428],
    villadevoto: [1417, 1419],
    villageneralmitre: [1158, 1406, 1416, 1417, 1425, 1429],
    villaluro: [1407, 1408, 1416, 1440],
    villaortuzar: [1427, 1430, 1431],
    villapueyrredon: [1419, 1425, 1431],
    villareal: [1006, 1408, 1414, 1417, 1419],
    villasantarita: [1223, 1407, 1416, 1417, 1419],
    villaurquiza: [1427, 1428, 1430, 1431],
    caballito: [1184, 1235, 1405, 1406, 1414, 1416, 1424],
    flores: [1406, 1407, 1416, 1417, 1424, 1437],
    liniers: [1407, 1408, 1440],
    mataderos: [1407, 1439, 1440],
    parqueavellaneda: [1406, 1407, 1439, 1440],
    parquechacabuco: [1238, 1250, 1406, 1424, 1437],
    villalugano: [1407, 1439],
    villariachuelo: [1439],
    villasoldati: [1406, 1407, 1437]
}

app.use(express.json());

app.get('/', (req, res) =>{
    res.send("Welcome to the arg-cp API!");
})

app.get('/cp', async (req, res) => {
    const { provincia, localidad } = req.query;
    const provinciaData = provincia.replace(/\s/g, '').toLowerCase();
    const localidadData = localidad.replace(/\s/g, '').toLowerCase();
    if(provinciaData !== "ciudadautónomadebuenosaires"){
        try{
            const html = await axios.get(`https://codigopostal.com.ar/site/manual/${provinciaData}/${localidadData}`);
            const $ = cheerio.load(html.data);
            const heading = $('.jumbotron');
            const cp = heading.find('p.lead').text();
            const data = cp.substr(14);
            res.json(data);
        } catch(error){
            res.status(404).json({
                status: 'fail',
                message: 'No encontramos el código postal de la localidad seleccionada'
            });
        }
    } else if(provinciaData === "ciudadautónomadebuenosaires"){
        let data = cp_capital[localidadData];
        res.json(data);
    }    
})

app.listen(5000,() => {
    console.log('Started on PORT 5000');
})