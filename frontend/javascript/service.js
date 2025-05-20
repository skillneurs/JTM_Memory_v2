function previous() {
const widthSlider = document.querySelector(".slider").offsetWidth;
    document.querySelector('.slider_content').scrollLeft -= widthSlider;
}
function next() {
    const widthSlider = document.querySelector(".slider").offsetWidth;
    document.querySelector('.slider_content').scrollLeft += widthSlider;
}