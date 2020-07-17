export function dateToISOString(date){
    return date.toISOString().split('.')[0].split(':').slice(0,-1).join(':')+"Z"
}

