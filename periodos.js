const moment = require('moment');
const periodos = {
    LIMITE_SUPERIOR:    moment().set({ 'hour': 22, 'minute': 0, 'second': 0, 'millisecond': 0 }),
    LIMITE_INFERIOR:    moment().set({ 'hour': 05, 'minute': 0, 'second': 0, 'millisecond': 0 }),
    LIMITE_2359:        moment().set({ 'hour': 23, 'minute': 59, 'second': 59, 'millisecond': 0 }),
    LIMITE_00:          moment().set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 }),
}
periodos.LIMITE_00.add(1,"day");
Object.freeze(periodos);

module.exports = periodos;