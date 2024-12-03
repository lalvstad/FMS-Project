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

// For future functionality of changing text and href when users login
/*
function createSession() {
    document.addEventListener('DOMContentLoaded', () => {
        const loginLinks = document.querySelectorAll('a#loginProfile');
        
        // Session storage is data that is saved for the user's browser while it is open. When closed, this data is delete.
        const storedHref = sessionStorage.getItem('loginHref');
        const storedText = sessionStorage.getItem('loginText');
        
        loginLinks.forEach(link => {
          if (storedHref) link.href = storedHref;
          if (storedText) link.innerHTML = storedText;
          else {
            // Set the new values and store them
            link.href = 'login_profilePage.html';
            link.innerHTML = 'Profile';
            
            sessionStorage.setItem('loginHref', 'login_profilePage.html');
            sessionStorage.setItem('loginText', 'Profile');
          }
        });
    });
}

// Used to see if a user is in a current Session by checking if items loginHref and loginText are in Session storage
function isInSession() {
    document.addEventListener('DOMContentLoaded', () => {
        const loginLinks = document.querySelectorAll('a#loginProfile');
        
        // Session storage 
        const storedHref = sessionStorage.getItem('loginHref');
        const storedText = sessionStorage.getItem('loginText');
        
        loginLinks.forEach(link => {
          if (storedHref) link.href = storedHref;
          if (storedText) link.innerHTML = storedText;
        });
    });
}
*/