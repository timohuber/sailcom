import {smoothScroll} from "./scroll";

export const formErrorHandler = error => {
    console.log('in form error handler')
    const errorSpanList = document.querySelectorAll('.error')
    errorSpanList.forEach(error => {
        error.innerText = ''
    })

    for (const [key, value] of Object.entries(error)) {
        const errorTag = document.querySelector(`span.error[data-key=${key}]`)
        errorTag.innerText = value
    }

    // Todo
    // Scroll to first error
}

export const elementUpdatedMessage = (element) => {
    (document.getElementById('element-updated').innerText =
        `${element} erfolgreich gespeichert.`);
};

// <span id='event-updated'></span>


export const advancedFormErrorHandler = error => {
    console.log('in advanced form error handler')
    const errorSpanList = document.querySelectorAll('.error')
    errorSpanList.forEach(error => {
        error.innerText = ''
    })

    const inputWrapperList = document.querySelectorAll('.input-wrapper.has-error')
    inputWrapperList.forEach( wrapper => {
        wrapper.classList.remove('has-error')
    })

    for (const [key, value] of Object.entries(error)) {
        const errorTag = document.querySelector(`span.error[data-key=${key}]`)
        errorTag.innerText = value
        errorTag.closest('.input-wrapper').classList.add('has-error')
    }

    if(Object.keys(error).length > 0) {
        smoothScroll('.input-wrapper.has-error')
    }

}

