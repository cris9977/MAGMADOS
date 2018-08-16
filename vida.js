var numeroRecuadros;
var cuadroInactivo;
var cuadroActivo;
var tamanoCuadro;
var tamanoTablero;
var matriz;
var contadorPosicion;
var iniciar;


$(document).ready(function() {
    cargarValoresInicio();
    crearTablero();
    cargarColores();

    $('.recuadro').on('click', function() {
        $(this).addClass('vivo');
    });

    $('.iniciar p#iniciar').on('click', function() {
        if ($(this).text() == 'Iniciar') {
            iniciar = true;
            $(this).text("Pausar");
        } else {
            iniciar = false;
            $(this).text("Iniciar");
        }
    });
    $('.iniciar p#limpiarTablero').on('click', function() {
        $('.recuadro').removeClass('vivo');
    });
});

function cargarColores() {
    $('.contenedor').css({ 'background': cuadroInactivo });
    $('.titulo').css({
        'color': cuadroActivo,
        'background': '#959595'
    });
    $('.contenedorTablero').css({
        'width': tamanoTablero + 'px',
        'height': tamanoTablero + 'px'
    })
    $('.recuadro').css({
        'width': tamanoCuadro + 'px',
        'height': tamanoCuadro + 'px',
        'background': cuadroInactivo,
        'border': 'solid 1px rgba(255,255,255,0.2)',
        'float': 'left',

    })

}

function cargarValoresInicio() {
    numeroRecuadros = 50;
    cuadroInactivo = "red";
    cuadroActivo = "#ffffff";
    tamanoCuadro = 20;
    tamanoTablero = numeroRecuadros * tamanoCuadro;
    matriz = [];
    contadorPosicion = 0;
    iniciar = false;

}

function crearTablero() {
    $('.contenedorTablero').empty();
    for (var x = 0; x < numeroRecuadros; x++) {
        for (var j = 0; j < numeroRecuadros - 1; j++) {
            $('.contenedorTablero').append('<div id="' + x + '-' + j + '"class="recuadro"></div>');
        }
        $('.contenedorTablero').append('<div id="' + x + '-' + j + '"class="' + x + '-' + j + ' recuadro"></div>');

    }
}

var simulacion = setInterval('comenzar()', 500);

function comenzar() {
    empezarSimulacion();
    cargarColores();
    $('.recuadro').css({
        'background': cuadroInactivo,
        'border': 'solid 1px rgba(0,0,0,0.2)'
    });
    $('.vivo').css({
        'background': cuadroActivo,
        'border': 'solid 1px rgba(0,0,0,0.2)'
    });
}

function empezarSimulacion() {
    if (iniciar == true) {
        for (var x = 0; x < numeroRecuadros; x++) {
            for (var j = 0; j < numeroRecuadros - 1; j++) {
                evaluarEstado(x, j);
            }
        }
        $('div').removeClass('vivo');
        cargaValoresNuevo();
    };
}

function evaluarEstado(x, j) {
    var contadorVivos = 0;
    if ($('#' + (x + 1) + '-' + j).hasClass('vivo')) { contadorVivos++; }
    if ($('#' + (x + 1) + '-' + (j - 1)).hasClass('vivo')) { contadorVivos++; }
    if ($('#' + x + '-' + (j - 1)).hasClass('vivo')) { contadorVivos++; }
    if ($('#' + (x - 1) + '-' + (j - 1)).hasClass('vivo')) { contadorVivos++; }
    if ($('#' + (x - 1) + '-' + j).hasClass('vivo')) { contadorVivos++; }
    if ($('#' + (x - 1) + '-' + (j + 1)).hasClass('vivo')) { contadorVivos++; }
    if ($('#' + x + '-' + (j + 1)).hasClass('vivo')) { contadorVivos++; }
    if ($('#' + (x + 1) + '-' + (j + 1)).hasClass('vivo')) { contadorVivos++; }

    if (contadorVivos == 3) {
        matriz[contadorPosicion] = '#' + x + '-' + j;
        contadorPosicion++;
    };

    if (contadorVivos == 2 && $('#' + x + '-' + j).hasClass('vivo')) {
        matriz[contadorPosicion] = '#' + x + '-' + j;
        contadorPosicion++;
    }
}

function cargaValoresNuevo() {
    for (var x = 0; x < contadorPosicion; x++) {
        $(matriz[x]).addClass('vivo');
    }
    contadorPosicion = 0;
}