export const getUrlParams = () => {
    const current_url = window.location.href;
    const splitted_url = current_url.split('?');
    const url_suffix = splitted_url[1];
    return url_suffix;
};

// How to use getUrlParams()
// import { getUrlParams } from '../../lib/helpers/getUrlParams';
// let history = useHistory();
// let url_param = getUrlParams();
// const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     dispatch(loginAction(formState));
//     history.push(`/${url_param}`);
// };
