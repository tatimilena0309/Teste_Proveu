const moment = require('moment');
const periodos = require('./periodos');
const { LIMITE_INFERIOR } = require('./periodos');

let horaDiurna = 0
let horaNoturna = 0
let acumuladoFull = 0
let horaFormatada = ''
let faltante = 0
let totalTrabalhado = 0
let duration = 0
let parcialNoturno = 0
let parcialDiurno = 0



exports.post = function (values) {

    console.log("Entrei na função post")
    horaDiurna = 0
    horaNoturna = 0
    acumuladoFull = 0
    horaFormatada = ''
    faltante = 0
    totalTrabalhado = 0
    duration = 0
    parcialNoturno = 0
    parcialDiurno = 0

    //console.log(values)
    // let horaInicial = values.horaInicial;
    let momentInicial = setMoment(values.horaInicial)
    let momentFinal = setMoment(values.horaFinal)
    //console.log(momentInicial)
    //console.log(momentFinal)

    /*
        console.log("Duration " + duration)
        console.log("M INICIAL")
        console.log(momentInicial)
        console.log("M fINAL")
        console.log(momentFinal)
    */
    duration = moment.duration(momentInicial.diff(momentFinal))



    if (duration > 0) {
        momentFinal.add(1, 'day')
    }

    var duration = moment.duration(momentFinal.diff(momentInicial));
    //var hours = duration.asHours();
    totalTrabalhado = Math.abs(duration)

    console.log("totalTraba")
    console.log(totalTrabalhado)


    //Comecei na jornada diurna
    if (momentInicial >= periodos.LIMITE_INFERIOR && momentInicial <= periodos.LIMITE_SUPERIOR) {
        console.log("entrei na jornada diurna")
        //calculo de horas até as 22

        console.log("Moment final")
        console.log(momentFinal)
        console.log("limite superior")
        console.log(periodos.LIMITE_SUPERIOR)
        if (momentFinal <= periodos.LIMITE_SUPERIOR) {

            console.log("entrei aqui")
            parcialDiurno = Math.abs(moment.duration(momentInicial.diff(momentFinal)))
            momentInicial.add(parcialDiurno, 'milliseconds')
            console.log("Parcial diurno")
            console.log(parcialDiurno)
            horaDiurna += parcialDiurno

            horaFormatada = formatPeriodo(horaDiurna, horaNoturna)
        }

        else {
            console.log("entrei aqui")
            parcialDiurno = Math.abs(moment.duration(momentInicial.diff(periodos.LIMITE_SUPERIOR)))
            momentInicial.add(parcialDiurno, 'milliseconds')
            console.log("Parcial diurno")
            console.log(parcialDiurno)
            horaDiurna += parcialDiurno
            console.log("hora noturna")
            console.log(horaDiurna)
        }


        if ((horaNoturna + horaDiurna) - totalTrabalhado == 0) {
            console.log("Teste ok")
            horaFormatada = formatPeriodo(horaDiurna, horaNoturna)

        } else {

            //entro se terminar antes de 23:59


            if (momentFinal >= periodos.LIMITE_SUPERIOR && momentFinal <= periodos.LIMITE_2359) {

                parcialNoturno = Math.abs(moment.duration(momentInicial.diff(momentFinal)))
                console.log("parcial noturno")
                console.log(parcialNoturno)
                momentInicial.add(parcialNoturno, 'milliseconds')
                momentInicial.add(1, 'second')
                horaNoturna += parcialNoturno
                if ((horaNoturna + horaDiurna) - totalTrabalhado == 0) {
                    console.log("Teste ok")
                    horaFormatada = formatPeriodo(horaDiurna, horaNoturna)
                }

            } //se passa da meia noite 
            else {

                parcialNoturno = Math.abs(moment.duration(momentInicial.diff(periodos.LIMITE_2359)))
                momentInicial.add(parcialNoturno, 'milliseconds')
                momentInicial.add(1, 'second')
                horaNoturna += parcialNoturno
                console.log("hora noturna")
                console.log(horaNoturna)

            }



            if ((horaNoturna + horaDiurna) - totalTrabalhado == 0) {
                console.log("Teste ok")
                horaFormatada = formatPeriodo(horaDiurna, horaNoturna)

            }

            else {
                console.log("tô aqui2324")


                if (momentFinal.day() !== periodos.LIMITE_INFERIOR.day()) {
                    console.log("entrei aqui")
                    momentFinal.set("day", periodos.LIMITE_INFERIOR.day())
                    console.log("Moment final depois")
                    console.log(momentFinal)
                }


                //se é menor que 04:59
                console.log("Momente inicial")
                console.log(momentInicial)
                if (momentFinal < periodos.LIMITE_INFERIOR) {

                    if (momentInicial.day() !== momentFinal.day()) {
                        momentInicial.set("day", momentFinal.day())

                    }
                    // periodos.LIMITE_INFERIOR.subtract(1, "day")
                    console.log("hora noturna antes")
                    console.log(horaNoturna)
                    parcialNoturno = Math.abs(moment.duration(momentInicial.diff(momentFinal)))
                    momentInicial.add(parcialNoturno, 'milliseconds')
                    momentInicial.add(1, 'second')
                    horaNoturna += parcialNoturno
                    console.log("hora noturna depoiius")
                    console.log(horaNoturna)

                    horaFormatada = formatPeriodo(horaDiurna, horaNoturna)

                }

                //se é maior que as 05:00
                else {
                    if (momentInicial.day() !== periodos.LIMITE_INFERIOR.day()) {
                        console.log("entrei aqui")
                        momentInicial.set("day", periodos.LIMITE_INFERIOR.day())

                    }

                    parcialNoturno = Math.abs(moment.duration(momentInicial.diff(periodos.LIMITE_INFERIOR)))
                    momentInicial.add(parcialNoturno, 'milliseconds')
                    momentInicial.add(1, 'second')

                    horaNoturna += parcialNoturno

                    if ((horaNoturna + horaDiurna) - totalTrabalhado == 0) {
                        console.log("Teste ok")
                        horaFormatada = formatPeriodo(horaDiurna, horaNoturna)
                    } else {
                        faltante = Math.abs(totalTrabalhado - (horaNoturna + horaDiurna))
                        horaDiurna += faltante

                        horaFormatada = formatPeriodo(horaDiurna, horaNoturna)
                    }

                }
            }
        }


        horaFormatada = formatPeriodo(horaDiurna, horaNoturna)

        console.log("Hora FORMATADA")
        console.log(horaFormatada)
    }


    //comecei na jornada noturna
    else {
        console.log("comecei antes da 00 e terminei antes da 00")
        if (momentInicial >= periodos.LIMITE_SUPERIOR && momentFinal <= periodos.LIMITE_2359) {
            console.log("entrei no if")
            parcialNoturno = Math.abs(moment.duration(momentFinal.diff(momentInicial)))
            momentInicial.add(parcialNoturno, 'milliseconds')
            momentInicial.add(1, 'second')
            horaNoturna += parcialNoturno

            horaFormatada = formatPeriodo(horaDiurna, horaNoturna)

        }

        else {
            if (momentInicial >= periodos.LIMITE_SUPERIOR && momentFinal >= periodos.LIMITE_2359) {
                console.log("comecei antes de 00 e terminei depois de 00")
                parcialNoturno = Math.abs(moment.duration(momentInicial.diff(periodos.LIMITE_2359)))
                momentInicial.add(parcialNoturno, 'milliseconds')
                momentInicial.add(1, 'second')
                horaNoturna += parcialNoturno

            }

            console.log("comecei depois da 00:00")

            if (momentInicial.day() !== periodos.LIMITE_INFERIOR.day()) {
                momentInicial.set("day", periodos.LIMITE_INFERIOR.day())
                console.log("tati")
            }
            //TÔ NA DÚVIDA SE PRECISO MUDAR O MOMENTfINAL
            if (momentFinal.day() !== periodos.LIMITE_INFERIOR.day()) {
                momentFinal.set("day", periodos.LIMITE_INFERIOR.day())
                console.log("tati 2")
            }
            if (momentFinal <= periodos.LIMITE_INFERIOR) {

                parcialNoturno = Math.abs(moment.duration(momentInicial.diff(momentFinal)))
                momentInicial.add(parcialNoturno, 'milliseconds')
                momentInicial.add(1, 'second')
                horaNoturna += parcialNoturno
                console.log("hora noturna")
                console.log(horaNoturna)
            }
            else {
                parcialNoturno = Math.abs(moment.duration(momentInicial.diff(periodos.LIMITE_INFERIOR)))
                momentInicial.add(parcialNoturno, 'milliseconds')
                momentInicial.add(1, 'second')
                horaNoturna += parcialNoturno
                console.log("hora noturna")
                console.log(horaNoturna)

            }


            if ((horaNoturna + horaDiurna) - totalTrabalhado == 0) {
                console.log("Teste ok")
                horaFormatada = formatPeriodo(horaDiurna, horaNoturna)

            }
            else {

                console.log("Tô aqui")
                if (momentFinal.day() !== periodos.LIMITE_SUPERIOR.day()) {
                    console.log("entrei aqui")
                    momentFinal.set("day", periodos.LIMITE_SUPERIOR.day())
                }
                if (momentInicial.day() !== periodos.LIMITE_SUPERIOR.day()) {
                    console.log("entrei aqui")
                    momentInicial.set("day", periodos.LIMITE_SUPERIOR.day())
                }
                if (momentFinal <= periodos.LIMITE_SUPERIOR) {
                    console.log("Tô aqui 2")
                    let parcialDiurno = Math.abs(moment.duration(momentInicial.diff(momentFinal)))

                    console.log(parcialDiurno)
                    momentInicial.add(parcialDiurno, 'milliseconds')
                    horaDiurna = horaDiurna + parcialDiurno
                    horaFormatada = formatPeriodo(horaDiurna, horaNoturna)
                } else {
                    let parcialDiurno = Math.abs(moment.duration(momentInicial.diff(periodos.LIMITE_SUPERIOR)))

                    momentInicial.add(parcialDiurno, 'milliseconds')
                    horaDiurna = horaDiurna + parcialDiurno

                    if ((horaNoturna + horaDiurna) - totalTrabalhado == 0) {

                        faltante = Math.abs(totalTrabalhado - (horaNoturna + horaDiurna))
                        horaNoturna += faltante

                        horaFormatada = formatPeriodo(horaDiurna, horaNoturna)
                    }
                    horaFormatada = formatPeriodo(horaDiurna, horaNoturna)
                }

            }
        }

        horaFormatada = formatPeriodo(horaDiurna, horaNoturna)
    }
    horaFormatada = formatPeriodo(horaDiurna, horaNoturna)

    return horaFormatada
}

/*
function validacoes(values) {
const keys = Object.keys(values)
let msg = '';

for (key of keys) {
if (values[key] == "")
msg += key + ' - Preencha todos os campos!<br>';
}

return msg;
}*/

function setMoment(horario) {
    let dataSplit = horario.split(':');
    let hora = dataSplit[0];
    let minutos = dataSplit[1];
    return moment().set({ 'hour': hora, 'minute': minutos, 'second': 0, 'millisecond': 0 })
}

function formatPeriodo(horaDiurna, horaNoturna) {


    return "Horas diurnas: " + convertMilisegundosHora(horaDiurna) + " | " + " Horas Noturnas: " + convertMilisegundosHora(horaNoturna)

}

function convertMilisegundosHora(tempo) {

    let tempHora = 0
    let tempMinuto = 0
    let temp = 0
    temp = tempo / 1000 //de milisegundos para segundos
    temp = temp / 60 //minutos
    tempHora = parseInt(temp / 60) //horas parte inteira
    tempMinuto = Math.round(temp % 60) //minutos resto da divisão
    if (tempMinuto == 60) {
        tempHora += 1
        tempMinuto = 0
    }

    return tempHora.toString().padStart(2, "0") + ':' + tempMinuto.toString().padStart(2, "0")
}
