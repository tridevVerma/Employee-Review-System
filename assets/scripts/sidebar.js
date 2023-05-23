{
  (function () {
    // Toggle sidebar
    const sidebarToggler = $("#sidebar-toggler");
    const sidebarContainer = $(".sidebar-container");
    const closeSidebar = $(".close-sidebar");
    const overlay = $(".overlay");

    const hideSidebar = function () {
      // hide sidebar
      $(overlay).hide();
      $(sidebarContainer).addClass("hide");
    };

    $(sidebarToggler).click(function () {
      // show sidebar
      $(overlay).show();
      $(sidebarContainer).removeClass("hide");

      // If clicked outside of sidebar --> close sidebar
      $(overlay).click(hideSidebar);
    });

    // Click on close button --> close sidebar
    $(closeSidebar).click(hideSidebar);

    const nav = $("nav > ul");

    if ($(document).width() - $(nav).width() <= 500) {
      // If nav takes more space due to more links (admin nav) hide navbar and show sidebar
      $(nav).hide();
      $(sidebarToggler).show();
    } else {
      $(nav).show();
      $(sidebarToggler).hide();
    }
  })();
}
