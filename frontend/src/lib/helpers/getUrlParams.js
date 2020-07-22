export const getUrlParams = () => {
    const current_url = window.location.href;
    const splitted_url = current_url.split('=');
    const url_suffix = splitted_url[1];
    return url_suffix;
};