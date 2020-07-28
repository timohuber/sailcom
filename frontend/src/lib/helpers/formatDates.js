import moment from 'moment-timezone/moment-timezone'
moment.tz.add("Europe/Zurich|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19Lc0 11A0 1o00 11A0 1xG10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e4");
moment.tz.setDefault('Europe/Zurich')

export function dateToISOString(date) {
    return (
        moment(date)
            .format('YYYY-MM-DDTHH:mmZ')
            .split('+')[0]

    );
}

export function dateToISOStringWithZ(date) {
    return (
        moment(date)
            .format('YYYY-MM-DDTHH:mmZ')
            .split('+')[0]
            + 'Z'
    );
}

/*
export function dateToISOString(date) {
    return (
        moment(date)
            .tz('Europe/Zurich')
            .format('YYYY-MM-DDTHH:mmZ')
            .split('+')[0] + 'Z'
    );
}
*/
/*
=> Gillaume
export function dateToISOString(date) {
    return (
        moment(date)
            // .tz('Europe/Zurich')
            .format('YYYY-MM-DDTHH:mmZ')
            .split('+')[0]
    );
}


*/

export function dateToDisplayString(date) {
    return moment(date)
        .tz('Europe/Zurich')
        .format('DD.MM.YYYY HH:mm');
}

export function dateToDisplayStringWithoutTime(date) {
    return moment(date)
        .tz('Europe/Zurich')
        .format('DD.MM.YYYY');
}

export function dateFromBackendToDisplayString(date) {
    const local_date = moment(date).add(-2, 'hours')
    return moment(local_date)
        .tz('Europe/Zurich')
        .format('DD.MM.YYYY HH:mm');
}

export function dateShowInTable(date) {
    return Date.parse(date);
}

export function dateShowInDatepicker(date) {
    return Date.parse(moment(date).add(-2, 'hours'));
}