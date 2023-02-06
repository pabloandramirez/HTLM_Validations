export function valida(input){
    //dataset obtiene la coleccion de todas las datas, acompañado del nombre de la data
    const tipoInput = input.dataset.tipo;
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }

    //se apunta al padre del elemento input, donde esta contenido, que es el div
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoInput, input);
    }

}

const tipoErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio",
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "De 6 a 12 caracteres, al menos una letra minúscula, al menos una letra mayúscula, al menos un número y no debe contener caracteres especiales",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "El campo número no puede estar vacio",
        patternMismatch: "El formato requerido son 10 números",
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La dirección debe contener entre 4 a 30 caracteres",
    },
    provincia: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La dirección debe contener entre 4 a 30 caracteres",
    }
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function mostrarMensajeError(tipoInput, input){
    let mensaje = "";
    tipoErrores.forEach (error => {
        if(input.validity[error]){
            mensaje = mensajesError[tipoInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    //metodo especial para que por diferencia horaria no tenga un dia menos en el navegador, se actualice a mi zona horaria
    fechaCliente.setMinutes(fechaCliente.getMinutes() + fechaCliente.getTimezoneOffset());
    let mensaje = "";
    if (!mayorEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad"
    }

    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate());
    return (fechaActual >= diferenciaFechas);
}