// When user clicks, toggle between showing and hiding dropdown
function getDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}
// Close drop down if user clicks outside of box
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        let myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}