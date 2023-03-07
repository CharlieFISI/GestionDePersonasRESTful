"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUsuarioEntry = exports.addEntrenadorEntry = exports.addClienteEntry = void 0;
const parseNombre = (stringFromRequest) => {
    if (!isString(stringFromRequest)) {
        throw new Error('Nombre inexistente o incorrecto');
    }
    return stringFromRequest;
};
const parseApellido = (stringFromRequest) => {
    if (!isString(stringFromRequest)) {
        throw new Error('Apellido inexistente o incorrecto');
    }
    return stringFromRequest;
};
const parseEmail = (stringFromRequest) => {
    if (!isString(stringFromRequest)) {
        throw new Error('Email inexistente o incorrecto');
    }
    return stringFromRequest;
};
const parseDNI = (stringFromRequest) => {
    let flag = true;
    for (let i = 0; i < stringFromRequest.length; i++) {
        if (!isInt(Number(stringFromRequest[i])))
            flag = false;
    }
    if (!flag) {
        throw new Error('DNI inexistente o incorrecto');
    }
    return stringFromRequest;
};
const parseTelefono = (numberFromRequest) => {
    if (!isInt(numberFromRequest)) {
        throw new Error('Telefono inexistente o incorrecta');
    }
    return numberFromRequest;
};
const isString = (string) => {
    return typeof string === 'string';
};
const isInt = (int) => {
    return ((typeof int === 'number' && !isNaN(int)) && Number.isInteger(int));
};
const addClienteEntry = (object) => {
    const newEntry = {
        Nombre: parseNombre(object.Nombre),
        Apellido: parseApellido(object.Apellido),
        Email: parseEmail(object.Email),
        DNI: parseDNI(object.DNI),
        Telefono: parseTelefono(object.Telefono)
    };
    return newEntry;
};
exports.addClienteEntry = addClienteEntry;
const addEntrenadorEntry = (object) => {
    const newEntry = {
        Nombre: parseNombre(object.Nombre),
        Apellido: parseApellido(object.Apellido),
        Email: parseEmail(object.Email),
        DNI: parseDNI(object.DNI),
        Telefono: parseTelefono(object.Telefono)
    };
    return newEntry;
};
exports.addEntrenadorEntry = addEntrenadorEntry;
const addUsuarioEntry = (object) => {
    const newEntry = {
        Nombre: parseNombre(object.Nombre),
        Apellido: parseApellido(object.Apellido),
        Email: parseEmail(object.Email),
        DNI: parseDNI(object.DNI),
        Telefono: parseTelefono(object.Telefono),
        Contrasenia: parseDNI(object.Contrasenia)
    };
    return newEntry;
};
exports.addUsuarioEntry = addUsuarioEntry;
