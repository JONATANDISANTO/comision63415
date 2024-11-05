/* calculadora de sueldo neto a cobrar en periodo 09/2024 dentro del Sindicato de empleados de pirulines de la Republica Argentina,
el mismo pide que se ingrese, categoria, antiguedad, dias trabajados. el mismo calculara segun los dias trabajados si 
cobrará presentismo o no, tomando en cuenta que trabaja 6 dias a la semana y en el periodo 09/2024 hay 21 dias 
de lunes a sabados, tambien se imprime en consola los siguientes valores: 

0"elige la cantidad de empleados a calcular"(ciclo for)
1"sueldo basico" 
2"antiguedad laboral"
3"calculo de cobro por antiguedad" 
4"aclara si perdiste el presentismo o si cobras dicho beneficio" 
5"imprime el sueldo bruto" 
6"imprime descuento de aporte jubilatorio"
7"imprime descuento de aporte de obra social"
8"imprime descuento de aporte sindical"
9"imprime en base a los valores anteriores el importe neto a cobrar"

segun lo corregiodo la entrega anterior modifique el  switch y realice una busqueda utilizando arrays. interactue con el html de manera basica segun las ultimas clases para que luego de la consulta se genere una planilla en formato basico de recibo de sueldo.
*/

/*corregimos lo indicado en la antrega anterior relacionado con intentosCategorias , manipulamos el DOM para generar la tabla del recibo de sueldo desde javascript, 
eliminamos los "promp" por input y label,. guardamos informacion recopilada en el localstorage*/


const ANTIGUEDAD = 0.01;
const PRESENTISMO = 0.0833;
const APORTES = {
    jubilacion: 0.11,
    obraSocial: 0.03,
    sindicato: 0.02
};

let periodo = "Septiembre/2024";
let diasDeTrabajo = 21;

const categoriasSueldos = {
    vendedor: 750000,
    cocinero: 850000,
    administrativo: 780000,
    directivo: 2000000
};

let cantidadEmpleados = 0;
let empleadosContados = 0;

document.getElementById("iniciarCalculo").addEventListener("click", function() {
    cantidadEmpleados = parseInt(document.getElementById("cantidadEmpleados").value, 10);
    if (isNaN(cantidadEmpleados) || cantidadEmpleados < 1) {
        alert("Por favor, ingresa una cantidad válida de empleados.");
        return;
    }
    document.getElementById("cantidadEmpleadosSection").style.display = "none";
    document.getElementById("formEmpleado").style.display = "block";
});

document.getElementById("calcularSueldo").addEventListener("click", function() {
    if (empleadosContados < cantidadEmpleados) {
        const categoria = document.getElementById("categoria").value;
        const añosAntiguedad = parseInt(document.getElementById("antiguedad").value, 10);
        const diasTrabajados = parseInt(document.getElementById("diasTrabajados").value, 10);
        
        let sueldoBasico = categoriasSueldos[categoria];
        let calculoAntiguedad = añosAntiguedad * ANTIGUEDAD * sueldoBasico;

        let sueldoBruto = calcularSueldoBruto(sueldoBasico, calculoAntiguedad, diasTrabajados);
        const sueldoNeto = calcularSueldoNeto(sueldoBruto);

        mostrarTablaRecibo(categoria, añosAntiguedad, diasTrabajados, sueldoBasico, calculoAntiguedad, sueldoBruto, sueldoNeto);
        empleadosContados++;

        document.getElementById("formEmpleado").reset();
    } else {
        alert("Ya has calculado el sueldo para todos los empleados.");
    }
});

function calcularSueldoBruto(sueldoBasico, calculoAntiguedad, diasTrabajados) {
    if (diasTrabajados < diasDeTrabajo) {
        console.log("Este mes perdiste el presentismo.");
        return sueldoBasico + calculoAntiguedad;
    } else {
        console.log("Este mes no perdiste el presentismo. Se te aplicará un beneficio del " + (PRESENTISMO * 100) + "%.");
        return (PRESENTISMO * sueldoBasico) + calculoAntiguedad + sueldoBasico;
    }
}

function calcularSueldoNeto(sueldoBruto) {
    let descuentoJubilacion = sueldoBruto * APORTES.jubilacion;
    let descuentoObraSocial = sueldoBruto * APORTES.obraSocial;
    let descuentoSindicato = sueldoBruto * APORTES.sindicato;

    console.log("Descuento Aporte Jubilatorio: $" + descuentoJubilacion);
    console.log("Descuento Aporte Obra Social: $" + descuentoObraSocial);
    console.log("Descuento Aporte Sindical: $" + descuentoSindicato);

    return sueldoBruto - (descuentoJubilacion + descuentoObraSocial + descuentoSindicato);
}

function mostrarTablaRecibo(categoria, añosAntiguedad, diasTrabajados, sueldoBasico, calculoAntiguedad, sueldoBruto, sueldoNeto) {
    const tablaHTML = `
    <table border="1">
        <thead>
            <tr>
                <th>Concepto</th>
                <th>Detalle</th>
                <th>Importe</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Categoría</td>
                <td>${categoria}</td>
                <td>${sueldoBasico}</td>
            </tr>
            <tr>
                <td>Sueldo Básico</td>
                <td></td>
                <td>${sueldoBasico}</td>
            </tr>
            <tr>
                <td>Antigüedad</td>
                <td>${añosAntiguedad} años</td>
                <td>${calculoAntiguedad.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Presentismo</td>
                <td>${diasTrabajados >= diasDeTrabajo ? "Aplicado" : "No Aplicado"}</td>
                <td>${diasTrabajados >= diasDeTrabajo ? (PRESENTISMO * sueldoBasico).toFixed(2) : '0.00'}</td>
            </tr>
            <tr>
                <td>Sueldo Bruto</td>
                <td></td>
                <td>${sueldoBruto.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Descuento Jubilación</td>
                <td>11%</td>
                <td>${(sueldoBruto * APORTES.jubilacion).toFixed(2)}</td>
            </tr>
            <tr>
                <td>Descuento Obra Social</td>
                <td>3%</td>
                <td>${(sueldoBruto * APORTES.obraSocial).toFixed(2)}</td>
            </tr>
            <tr>
                <td>Descuento Sindicato</td>
                <td>2%</td>
                <td>${(sueldoBruto * APORTES.sindicato).toFixed(2)}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr class="resumen">
                <td colspan="2">Total Neto a Cobrar</td>
                <td>${sueldoNeto.toFixed(2)}</td>
            </tr>
        </tfoot>
    </table>
    <br>`;
    document.getElementById("tablaRecibo").innerHTML += tablaHTML; 
}

