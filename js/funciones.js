const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmado = document.getElementById("passwordConfirmado");
const mensajeRegistro = document.getElementById("mensajeRegistro");
const formularioRegistro = document.getElementById("formularioRegistro");
const mensajeLogin = document.getElementById("mensajeLogin");
const passwordLogin = document.getElementById("passwordLogin");
const emailLogin = document.getElementById("emailLogin");
const formularioLogin = document.getElementById("formularioLogin");


let listaUsuarios = []

class Usuario {
    constructor(nombre, email, password) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }
}

let botonRegistroUsuario = document.getElementById("btnRegistroUsuario")
botonRegistroUsuario.onclick = () => {

    mensajeRegistro.innerHTML = "";
    if (!nombre.value || !email.value || !password.value) {
        mensajeRegistro.innerHTML = "Formulario Vacio";
        return;
    }
    const usuario = new Usuario(nombre.value, email.value, password.value);
    const validar = validarUsuario(usuario);
    console.log(usuario);

    if (usuario.password !== passwordConfirmado.value) {
        mensajeRegistro.innerHTML = "Los passwords deben coincidir";
        return;
    }

    if (validar) {
        mensajeRegistro.innerHTML = `El usuario ${usuario.email} ya existe`;
        return;
    }
    listaUsuarios.push({ nombre: usuario.nombre, email: usuario.email, password: usuario.password });
    localStorage.setItem("usuarios", JSON.stringify())
    mensajeRegistro.innerHTML = "Usuario registrado con exito";
    console.log(listaUsuarios);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    formularioRegistro.reset();

}

function validarUsuario(usuario) {
    return listaUsuarios.find((item) => item.email === usuario.email);
}


let botonLogin = document.getElementById("btnLogin")
botonLogin.onclick = () => {

    const usuario = {
        email: emailLogin.value,
        password: passwordLogin.value
    }

    const validar = validarUsuario(usuario);
    console.log(validar);

    if (listaUsuarios.length === 0) {
        mensajeLogin.innerHTML = "No hay usuario registrado";
        return;
    }

    if (!validar) {
        mensajeLogin.innerHTML = `El usuario ${usuario.email} no existe`;
        return;
    }

    if (validar.password !== usuario.password) {
        mensajeLogin.innerHTML = `El password es incorrecto`;
        return;
    }

    window.location.href = "../index.html";
}



