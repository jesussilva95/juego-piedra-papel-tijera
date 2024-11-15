


// Clase para manejar el usuario
class Usuario {
    constructor(nombre, contraseña) {
        this.nombre = nombre;           
        this.contraseña = contraseña;  
    }
}

// Clase para manejar la lista de usuarios (Almacenamiento)
class Cliente {
    constructor() { 
        // Lista de usuarios
        this.usuarios = []; 
    }

    registrarUsuario(nombre, contraseña) {
        const nuevoUsuario = new Usuario(nombre, contraseña); //Crea una nueva instancia de usuario
        this.usuarios.push(nuevoUsuario); //referencia a la lista de usuarios de la instancia actual de la clase cliente, 
        //Método de arrays para agregar un nuevo elemento al final de un array
    }

    buscarUsuario(nombre, contraseña) {  //Método para buscar un usario recibe nombre y contraseña
        return this.usuarios.find(usuario => usuario.nombre === nombre && usuario.contraseña === contraseña); 
        //Busca de lista de usuarios que coincida con nombre y contraseña
    } 
}

// Clase para manejar el juego
class Juego {
    constructor(cliente) { //Recibe objeto cliente, que gestiona los usuarios y lo asigna a this.cliente
        this.cliente = cliente; // Se utilizará el Cliente para gestionar usuarios
        this.usuarioActual = null; //inicializa usuarioActual en null para guardar el usuario que inicia sesión 
    }

    iniciarSesion(nombre, contraseña) { //Metodo para iniciar sesión
        const usuarioEncontrado = this.cliente.buscarUsuario(nombre, contraseña); //Si el usuario existe
        if (usuarioEncontrado) {
            this.usuarioActual = usuarioEncontrado; //Si encuentra lo asigna en usuarioActual y retorna true
            return true;
        }
        return false;
    }

    obtenerEleccionComputadora() { //Método que genera una elección aleatoria para la maquina
        const opciones = ['piedra', 'papel', 'tijeras']; //Define opciones posibles
        const indiceAleatorio = Math.floor(Math.random() * 3); //Genera un número aleatoria entre 0 y 2, para seleccionar una de las 3 opciones  //opciones.length
        return opciones[indiceAleatorio];
    }

    //Método que compara las elecciones del jugador y la maquina
    determinarGanador(eleccionUsuario, eleccionComputadora) { 
        if (eleccionUsuario === eleccionComputadora) {
            return '¡Es un empate!';
        } else if (
            (eleccionUsuario === 'piedra' && eleccionComputadora === 'tijeras') ||
            (eleccionUsuario === 'papel' && eleccionComputadora === 'piedra') ||
            (eleccionUsuario === 'tijeras' && eleccionComputadora === 'papel')
        ) {
            return '¡Ganaste!';
        } else {
            return 'La computadora ganó.';
        }
    }
}

// Instancia del cliente y del juego
const cliente = new Cliente();
const juego = new Juego(cliente); 

// Elementos del DOM, definimos constantes que seleccionamos elementos del DOM
const formularioInicioSesion = document.getElementById('formulario-inicio-sesion');
const formularioRegistro = document.getElementById('formulario-registro');
const contenedorFormularios = document.getElementById('contenedor-formularios');
const interfazJuego = document.getElementById('interfaz-juego');
const mostrarUsuario = document.getElementById('mostrar-usuario');
const botonesJuego = document.querySelectorAll('.game-choice');
const resultadoJuego = document.getElementById('resultado-juego');
const eleccionJugador = document.getElementById('eleccion-jugador');
const eleccionJugadorImg = document.getElementById('eleccion-jugador-img');
const eleccionMaquina = document.getElementById('eleccion-maquina');
const eleccionMaquinaImg = document.getElementById('eleccion-maquina-img');
const cerrarSesionBoton = document.getElementById('cerrar-sesion-boton');

// Cambiar entre formularios
document.getElementById('cambiar-a-registro').addEventListener('click', function(event) {
    event.preventDefault(); 
    formularioInicioSesion.style.display = 'none';
    formularioRegistro.style.display = 'block';
});

document.getElementById('cambiar-a-inicio-sesion').addEventListener('click', function(event) {
    event.preventDefault();
    formularioRegistro.style.display = 'none';
    formularioInicioSesion.style.display = 'block';
});

// Iniciar Sesión
formularioInicioSesion.addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('usuario-inicio-sesion').value;
    const contraseña = document.getElementById('contraseña-inicio-sesion').value;

    if (juego.iniciarSesion(nombre, contraseña)) {  
        mostrarInterfazJuego(nombre); 
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
});

// Registrarse
formularioRegistro.addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('usuario-registro').value;
    const contraseña = document.getElementById('contraseña-registro').value;

    cliente.registrarUsuario(nombre, contraseña); 
    alert('Usuario registrado exitosamente. Puedes iniciar sesión ahora.');
    formularioRegistro.style.display = 'none';
    formularioInicioSesion.style.display = 'block';
});  

// Función para mostrar la interfaz de juego
function mostrarInterfazJuego(nombre) {
    contenedorFormularios.style.display = 'none';
    interfazJuego.style.display = 'block';
    mostrarUsuario.textContent = nombre;
} 

// Función del juego
botonesJuego.forEach(boton => {
    boton.addEventListener('click', function() {
        const eleccionUsuario = this.getAttribute('data-choice');
        const eleccionComputadora = juego.obtenerEleccionComputadora();

        // Actualizar elección del jugador y la máquina
        eleccionJugador.textContent = eleccionUsuario;
        eleccionJugadorImg.src = `imagenes/${eleccionUsuario}.png`;
        eleccionMaquina.textContent = eleccionComputadora;
        eleccionMaquinaImg.src = `imagenes/${eleccionComputadora}.png`;

        // Determinar el ganador y mostrar el resultado
        const resultado = juego.determinarGanador(eleccionUsuario, eleccionComputadora);
        resultadoJuego.textContent = resultado;
    });
}); 
//Se capturan los clics en los botones de elección del jugador.
//Obtiene la elección del jugador y la computadora, actualiza las imágenes y determina el ganador.

// Cerrar sesión
cerrarSesionBoton.addEventListener('click', function() {
    juego.usuarioActual = null;
    interfazJuego.style.display = 'none';
    formularioInicioSesion.style.display = 'block';
});