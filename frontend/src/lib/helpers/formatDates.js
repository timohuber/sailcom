import moment from 'moment-timezone/moment-timezone'

export function dateToISOString(date){
    return moment(date).tz('Europe/Zurich').format('YYYY-MM-DDTHH:mmZ').split('+')[0] + "Z"
}

export function dateToDisplayString(date){
    // return moment(date).tz('Europe/Zurich').format('DD.MM.YYYY hh:mm')
    return moment(date).format('DD.MM.YYYY HH:mm')
}