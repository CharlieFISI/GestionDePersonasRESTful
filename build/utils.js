"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUsuarioEntry = exports.addEntrenadorEntry = exports.addClienteEntry = void 0;
const parseNombre = (stringFromRequest) => {
    let flag = true;
    let message;
    let i = 0;
    const regex = /^[\\¡!@#$%^&*()+={}[\]|:;"'<>,.¿?/~`_-]+$/g;
    if (!isString(stringFromRequest)) {
        flag = false;
        message = 'Nombre(s) inexistente o incorrecto';
    }
    if (stringFromRequest.length < 3) {
        flag = false;
        message = 'Nombre(s) tiene pocos caracteres';
    }
    while (i < stringFromRequest.length && flag) {
        if (stringFromRequest[i] !== ' ' && isInt(Number(stringFromRequest[i]))) {
            flag = false;
            message = 'Nombre(s) no debe contener numeros';
        }
        if (regex.test(stringFromRequest[i])) {
            flag = false;
            message = 'Nombre(s) no debe contener caracteres especiales';
        }
        i++;
    }
    if (!flag) {
        throw new Error(message);
    }
    return stringFromRequest;
};
const parseApellido = (stringFromRequest) => {
    let flag = true;
    let message;
    let i = 0;
    const regex = /^[\\¡!@#$%^&*()+={}[\]|:;"'<>,.¿?/~`_-]+$/g;
    if (!isString(stringFromRequest)) {
        flag = false;
        message = 'Apellidos inexistente o incorrecto';
    }
    if (stringFromRequest.length < 3) {
        flag = false;
        message = 'Apellidos tiene pocos caracteres';
    }
    while (i < stringFromRequest.length && flag) {
        if (stringFromRequest[i] !== ' ' && isInt(Number(stringFromRequest[i]))) {
            flag = false;
            message = 'Apellidos no debe contener numeros';
        }
        if (regex.test(stringFromRequest[i])) {
            flag = false;
            message = 'Apellidos no debe contener caracteres especiales';
        }
        i++;
    }
    if (!flag) {
        throw new Error(message);
    }
    return stringFromRequest;
};
const parseEmail = (stringFromRequest) => {
    let flag = true;
    let message;
    let i = 0;
    const regex = /^[\\¡!#$%^&*()+={}[\]|:;"'<>,¿?/~`]$/g;
    if (!isString(stringFromRequest)) {
        flag = false;
        message = 'Email inexistente o incorrecto';
    }
    if (stringFromRequest.length < 8) {
        flag = false;
        message = 'Email tiene pocos caracteres';
    }
    while (i < stringFromRequest.length && flag) {
        if (stringFromRequest[i] === ' ') {
            flag = false;
            message = 'Email no debe contener espacios';
        }
        if (regex.test(stringFromRequest[i])) {
            flag = false;
            message = 'Email no debe contener caracteres especiales no permitidos';
        }
        i++;
    }
    if (!flag) {
        throw new Error(message);
    }
    return stringFromRequest;
};
const parseDNI = (stringFromRequest) => {
    let flag = true;
    let i = 0;
    let message;
    while (i < stringFromRequest.length && flag) {
        if (!isInt(Number(stringFromRequest[i]))) {
            flag = false;
            message = 'DNI no debe contener letras';
        }
        if (stringFromRequest[i] === ' ') {
            flag = false;
            message = 'DNI no debe contener espacios';
        }
        i++;
    }
    if (stringFromRequest.length !== 8) {
        message = 'DNI no contiene 8 digitos';
        flag = false;
    }
    if (!flag) {
        throw new Error(message);
    }
    return stringFromRequest;
};
const parseTelefono = (numberFromRequest) => {
    let flag = true;
    let message;
    if (!isInt(numberFromRequest)) {
        message = 'Telefono inexistente';
        flag = false;
    }
    if (numberFromRequest.toString().length !== 9) {
        message = 'Telefono no contiene 9 digitos';
        flag = false;
    }
    if (!flag) {
        throw new Error(message);
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
