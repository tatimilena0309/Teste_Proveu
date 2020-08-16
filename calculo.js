const moment = require('moment');
const precise = require('moment-precise-range-plugin');
const periodos = require('./periodos');
let horaDiurna = 0
let horaNoturna = 0
let acumuladoFull = 0

exports.post = function (req, res) {
    const validacao = validacoes(req.body);

    if (validacao !== '') {
        return res.send(validacao);
    }

    let momentInicial = setMoment(req.body.hora_inicial)
    let momentFinal = setMoment(req.body.hora_final)

    const duration = moment.duration(momentInicial.diff(momentFinal))

    if (duration > 0) {
        momentFinal.add(1, 'day')
    }
    const totalTrabalhado = Math.abs(moment.duration(momentInicial.diff(momentFinal)))

}

function validacoes(values) {
    const keys = Object.keys(values)
    let msg = '';

    for (key of keys) {
        if (values[key] == "")
            msg += key + ' - Preencha todos os campos!<br>';
    }

    return msg;
}

function setMoment(horario) {
    let dataSplit = horario.split(':');
    let hora = dataSplit[0];
    let minutos = dataSplit[1];
    return moment().set({ 'hour': hora, 'minute': minutos, 'second': 0, 'millisecond': 0 })
}

function formatPeriodo(res, horaDiurna, horaNoturna) {

    //res.send("Horas diurnas: " + 
    //moment.utc(horaDiurna).format('HH:mm') + " | " + " Horas Noturnas: " + 
    //moment.utc(horaNoturna).format('HH:mm'))
    res.send("Horas diurnas: " + horaDiurna + " | " + " Horas Noturnas: " + horaNoturna)
}
