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

const provincias = [
    {
        'nombre': 'Corrientes',
        'localidades': [
            {
                'old': 'ESTACION TORRENT',
                'new': 'Torrent'
            },
            {
                'old': 'GOBERNADOR IGR.VALENTIN VIRASORO',
                'new': 'Gobernador Virasoro'
            },
            {
                'old': 'JOSE R. GOMEZ',
                'new': 'Jose Rafael Gomez'
            },
            {
                'old': 'MARIANO I. LOZA',
                'new': 'Mariano I Loza Est Solari'
            }
        ]
    },
    {
        'nombre': 'Jujuy',
        'localidades': [
            {
                'old': 'LOS NOGALES',
                'new': 'Nogales'
            },
        ]
    },
    {
        'nombre': 'Santa Fe',
        'localidades': [
            {
                'old': 'SALADERO MARIANO CABAL',
                'new': 'Saladero M Cabal'
            },
            {
                'old': 'RINCON POTRERO',
                'new': 'Rincon Potreros'
            },
            {
                'old': 'PUEBLO MARINI',
                'new': 'Marini'
            },
            {
                'old': 'PLAZA SAGUIER',
                'new': 'Saguier'
            },
            {
                'old': 'PLAZA MATILDE',
                'new': 'Colonia Matilde'
            },
            {
                'old': 'NUEVA LEHMANN',
                'new': 'Lehmann'
            },
            {
                'old': 'MONTEFIORE',
                'new': 'Colonia Montefiore'
            },
            {
                'old': 'MATILDE',
                'new': 'Colonia Matilde'
            },
            {
                'old': 'LOS ZAPALLOS',
                'new': 'Colonia Los Zapallos'
            },
            {
                'old': 'LA ISLETA',
                'new': 'Isleta'
            },
            {
                'old': 'JOSEFINA',
                'new': 'La Josefina'
            },
            {
                'old': 'HUMBERTO PRIMO',
                'new': 'Humberto Primero'
            },
            {
                'old': 'CORONEL RODOLFO S. DOMINGUEZ',
                'new': 'Coronel Dominguez'
            },
            {
                'old': 'CHRISTOPHERSEN',
                'new': 'Estacion Christophersen'
            },
            {
                'old': 'BERAVEBU',
                'new': 'Berabevu'
            },
            {
                'old': 'BARRIOS ACAPULCO Y VERACRUZ',
                'new': 'La Josefina'
            },
            {
                'old': 'BARRIOS ACAPULCO Y VERACRUZ',
                'new': 'La Josefina'
            },
            
        ]
    },
    {
        'nombre': 'Neuquén',
        'localidades': [
            {
                'old': 'VILLA DEL NAHUEVE',
                'new': 'Nahueve'
            },
            {
                'old': 'EL CHOCON',
                'new': 'Villa el Chocon'
            },
            {
                'old': 'BARRIO RUCA LUHE',
                'new': 'Vista Alegre Norte'
            },
        ]
    },
    {
        'nombre': 'Salta',
        'localidades': [
            {
                'old': 'SANTA ROSA DE LOS PASTOS GRANDES',
                'new': 'Sta Rosa de los Pastos Grandes'
            },
            {
                'old': 'PROFESOR SALVADOR MAZZA',
                'new': 'Salvador Mazza'
            },
            {
                'old': 'PADRE LOZANO',
                'new': 'Pedro Lozano'
            },
            {
                'old': 'Pacara',
                'new': 'El Pacara'
            },
            {
                'old': 'OLACAPATO',
                'new': 'Olacapato Grande'
            },
            {
                'old': 'LA CALDERA',
                'new': 'Caldera'
            },
            {
                'old': 'HICKMAN',
                'new': 'Hickmann'
            },
            {
                'old': 'GENERAL MOSCONI',
                'new': 'General Enrique Mosconi'
            },
            {
                'old': 'CAPIAZUTI',
                'new': 'Capiazutti'
            },
            {
                'old': 'BARRIO SAN RAFAEL',
                'new': 'San Rafael'
            },
        ]
    },
    {
        'nombre': 'Formosa',
        'localidades': [
            {
                'old': 'VILLA GENERAL MANUEL BELGRANO',
                'new': 'General Manuel Belgrano'
            },
            {
                'old': 'SAN MARTIN II',
                'new': 'San Martin 2'
            },
            {
                'old': 'SAN MARTIN I',
                'new': 'San Martin 1'
            },
            {
                'old': 'POSTA CAMBIO ZALAZAR',
                'new': 'Posta Cambio a Zalazar'
            },
            {
                'old': 'INGENIERO GUILLERMO N. JUAREZ',
                'new': 'Ing Guillermo N Juarez'
            },
            {
                'old': 'GENERAL MOSCONI',
                'new': 'General Enrique Mosconi'
            },
            {
                'old': 'GENERAL LUCIO V MANSILLA',
                'new': 'Gral Lucio V Mansilla'
            },
            {
                'old': 'FORTIN SARGENTO 1° LEYES',
                'new': 'Fortin Sargento 1Ro Leyes'
            },
            {
                'old': 'FORTIN CABO 1° LUGONES',
                'new': 'Fortin Cabo 1Ro Lugones'
            },
        ]
    },
    {
        'nombre': 'Misiones',
        'localidades': [
            {
                'old': 'PUERTO DESEADO',
                'new': 'Deseado'
            },
            {
                'old': 'OLEGARIO V. ANDRADE',
                'new': 'Olegario Victor Andrade'
            },
            {
                'old': 'KILOMETRO 17 (RUTA 8)',
                'new': 'Kilometro 17 Ruta 8'
            },
            {
                'old': 'CAPIOVICIÑO',
                'new': 'Capiovisiño'
            },
            {
                'old': 'CABUREI',
                'new': 'Cabure'
            },
            {
                'old': 'CAA - YARI',
                'new': 'Caa Yari'
            },
            {
                'old': 'BARRIO NUEVO GARUPA',
                'new': 'Garupa'
            },
        ]
    },
    {
        'nombre': 'San Luis',
        'localidades': [
            {
                'old': 'ZANJITAS',
                'new': 'Estación Zanjitas'
            },
            {
                'old': 'SANTA ROSA DEL CONLARA',
                'new': 'Santa Rosa de Conlara'
            },
            {
                'old': 'CAZADOR',
                'new': 'El Cazador'
            },
            {
                'old': 'CAPIOVICIÑO',
                'new': 'Capiovisiño'
            },
            {
                'old': 'CABUREI',
                'new': 'Cabure'
            },
            {
                'old': 'CAA - YARI',
                'new': 'Caa Yari'
            },
            {
                'old': 'BARRIO NUEVO GARUPA',
                'new': 'Garupa'
            },
        ]
    },
    {
        'nombre': 'Entre Ríos',
        'localidades': [
            {
                'old': 'VILLA GOBERNADOR LUIS F. ETCHEVEHERE',
                'new': 'Villa Gob Luis Etchevehere'
            },
            {
                'old': 'MACIA',
                'new': 'Gobernador Macia'
            },
            {
                'old': 'ALTAMIRANO SUR',
                'new': 'Altamirano Sud'
            }
        ]
    },
    {
        'nombre': 'Santa Cruz',
        'localidades': [
            {
                'old': 'YACIMIENTOS RIO TURBIO',
                'new': 'Rio Turbio'
            }
        ]
    },
    {
        'nombre': 'Río Negro',
        'localidades': [
            {
                'old': 'LAS GRUTAS',
                'new': 'Balneario las Grutas'
            },
            {
                'old': 'INGENIERO LUIS A. HUERGO',
                'new': 'Ingeniero Huergo'
            },
            {
                'old': 'EL CONDOR',
                'new': 'Balneario El Condor'
            },
            {
                'old': 'CORONEL BELISLE',
                'new': 'Belisle Coronel'
            }
        ]
    },
    {
        'nombre': 'Chubut',
        'localidades': [
            {
                'old': 'QUINTA EL MIRADOR',
                'new': 'El Mirador'
            },
            {
                'old': 'ASTRA',
                'new': 'Barrio Astra'
            },
        ]
    },
    {
        'nombre': 'Córdoba',
        'localidades': [
            {
                'old': 'VILLA PASTORA',
                'new': 'Est Juarez Celman'
            },
            {
                'old': 'VILLA OESTE',
                'new': 'Villa Nueva'
            },
            {
                'old': 'VILLA LOS LLANOS',
                'new': 'Est Juarez Celman'
            },
            {
                'old': 'VILLA LA RIVERA',
                'new': 'Villa Quillinzo'
            },
            {
                'old': 'VILLA DEL TRANSITO',
                'new': 'Transito'
            },
            {
                'old': 'VILLA CIUDAD PARQUE LOS REARTES',
                'new': 'Villa Ciudad Pque los Reartes'
            },
            {
                'old': 'VILLA CIUDAD DE AMERICA (LOTEO DIEGO DE',
                'new': 'Villa Ciudad de America'
            },
            {
                'old': 'SOLAR DE LOS MOLINOS',
                'new': 'SOLAR LOS MOLINOS'
            },
            {
                'old': 'SILVIO PELLICO',
                'new': 'Colonia Silvio Pellico'
            },
            {
                'old': 'SATURNINO MARIA LASPIUR',
                'new': 'Saturnino M Laspiur'
            },
            {
                'old': 'SAN IGNACIO (LOTEO VELEZ CRESPO)',
                'new': 'San Ignacio'
            },
            {
                'old': 'SAN IGNACIO (LOTEO SAN JAVIER)',
                'new': 'San Ignacio'
            },
            {
                'old': 'SAN FRANCISCO DEL CHAÑAR',
                'new': 'San Francisco del Chaaar'
            },
            {
                'old': 'SAN FRANCISCO DEL CHAÑAR',
                'new': 'San Francisco del Chaaar'
            },
            {
                'old': 'SAN CARLOS MINAS',
                'new': 'San Carlos'
            },
            {
                'old': 'PORTEÑA',
                'new': 'Porteaa'
            },
            {
                'old': 'PLAZA LUXARDO',
                'new': 'Luxardo'
            },
            {
                'old': 'PARQUE NORTE',
                'new': 'Est Juarez Celman'
            },
            {
                'old': 'ORDOÑEZ',
                'new': 'Ordoaez'
            },
            {
                'old': 'MONTE LEÑA',
                'new': 'Monte Leaa'
            },
            {
                'old': 'LAS CAÑADAS',
                'new': 'Las Caaadas'
            },
            {
                'old': 'LA TORDILLA',
                'new': 'Colonia La Tordilla'
            },
            {
                'old': 'GUIÑAZU NORTE',
                'new': 'El Carmen Guiaazu'
            },
            {
                'old': 'ESTACION LUXARDO',
                'new': 'Luxardo'
            },
            {
                'old': 'EL ARAÑADO',
                'new': 'El Araaado'
            },
            {
                'old': 'DALMACIO VELEZ',
                'new': 'Dalmacio Velez Sarsfield'
            },
            {
                'old': 'CIUDAD DE LOS NIÑOS',
                'new': 'Est Juarez Celman'
            },
            {
                'old': 'CHUÑA HUASI',
                'new': 'Chuaa Huasi'
            },
            {
                'old': 'CHUÑA',
                'new': 'Chuaa'
            },
            {
                'old': 'CHAÑAR VIEJO',
                'new': 'Chaaar Viejo'
            },
            {
                'old': 'CAPITAN GENERAL BERNARDO O`HIGGINS',
                'new': 'Cap Gral Bernardo o Higgins'
            },
            {
                'old': 'CAÑADA DEL SAUCE',
                'new': 'Caaada del Sauce'
            },
            {
                'old': 'CAÑADA DE RIO PINTO',
                'new': 'Caaada de Rio Pinto'
            },
            {
                'old': 'CAÑADA DE MACHADO',
                'new': 'Caaada de Machado'
            },
            {
                'old': 'CAÑADA DE LUQUE',
                'new': 'Caaada de Luque'
            },
            {
                'old': 'BARRIO GILBERT (1° DE MAYO)',
                'new': 'Santa Maria Centro'
            },
            {
                'old': 'BAÑADO DE SOTO',
                'new': 'Baaado de Soto'
            },
            {
                'old': 'ALMIRANTE BROWN',
                'new': 'Est Juarez Celman'
            },
            {
                'old': '1 DE AGOSTO',
                'new': 'Est Juarez Celman'
            },
        ]
    },
    {
        'nombre': 'Mendoza',
        'localidades': [
            {
                'old': 'PRESIDENTE SARMIENTO',
                'new': 'Sarmiento'
            },
            {
                'old': 'EL PARAMILLO',
                'new': 'Paramillo'
            },
            {
                'old': 'BARRIO PRIMAVERA',
                'new': 'La Primavera'
            },
            {
                'old': '1A. SECCION',
                'new': 'Mendoza'
            },
            {
                'old': '2A. SECCION',
                'new': 'Mendoza'
            },
            {
                'old': '3A. SECCION',
                'new': 'Mendoza'
            },
            {
                'old': '4A. SECCION',
                'new': 'Mendoza'
            },
            {
                'old': '5A. SECCION',
                'new': 'Mendoza'
            },
            {
                'old': '6A. SECCION',
                'new': 'Mendoza'
            },
            {
                'old': '7A. SECCION',
                'new': 'Mendoza'
            },
            {
                'old': '8A. SECCION',
                'new': 'Mendoza'
            },
            {
                'old': '9A. SECCION',
                'new': 'Mendoza'
            },
            {
                'old': '10A. SECCION',
                'new': 'Mendoza'
            },
            {
                'old': '11A. SECCION',
                'new': 'Mendoza'
            },
        ]
    },
    {
        'nombre': 'Buenos Aires',
        'localidades': [
            {
                'old': 'WILLIAM C. MORRIS',
                'new': 'William Morris'
            },
            {
                'old': 'VI¥A',
                'new': 'Viña'
            },
            {
                'old': 'VILLA JOSE LEON SUAREZ',
                'new': 'Jose Leon Suarez'
            },
            {
                'old': 'VILLA FLANDRIA SUR (EST. JAUREGUI)',
                'new': 'Est Jauregui Va Flandria'
            },
            {
                'old': 'VILLA FLANDRIA NORTE (PUEBLO NUEVO)',
                'new': 'Pueblo Nuevo'
            },
            {
                'old': 'VILLA BOSCH (EST. JUAN MARIA BOSCH)',
                'new': 'Villa Bosch'
            },
            {
                'old': 'SAENZ PEÑA',
                'new': 'Villa Saenz Peña'
            },
            {
                'old': 'ROBERTO J. PAYRO',
                'new': 'Roberto Payro'
            },
            {
                'old': 'MAQUINISTA F. SAVIO (OESTE)',
                'new': 'Maquinista F Savio'
            },
            {
                'old': 'MAQUINISTA F. SAVIO ESTE',
                'new': 'Maquinista F Savio'
            },
            {
                'old': 'LUCILA DEL MAR',
                'new': 'La Lucila del Mar'
            },
            {
                'old': 'JUAN A. PRADERA',
                'new': 'Pradere Juan a'
            },
            {
                'old': 'JUAN A. DE LA PE¥A',
                'new': 'Juana a de la Peña'
            },
            {
                'old': 'JOSE MARIA EZEIZA',
                'new': 'Jose Maria Ezeiza'
            },
            {
                'old': 'JOSE C. PAZ',
                'new': 'Jose Clemente Paz'
            },
            {
                'old': 'ISLA SANTIAGO (OESTE)',
                'new': 'Isla Santiago'
            },
            {
                'old': 'GOBERNADOR JULIO A. COSTA',
                'new': 'Gobernador Costa'
            },
            {
                'old': 'GENERAL LA MADRID',
                'new': 'General Lamadrid'
            },
            {
                'old': 'GENERAL JUAN MADARIAGA',
                'new': 'General Madariaga'
            },
            {
                'old': 'ESTACION CHAPADMALAL',
                'new': 'Barrio Chapadmalal'
            },
            {
                'old': 'ESPARTILLAR (E)',
                'new': 'Espartillar'
            },
            {
                'old': 'EMILIO V. BUNGE',
                'new': 'Emilio Bunge'
            },
            {
                'old': 'EL CAZADOR',
                'new': 'Barrio el Cazador'
            },
            {
                'old': 'DON ORIONE',
                'new': 'Claypole'
            },
            {
                'old': "D'ORBIGNY",
                'new': 'D Orbigny'
            },
            {
                'old': 'COUNTRY LOS MEDANOS',
                'new': 'Medanos'
            },
            {
                'old': 'CONESA',
                'new': 'General Conesa'
            },
            {
                'old': 'COLONIA SAN ADOLFO',
                'new': 'San Adolfo'
            },
            {
                'old': 'CIUDAD JARDIN LOMAS DEL PALOMAR',
                'new': 'Ciudad Jardín del Palomar'
            },
            {
                'old': 'CHAPADMALAL',
                'new': 'Barrio Chapadmalal'
            },
            {
                'old': 'CERRO DE LA GLORIA (CANAL 15)',
                'new': 'Canal 15 Cerro de la Gloria'
            },
            {
                'old': "CA¥UELAS",
                'new': 'Cañuelas'
            },
            {
                'old': 'CA¥ADA SECA',
                'new': 'Cañada Seca'
            },
            {
                'old': 'CAPILLA DEL SE¥OR',
                'new': 'Capilla del Señor'
            },
            {
                'old': 'BATAN',
                'new': 'Barrio Batan'
            },
            {
                'old': 'BARRIO LA GLORIA',
                'new': 'La Gloria'
            },
            {
                'old': 'BARRIO EL CARMEN (ESTE)',
                'new': 'El Carmen'
            },
            {
                'old': 'BARRIO EL CARMEN (OESTE)',
                'new': 'El Carmen'
            },
            {
                'old': 'BARRIO EL BOQUERON',
                'new': 'El Boqueron'
            },
            {
                'old': 'BARRIO AMERICA UNIDA',
                'new': 'America Unida'
            },
            {
                'old': 'BALNEARIO PEHUEN CO',
                'new': 'Pehuen Co'
            },
            {
                'old': 'ARRIBE¥OS',
                'new': 'Arribeños'
            },
            {
                'old': 'ALBERI VIEJO',
                'new': 'Leandro N Alem'
            },
            {
                'old': 'AEROPUERTO INTERNACIONAL EZEIZA',
                'new': 'Aeropuerto Ezeiza'
            },
        ]
    },
    {
        'nombre': 'Santiago del Estero',
        'localidades': [
            {
                'old': 'VILLA TURISTICA DEL EMBALSE',
                'new': 'Villa Rio Hondo'
            },
            {
                'old': 'VILLA MAILIN',
                'new': 'Mailin'
            },
            {
                'old': 'VILLA GIMENEZ',
                'new': 'Villa Jimenez'
            },
            {
                'old': 'VILLA GENERAL MITRE',
                'new': 'Pinto Villa General Mitre'
            },
            {
                'old': 'LOS SORIA',
                'new': 'Rodeo de Soria'
            },
            {
                'old': 'LOS MIRANDA',
                'new': 'Villa Rio Hondo'
            },
            {
                'old': 'LOS CARDOZOS',
                'new': 'Cardozos'
            },
            {
                'old': 'LA NUEVA DONOSA',
                'new': 'La Donosa'
            },
            {
                'old': 'ESTACION TACAÑITAS',
                'new': 'TACAÑITAS'
            },
            {
                'old': 'EL ZANJON',
                'new': 'VILLA ZANJON'
            },
            {
                'old': 'CORONEL MANUEL L. RICO',
                'new': 'Coronel Manuel Leoncio Rico'
            },
        ]
    },
    {
        'nombre': 'La Pampa',
        'localidades': [
            {
                'old': 'TOMAS M. ANCHORENA',
                'new': 'Tomas M de Anchorena'
            },
            {
                'old': 'LOVENTUE',
                'new': 'Loventuel'
            },
            {
                'old': 'GENERAL MANUEL J. CAMPOS',
                'new': 'Gral Manuel Campos'
            }
        ]
    },
    {
        'nombre': 'Catamarca',
        'localidades': [
            {
                'old': 'ADOLFO E. CARRANZA',
                'new': 'Adolfo E Carranza'
            },
            {
                'old': 'VILLA DE BALCOZNA',
                'new': 'San Antonio de Paclin'
            },
            {
                'old': 'SAN FERNANDO DEL VALLE DE CATAMARCA',
                'new': 'San Fdo Del Valle de Catamarca'
            },
            {
                'old': 'POMANCILLO ESTE',
                'new': 'Pomancillo'
            },
            {
                'old': 'POMANCILLO OESTE',
                'new': 'Pomancillo'
            },
            {
                'old': 'EL PANTANILLO',
                'new': 'San Fdo Del Valle de Catamarca'
            },
            {
                'old': 'EL DIVISADERO',
                'new': 'Divisadero'
            }
        ]
    },
    {
        'nombre': 'La Rioja',
        'localidades': [
            {
                'old': 'SHAQUI',
                'new': 'Schaqui'
            },
            {
                'old': 'SAN BLAS',
                'new': 'Salicas'
            },
            {
                'old': 'PORTEZUELO',
                'new': 'El Portezuelo'
            }
        ]
    },
    {
        'nombre': 'San Juan',
        'localidades': [
            {
                'old': 'VILLA EL SALVADOR',
                'new': 'Angaco Norte'
            },
            {
                'old': 'VILLA SEFAIR (TALACASTO)',
                'new': 'Talacasto'
            },
            {
                'old': 'VILLA AMPACAMA',
                'new': 'Ampacama'
            },
            {
                'old': 'EL ENCON',
                'new': 'Encon'
            }
        ]
    }
];

app.use(express.json());

app.get('/', (req, res) =>{
    res.send("Welcome to the arg-cp API!");
})

// Función para buscar CP 
const findCp = async (provincia, localidad) =>{
    try{
        console.log(localidad);
        const html = await axios.get(`https://codigo-postal.co/argentina/${provincia}/${localidad}/`);
        const $ = cheerio.load(html.data);
        const heading = $('p');
        const cp = heading.find('strong').text();
        const data = cp.slice(17, 21);
        //console.log(data);
        const checkCp = isNaN(data); // Si devuelve "TRUE" significa que el string no contiene un número. Si devuelve "FALSE", es posible que el string contenga un número valido.
        //console.log(checkCp);

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

// Endpoint para validar CP
app.get('/validate', async (req, res) => {
    let { provincia, localidad, departamento, localidad_censal, municipio, codigo_postal } = req.query;

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
            res.json('El CP ingresado es válido :)')
        } else {
            res.json('El CP no es válido :(')
        }
    } else if(cp2 === codigo_postal){
        res.json('El CP ingresado es válido :)')
    } else{
        res.json('El CP no es válido :(')
    }
})

const removeSignsFromString = (str) => {
    let a = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let b = a.replace(/\./g, "");
    let c = b.replace(/\'/g, "");
    return c
} 

app.listen(5000,() => {
    console.log('Started on PORT 5000');
})

