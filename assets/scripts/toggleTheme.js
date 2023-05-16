{
  (function () {
    const themeToggler = $("#theme-toggler");
    const themeImage = $("#theme-toggler > img");
    $(themeToggler).click(function () {
      const val = $("html").attr("data-theme");
      if (val === "dark") {
        $("html").attr("data-theme", "light");
        $(themeImage).attr("src", "/images/sun.png");
      } else {
        $("html").attr("data-theme", "dark");
        $(themeImage).attr("src", "/images/moon.png");
      }
    });
  })();
}
