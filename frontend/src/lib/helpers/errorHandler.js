export const formErrorHandler = error => {
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
        `${element} updated.`);
    setTimeout(function(){
        document.getElementById('element-updated').innerHTML = '';
    }, 4000);
};

// <span id='event-updated'></span>