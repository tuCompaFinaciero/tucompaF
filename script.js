/* clase gestion*/
class Gestion {
    constructor(af, stock, clientes, cb, patrimonio, dLargoPlaso, dCostopaso) {
        // Convertir entradas a números
        this.af = parseFloat(af) || 0;
        this.stock = parseFloat(stock) || 0;
        this.clientes = parseFloat(clientes) || 0;
        this.cb = parseFloat(cb) || 0;
        this.patrimonio = parseFloat(patrimonio) || 0;
        this.dLargoPlaso = parseFloat(dLargoPlaso) || 0;
        this.dCostopaso = parseFloat(dCostopaso) || 0;

        // Calculamos el total de activos
        this.totalA = this.af + this.stock + this.clientes + this.cb;

        // Calculamos el total del patrimonio
        this.totalP = this.patrimonio + this.dLargoPlaso + this.dCostopaso;

        // Calculamos los porcentajes de cada componente respecto al total de activos
        this.porcentajeAF = (this.af / this.totalA) * 100;
        this.porcentajeStock = (this.stock / this.totalA) * 100;
        this.porcentajerClientes = (this.clientes / this.totalA) * 100;
        this.porcentajeCB = (this.cb / this.totalA) * 100;

        // Calculamos los porcentajes de cada componente respecto al total del patrimonio
        this.porcentajePatrimonio = (this.patrimonio / this.totalP) * 100;
        this.porcentajeCortoP = (this.dCostopaso / this.totalP) * 100;
        this.porcentajeLargoP = (this.dLargoPlaso / this.totalP) * 100;
    }
}



// Declaración de variables globales
var cant = 0; var tipo = 1;
let arreglo = new Array(2);

function mostrarTablas() {
    var tablas = [
        document.getElementById('editableTable'),
        document.getElementById('tablaFuentesUso'),
        document.getElementById('tablaPasivos'),
        document.getElementById('tablaActivos'),
        document.getElementById('tabla-container')
    ];
    
    tablas.forEach(function(tabla) {
        if (tabla) {
            tabla.style.display = 'table'; // Usar 'table' para tablas
        }
    });

    // Si el contenedor 'tabla-container' no debe mostrarse como una tabla
    var tablaContainer = document.getElementById('tabla-container');
    if (tablaContainer) {
        tablaContainer.style.display = 'block'; // Usar 'block' para div
    }
}
function ocultarTablas() {
    var tablas = [
        document.getElementById('editableTable'),
        document.getElementById('tablaFuentesUso'),
        document.getElementById('tablaPasivos'),
        document.getElementById('tablaActivos'),
        document.getElementById('tabla-container')
    ];
    
    tablas.forEach(function(tabla) {
        if (tabla) {
            tabla.style.display = 'none';
        }
    });
}




// Función para mostrar la tabla de registro
function mostrarTablasRegistro() {
    const registroDatos = document.getElementById('registroDatos');
    registroDatos.style.display = 'block';
}

// Función para ocultar la tabla de registro
function OcultarTablaRegistro() {
    const registroDatos = document.getElementById('registroDatos');
    registroDatos.style.display = 'none';
}

// Función para mostrar el botón de resultados
function mostrarBtnResultados() {
    let btnMostrarResultado = document.getElementById('btnMostrarResultado');
    if (cant >= 2) { // Mostrar cuando cant es 2 o más
        btnMostrarResultado.style.display = 'inline-block'; 
        OcultarTablaRegistro(); // Ocultar la tabla de registro al mostrar resultados
    }
}

function OcultarbntResultado(){
    let btnOcultarResultado = document.getElementById('btnMostrarResultado');
    btnOcultarResultado.style.display = 'none'; 
}

// Función para limpiar los inputs del formulario
function limpiarInputs() {
    const inputs = document.querySelectorAll('#formularioGestion input');
    inputs.forEach(input => input.value = '');
}

// Función para actualizar el título de gestión
function ActualizarTitulo() {
    let tituloGestionElemento = document.getElementById('tituloGestion');
    let numeroGestion = cant + 1; 
    tituloGestionElemento.textContent = `Gestión ${numeroGestion}`;
}

// Función para reiniciar los valores del formulario y la gestión
function reinicarValores() {
    limpiarInputs();
    cant = 0;
    ActualizarTitulo();
    ocultarTablas();
    OcultarbntResultado();

}

// Event Listener cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Configuración inicial del formulario
    var formulario = document.getElementById('formularioGestion');
    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar envío normal del formulario

        // Obtener los valores de los inputs del formulario
        var inputs = this.querySelectorAll('input[required]');
        var formData = {};

        // Iterar sobre los inputs y guardar sus valores en formData
        inputs.forEach(function(input) {
            formData[input.name] = input.value;
        });
        const ge = new Gestion(formData.af, formData.stock, formData.clientes, formData.cb, formData.patrimonio, formData.largo, formData.corto);
        // Guardar formData en el arreglo según el índice 'cant'
        arreglo[cant] = ge;

        // Mostrar los datos del formulario en la consola
        console.log('Datos del formulario:',  arreglo[cant]);

        // Incrementar 'cant' y actualizar el título
        cant++;
        ActualizarTitulo();

        // Limpiar inputs y actualizar visualización
        limpiarInputs();
        mostrarBtnResultados();
    });

    // Configuración inicial al cargar el DOM
    limpiarInputs();
    mostrarBtnResultados();

    // Event listeners para opciones de empresa
    var empresaServicios = document.getElementById('empresaServicios');
    var empresaIndustrial = document.getElementById('empresaIndustrial');
    var empresaComercio = document.getElementById('empresaComercio');

    empresaServicios.addEventListener('click', function(event) {
        event.preventDefault(); // Prevenir comportamiento por defecto del enlace
        console.log('Seleccionaste Empresa de Servicios');
        mostrarTablasRegistro(); // Mostrar tabla de registro al seleccionar empresa
        reinicarValores(); // Reiniciar valores para una nueva gestión
        tipo = 1;
    });

    empresaIndustrial.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Seleccionaste Empresa Industrial');
        mostrarTablasRegistro(); // Mostrar tabla de registro al seleccionar empresa
        reinicarValores(); // Reiniciar valores para una nueva gestión
        tipo = 2;
    });

    empresaComercio.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Seleccionaste Empresa de Comercio');
        mostrarTablasRegistro(); // Mostrar tabla de registro al seleccionar empresa
        reinicarValores(); // Reiniciar valores para una nueva gestión
        tipo = 3;
    });

    // Event listener para el botón de mostrar resultados
    var btnMostrarResultado = document.getElementById('btnMostrarResultado');
    btnMostrarResultado.addEventListener('click', mostrarMatrizResultadoGeneral);
});

// Event Listener para configurar tabla de registro al cargar el DOM
document.addEventListener('DOMContentLoaded', function() {
    const registroDatos = document.getElementById('registroDatos');
    OcultarTablaRegistro(); // Ocultar tabla de registro inicialmente
});

function mostrarMatrizResultadoGeneral() {
    mostrarTablas();
    var gestion1 = arreglo[0];
    var gestion2 = arreglo[1];
  var sumUso = 0;
  var  sumFunte = 0; 
    /* af */
    document.getElementById('montoActualActivos').textContent = gestion1.af;
    document.getElementById('montoProxAnioActivos').textContent = gestion2.af;
    if (gestion1.af < gestion2.af) {
        document.getElementById('aumentosActivos').textContent = gestion2.af - gestion1.af;
        document.getElementById('usosActivos').textContent = gestion2.af - gestion1.af;  
        sumUso+=gestion2.af - gestion1.af;
    } else {
        document.getElementById('disminucionActivos').textContent = gestion1.af - gestion2.af;
        document.getElementById('fuentesActivos').textContent = gestion1.af - gestion2.af;
        sumFunte+=gestion1.af - gestion2.af;
    }
    document.getElementById('porcentajeActivos').textContent = gestion1.porcentajeAF.toFixed(2) + '%';
    document.getElementById('porcentajeProxAnioActivos').textContent = gestion2.porcentajeAF.toFixed(2) + '%';
    
    /* stock */
    document.getElementById('montoActualStock').textContent = gestion1.stock;
    document.getElementById('montoProxAnioStock').textContent = gestion2.stock;
    if (gestion1.stock < gestion2.stock) {
        document.getElementById('aumentosStock').textContent = gestion2.stock - gestion1.stock;
        document.getElementById('usosStock').textContent = gestion2.stock - gestion1.stock;
        sumUso+=gestion2.stock - gestion1.stock;
    } else {
        document.getElementById('disminucionStock').textContent = gestion1.stock - gestion2.stock;
        document.getElementById('fuentesStock').textContent = gestion1.stock - gestion2.stock;
        sumFunte+=gestion1.stock - gestion2.stock;
    }
    document.getElementById('porcentajeStock').textContent = gestion1.porcentajeStock.toFixed(2) + '%';
    document.getElementById('porcentajeProxAnioStock').textContent = gestion2.porcentajeStock.toFixed(2) + '%';
    
    /* clientes */
    document.getElementById('montoActualClientes').textContent = gestion1.clientes;
    document.getElementById('montoProxAnioClientes').textContent = gestion2.clientes;
    if (gestion1.clientes < gestion2.clientes) {
        document.getElementById('aumentosClientes').textContent = gestion2.clientes - gestion1.clientes;
        document.getElementById('usosClientes').textContent = gestion2.clientes - gestion1.clientes;
        sumUso+=gestion2.clientes - gestion1.clientes;
    } else {
        document.getElementById('disminucionClientes').textContent = gestion1.clientes - gestion2.clientes;
        document.getElementById('fuentesClientes').textContent = gestion1.clientes - gestion2.clientes;
        sumFunte+=gestion1.clientes - gestion2.clientes;
    }
    document.getElementById('porcentajeClientes').textContent = gestion1.porcentajerClientes.toFixed(2) + '%';
    document.getElementById('porcentajeProxAnioClientes').textContent = gestion2.porcentajerClientes.toFixed(2) + '%';
    
    /* C-B */
    document.getElementById('montoActualCB').textContent = gestion1.cb;
    document.getElementById('montoProxAnioCB').textContent = gestion2.cb;
    if (gestion1.cb < gestion2.cb) {
        document.getElementById('aumentosClientesCB').textContent = gestion2.cb - gestion1.cb;
        document.getElementById('usosClientesCB').textContent = gestion2.cb - gestion1.cb;
        sumUso+=gestion2.cb - gestion1.cb;
    } else {
        document.getElementById('disminucionClientesCB').textContent = gestion1.cb - gestion2.cb;
        document.getElementById('fuentesClientesCB').textContent = gestion1.cb - gestion2.cb;
        sumFunte+=gestion1.cb - gestion2.cb;
    }
    document.getElementById('porcentajeCB').textContent = gestion1.porcentajeCB.toFixed(2) + '%';
    document.getElementById('porcentajeProxAnioCB').textContent = gestion2.porcentajeCB.toFixed(2) + '%';
    
    /* total Activos */
    document.getElementById('montoActualActivo').textContent = gestion1.totalA;
    document.getElementById('montoProxAnioActivo').textContent = gestion2.totalA;
    
    /* pasivos */
    document.getElementById('montoActualPatrimonio').textContent = gestion1.patrimonio;
    document.getElementById('montoProxAnioPatrimonio').textContent = gestion2.patrimonio;
    if (gestion1.patrimonio < gestion2.patrimonio) {
        document.getElementById('aumentosClientesPatrimonio').textContent = gestion2.patrimonio - gestion1.patrimonio;
        document.getElementById('fuentesClientesPatrimonio').textContent = gestion2.patrimonio - gestion1.patrimonio;
        sumFunte+=gestion2.patrimonio - gestion1.patrimonio;
    } else {
        document.getElementById('disminucionClientesPatrimonio').textContent = gestion1.patrimonio - gestion2.patrimonio;
        document.getElementById('usosClientesPatrimonio').textContent = gestion1.patrimonio - gestion2.patrimonio;
        sumUso+=gestion1.patrimonio - gestion2.patrimonio;
    }
    
    /* largo plazo */
    document.getElementById('montoActualLargoPlazo').textContent = gestion1.dLargoPlaso;
    document.getElementById('montoProxAnioLargoPlazo').textContent = gestion2.dLargoPlaso;
    if (gestion1.dLargoPlaso < gestion2.dLargoPlaso) {
        document.getElementById('aumentosClientesLargoPlazo').textContent = gestion2.dLargoPlaso - gestion1.dLargoPlaso;
        document.getElementById('fuentesClientesLargoPlazo').textContent = gestion2.dLargoPlaso - gestion1.dLargoPlaso;
        sumFunte+=gestion2.dLargoPlaso - gestion1.dLargoPlaso;
    } else {
        document.getElementById('disminucionClientesLargoPlazo').textContent = gestion1.dLargoPlaso - gestion2.dLargoPlaso;
        document.getElementById('usosClientesLargoPlazo').textContent = gestion1.dLargoPlaso - gestion2.dLargoPlaso;
        sumUso+=gestion1.dLargoPlaso - gestion2.dLargoPlaso;
    }
    
    /* corto plazo */
    document.getElementById('montoActualCortoPlazo').textContent = gestion1.dCostopaso;
    document.getElementById('montoProxAnioCortoPlazo').textContent = gestion2.dCostopaso;
    if (gestion1.dCostopaso < gestion2.dCostopaso) {
        document.getElementById('aumentosClientesCortoPlazo').textContent = gestion2.dCostopaso - gestion1.dCostopaso;
        document.getElementById('fuentesClientesCortoPlazo').textContent = gestion2.dCostopaso - gestion1.dCostopaso;
        sumFunte+=gestion2.dCostopaso - gestion1.dCostopaso;
    } else {
        document.getElementById('disminucionClientesCortoPlazo').textContent = gestion1.dCostopaso - gestion2.dCostopaso;
        document.getElementById('usosClientesCortoPlazo').textContent = gestion1.dCostopaso - gestion2.dCostopaso;
        sumUso+=gestion1.dCostopaso - gestion2.dCostopaso;
    }
    
    /* total Pasivos */
    document.getElementById('montoActualPasivos').textContent = gestion1.totalP.toFixed(2) + '%';
    document.getElementById('montoProxAnioPasivos').textContent = gestion2.totalP.toFixed(2) + '%';
    document.getElementById('totalUsos').textContent = sumUso.toFixed(2) + '%';;
    document.getElementById('totalFuentes').textContent = sumFunte.toFixed(2) + '%';;


    /* tabla de  analisis de evolucion de activos */
    document.getElementById('resultadAF1').textContent = gestion1.porcentajeAF.toFixed(2) + '%';;
    document.getElementById('resultadAF2').textContent = gestion2.porcentajeAF.toFixed(2) + '%';;
    document.getElementById('resultadStock1').textContent = gestion1.porcentajeStock.toFixed(2) + '%';;
    document.getElementById('resultadStock2').textContent = gestion2.porcentajeStock.toFixed(2) + '%';;
    document.getElementById('resultadClientes1').textContent = gestion1.porcentajerClientes.toFixed(2) + '%';;
    document.getElementById('resultadClientes2').textContent = gestion2.porcentajerClientes.toFixed(2) + '%';;
    document.getElementById('resultadC-B1').textContent = gestion1.porcentajeCB.toFixed(2) + '%';;
    document.getElementById('resultadC-B2').textContent = gestion2.porcentajeCB.toFixed(2) + '%';;
    /* tablq de analisis de pasivos */
    document.getElementById('resultadPatrimonio1').textContent = gestion1.porcentajePatrimonio.toFixed(2) + '%';;
    document.getElementById('resultadPatrimonio2').textContent = gestion2.porcentajePatrimonio.toFixed(2) + '%';;
    document.getElementById('resultadDeudasLargoPlazo1').textContent = gestion1.porcentajeLargoP.toFixed(2) + '%';;
    document.getElementById('resultadDeudasLargoPlazo2').textContent = gestion2.porcentajeLargoP.toFixed(2) + '%';;
    document.getElementById('resultadDeudasCortoPlazo1').textContent = gestion1.porcentajeCortoP.toFixed(2) + '%';;
    document.getElementById('resultadDeudasCortoPlazo2').textContent = gestion2.porcentajeCortoP.toFixed(2) + '%';;
    /*tabla de funtes y uso */
    document.getElementById('poraf').textContent = gestion1.porcentajeAF.toFixed(2) + '%';;
    document.getElementById('porclientes').textContent = gestion1.porcentajerClientes.toFixed(2) + '%';;
    document.getElementById('porcb').textContent = gestion1.porcentajeCB.toFixed(2) + '%';;
    document.getElementById('pordeudaLargoPlazo').textContent = gestion1.porcentajeLargoP.toFixed(2) + '%';;
    document.getElementById('pordeudaCortoPlazo').textContent = gestion1.porcentajeCortoP.toFixed(2) + '%';;
    document.getElementById('porpatrimonio').textContent = gestion1.porcentajePatrimonio.toFixed(2) + '%';;
    document.getElementById('porstock').textContent = gestion1.porcentajeStock.toFixed(2) + '%';;
    /* conclusiones*/ 

}

