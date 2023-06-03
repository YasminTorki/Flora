      // Toggle the menu on small screens
      function toggleMenu() {
        var menu = document.querySelector('.menu');
        if (menu.classList.contains('active')) {
          menu.classList.remove('active');
        } else {
          menu.classList.add('active');
        }
      }
      
      // Hide the menu when a link is clicked on small screens
      function hideMenu() {
        var menu = document.querySelector('.menu');
        if (menu.classList.contains('active')) {
          menu.classList.remove('active');
        }
      }
      
      // Add event listeners for the menu toggle and links
      var menuToggle = document.querySelector('.navbar .menu-toggle');
      menuToggle.addEventListener('click', toggleMenu);
      
      var menuLinks = document.querySelectorAll('.menu a');
      menuLinks.forEach(function(link) {
        link.addEventListener('click', hideMenu);
      });


/*const nav_hamburger = document.querySelector("#nav_hamburger");
const nav_rs_menu = document.querySelector("#nav_rs_menu");

nav_hamburger.addEventListener("click", function () {
  nav_hamburger.classList.toggle("active");
  nav_rs_menu.classList.toggle("active");
});*/