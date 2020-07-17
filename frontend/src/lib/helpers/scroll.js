export function smoothScroll(target){
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}