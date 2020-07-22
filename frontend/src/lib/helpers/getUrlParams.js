export const getUrlParams = () => {
    const current_url = window.location.href;
    const splitted_url = current_url.split('=');
    const url_suffix = splitted_url[1];
    return url_suffix;
};

export const getCurrentUrl = () => {
    const current_url = window.location.href;
    // localhost
    const splitted_url = current_url.split('3000/');
    // TODO: change typical url suffix of production url in split
    // const splitted_url = current_url.split('ch/');
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


// How to use getCurrentUrl
// import { getCurrentUrl } from '../../../lib/helpers/getUrlParams';
// export const ToLoginPageButton = () => {
//     const url = getCurrentUrl();
//     return (
//         <NavLink to={`/login/?=${url}`} className='btn primary'>
//             Login
//         </NavLink>
//     );
// };