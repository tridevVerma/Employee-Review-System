{
  (function () {
    const sidebarToggler = $("#sidebar-toggler");
    const sidebarContainer = $(".sidebar-container");
    const closeSidebar = $(".close-sidebar");
    const overlay = $(".overlay");

    $(sidebarToggler).click(function () {
      $(overlay).show();
      $(sidebarContainer).removeClass("hide");
    });
    $(closeSidebar).click(function () {
      $(overlay).hide();
      $(sidebarContainer).addClass("hide");
    });
  })();
}
