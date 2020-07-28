export const toggleAccordionHandler = (panel_id, icon_id) => {
    document.getElementById(panel_id).classList.toggle('open');
    document.getElementById(icon_id).classList.toggle('fa-chevron-up');
};