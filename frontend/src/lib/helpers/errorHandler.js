export const formErrorHandler = error => {
    const errorSpanList = document.querySelectorAll('.error')
    errorSpanList.forEach(error => {
        error.innerText = ''
    })

    for (const [key, value] of Object.entries(error)) {
        console.log(key)
        const errorTag = document.querySelector(`span.error[data-key=${key}]`)
        errorTag.innerText = value
    }

    // Todo
    // Scroll to first error
}