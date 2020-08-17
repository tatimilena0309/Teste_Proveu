const moment = require('moment');
const periodos = require('./periodos');

let horaDiurna = 0
let horaNoturna = 0
let acumuladoFull = 0
let horaFormatada = '';


exports.post = function (values) {

    let horaInicial = values.horaInicial;
    let momentInicial = setMoment(values.horaInicial)
    let momentFinal = setMoment(values.horaFinal)

    const duration = moment.duration(momentInicial.diff(momentFinal))

    if (duration > 0) {
        momentFinal.add(1, 'day')
    }
    const totalTrabalhado = Math.abs(moment.duration(momentInicial.diff(momentFinal)))

    if (momentInicial >= periodos.LIMITE_INFERIOR && momentInicial <= periodos.LIMITE_SUPERIOR) {

        horaDiurna = Math.abs(moment.duration(momentInicial.diff(periodos.LIMITE_SUPERIOR)))
        momentInicial.add(horaDiurna, 'milliseconds')


        if (momentFinal < periodos.LIMITE_2359) {

            horaNoturna = Math.abs(moment.duration(momentFinal.diff(periodos.LIMITE_2359)))
            momentInicial.add(horaNoturna, 'milliseconds')
            momentInicial.add(1, 'second')
            acumuladoFull = horaDiurna + horaNoturna


            let faltante = totalTrabalhado - acumuladoFull
            if (totalTrabalhado != acumuladoFull) {
                horaDiurna = horaDiurna + faltante
            }

        } else {
            horaNoturna = Math.abs(moment.duration(momentInicial.diff(periodos.LIMITE_2359)))
            momentInicial.add(horaNoturna, 'milliseconds')
            momentInicial.add(1, 'second')
            acumuladoFull = horaNoturna + horaDiurna

            if (acumuladoFull != totalTrabalhado) {

                if (momentInicial.day() != periodos.LIMITE_INFERIOR.day()) {
                    periodos.LIMITE_INFERIOR.add(1, "day")
                }

                let parcialNoturno = Math.abs(moment.duration(momentInicial.diff(periodos.LIMITE_INFERIOR)))

                horaNoturna = parcialNoturno + horaNoturna
                acumuladoFull = horaNoturna + horaDiurna
                let faltante = totalTrabalhado - acumuladoFull


                if (totalTrabalhado != acumuladoFull) {
                    horaDiurna = horaDiurna + faltante
                }
            }
            acumuladoFull = horaNoturna + horaDiurna

            horaFormatada = formatPeriodo(horaDiurna, horaNoturna)
        }

        horaFormatada = formatPeriodo(horaDiurna, horaNoturna)

    } else {

        if (momentInicial >= periodos.LIMITE_SUPERIOR && momentInicial <= periodos.LIMITE_2359) {

            horaNoturna = Math.abs(moment.duration(momentInicial.diff(periodos.LIMITE_2359)))
            momentInicial.add(horaNoturna, 'milliseconds')
            momentInicial.add(1, 'second')

        }

        if (momentInicial.day() != periodos.LIMITE_INFERIOR.day()) {
            periodos.LIMITE_INFERIOR.add(1, "day")
        }

        if (momentInicial <= periodos.LIMITE_INFERIOR) {

            let parcialNoturno = Math.abs(moment.duration(momentInicial.diff(periodos.LIMITE_INFERIOR)))
            momentInicial.add(parcialNoturno, 'milliseconds')
            horaNoturna = horaNoturna + parcialNoturno

            acumuladoFull = horaNoturna + horaDiurna

            let faltante = totalTrabalhado - acumuladoFull

            if (acumuladoFull != totalTrabalhado) {
                horaDiurna = horaDiurna + faltante

            }
            acumuladoFull = horaNoturna + horaDiurna

            horaFormatada = formatPeriodo(horaDiurna, horaNoturna)
        }
    }

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
    let temp = tempo / 1000 //de milisegundos para segundos
    temp = temp / 60 //minutos
    tempHora = parseInt(temp / 60) //horas parte inteira
    tempMinuto = Math.round(temp % 60) //minutos resto da divisão
    if (tempMinuto == 60) {
        tempHora += 1
        tempMinuto = 0
    }

    return tempHora.toString().padStart(2, "0") + ':' + tempMinuto.toString().padStart(2, "0")
}
