'use strict';
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var xml = require('xml');

function cint(num, opt_infinityBiased) {
    var m = Math, c = m.ceil, f = m.floor, r = m.round;
    num = +num;
    if (opt_infinityBiased) {
        return num < 0 ? r(num) : f(num);
    }
    if (opt_infinityBiased == null) {
        return num < 0 ? -r(-num) : r(num);
    }
    return num < 0 ? c(num) : f(num);
}

function decrypt(text,secret){
    const crypto = require('crypto')
    var decipher = crypto.createDecipher('aes-256-ctr',secret)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

const mysql = {
    engine: require('mysql'),
    credentials: {
        multipleStatements: true,
        host: 'acems.miraflores.com.es',
        user: 'root',
        password: decrypt('49c8e1015a1a40','acems.miraflores.com.es'),
        database: decrypt('49c8e1015a','acems.miraflores.com.es')
    }
}

mysql.connection = mysql.engine.createConnection(mysql.credentials);
mysql.connection.connect();
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Asociación de Comerciantes De Miraflores de la Sierra' });
});
router.get('/api/asociados', function (req, res) {
    mysql.connection.query('SELECT DISTINCT id_area,sector, area FROM view_asociados_light order by id_area;SELECT * FROM view_asociados_light order by idasociado;',function(err,records){
        res.json({MYSQLPSS:process.env.MYSQLPSS,err:err,records:records});
    })
});




module.exports = router;



