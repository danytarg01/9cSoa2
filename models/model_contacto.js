const mysql = require("mysql");
const util = require("util");
const sqlString = require("sqlstring");

/*async function conectar() {
    global.conexion = mysql.createPool({
        host    : 'localhost',
        port    : 3307,
        user    : 'moviles',
        password: 'app_moviles_2',
        database: 'app_moviles_2'
    });
    global.conexion.query = util.promisify(global.conexion.query);
    return global.conexion;
}*/
async function conectar() {
    if (!global.conexion) {
        global.conexion = mysql.createPool({
            connectionLimit: 5,
            port: global.config.db_port,
            host: global.config.db_host,
            user: global.config.db_user,
            password: global.config.db_password,
            database: global.config.db_database
        });
        global.conexion.query = util.promisify(global.conexion.query);
    }
    return global.conexion;
}
async function listar() {
    const conexion = await conectar();
    try {
        var resultados = await conexion.query('select * from user');
        return resultados
    } catch (err) {
        throw err
    }
}

async function obtenerUno(id) {
    const conexion = await conectar();
    try {
        const sql = sqlString.format('select * from user where idUser=?', [id]);
        var resultados = await conexion.query(sql);
        return resultados[0];
    } catch (err) {
        throw err;
    }
}

async function agregar(user) {
    const conexion = await conectar();
    try {
        const sql = sqlString.format('insert into user (name, email, password) values (?,?,?)', [user.name, user.email, user.password]);
        var resultados = await conexion.query(sql);
        return resultados;
    } catch (err) {
        throw err;
    }
}

async function actualizar(user) {
    const conexion = await conectar();
    try {
        const sql = sqlString.format(
            "update user set name=?, email=?, password=? where idUser=?",
            [user.name, user.email, user.password, user.idUser]
        );
        var resultados = await conexion.query(sql);
        return resultados;
    } catch (err) {
        throw err;
    }
}

async function borrar(id) {
    const conexion = await conectar();
    try {
        const sql = sqlString.format(
            "delete from user where idUser=?",
            [id]
        );
        var resultados = await conexion.query(sql);
        return resultados;
    } catch (err) {
        throw err;
    }
}


async function crearEstructuraDatos() {
    const conexion = mysql.createConnection({
        port: global.config.db_port,
        host: global.config.db_host,
        user: global.config.db_user,
        password: global.config.db_password
    });
    await conexion.query('DROP DATABASE IF EXISTS practicasoa ');
    await conexion.query('CREATE DATABASE practicasoa ');
    await conexion.query('use practicasoa');
    await conexion.query('CREATE TABLE user (idUser int(11) NOT NULL AUTO_INCREMENT,name varchar(50) NOT NULL,email varchar(50) NOT NULL,password varchar(250) NOT NULL, PRIMARY KEY(idUser)) ENGINE = InnoDB DEFAULT CHARSET = latin1;');
    await conexion.query('insert into user (name, email, password) values ("nombre 1", "email 1", "password")')
}

module.exports.listar = listar;
module.exports.agregar = agregar;
module.exports.obtenerUno = obtenerUno;
module.exports.actualizar = actualizar;
module.exports.borrar = borrar;


module.exports.crearEstructuraDatos = crearEstructuraDatos;