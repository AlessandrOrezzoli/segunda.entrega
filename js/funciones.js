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

let listaUsuarios = [];
let listaUsuariosJson = [];

function obtenerUsuarios(){
    const URLJSON = "../js/usuarios.json"
    fetch(URLJSON)
    .then(res => res.json())
    .then(data => {
        listaUsuariosJson = data;
    })
}

obtenerUsuarios()

if(localStorage.getItem("usuarios")) {
    listaUsuarios = JSON.parse(localStorage.getItem("usuarios"))
}
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
        Swal.fire({
            title: 'Error!',
            text: 'Ingrese todos los datos solicitados',
            icon: 'error',
            confirmButtonText: 'Intentar nuevamente'
        })    
        return;
    }
    const usuario = new Usuario(nombre.value, email.value, password.value);
    const validar = validarUsuario(usuario);
    console.log(usuario);

    if (usuario.password !== passwordConfirmado.value) {
        Swal.fire({
            title: 'Error!',
            text: 'Los passwords deben coincidir',
            icon: 'error',
            confirmButtonText: 'Intentar nuevamente'
        }) 
        return;
        
    }

    if (validar) {
        Swal.fire({
            title: 'Error!',
            text: `El usuario ${usuario.email} ya existe`,
            icon: 'error',
            confirmButtonText: 'Intentar nuevamente'
        }) 
        return;
    }
    listaUsuarios.push({ nombre: usuario.nombre, email: usuario.email, password: usuario.password });
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios))
    Swal.fire({
        text: "Usuario registrado con exito",
        icon: 'success',
        confirmButtonText: 'Continuar'
    }) 
    console.log(listaUsuarios);
    formularioRegistro.reset();
}

function validarUsuario(usuario) {
    let usuarioTemporal = null;

    let usuariosLocal = listaUsuarios.find((item) => item.email === usuario.email);
    let usuariosJson = listaUsuariosJson.find((item) => item.email === usuario.email);

    if (usuariosLocal){
        usuarioTemporal = usuariosLocal;
    }

    if (usuariosJson){
        usuarioTemporal = usuariosJson;
    }
    return usuarioTemporal;
}


let botonLogin = document.getElementById("btnLogin")
botonLogin.onclick = () => {

    const usuario = {
        email: emailLogin.value,
        password: passwordLogin.value
    }

    const usuarioLocal = validarUsuario(usuario);
    console.log(usuarioLocal);

    if (listaUsuarios.length === 0) {
        Swal.fire({
            title: 'Error!',
            text: "No hay usuario registrado",
            icon: 'error',
            confirmButtonText: 'Intentar nuevamente'
        })
        return;
    }

    if (!usuarioLocal) {
        Swal.fire({
            title: 'Error!',
            text: `El usuario ${usuario.email} no existe`,
            icon: 'error',
            confirmButtonText: 'Intentar nuevamente'
        })
        return;
    }

    if (usuarioLocal.password !== usuario.password) {
        Swal.fire({
            title: 'Error!',
            text: `El password es incorrecto`,
            icon: 'error',
            confirmButtonText: 'Intentar nuevamente'
        })
        return;
    }

    Swal.fire({
        text: `Hola ${usuarioLocal.nombre}`,
        icon: 'success',
        confirmButtonText: 'Continuar'
    })
    .then(()=> {
        delete usuarioLocal.password
        localStorage.setItem("usuarioActual", JSON.stringify(usuarioLocal))
        window.location.href = "../index.html";
    })
}



