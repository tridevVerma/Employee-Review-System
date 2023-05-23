{
  (function () {
    const themeToggler = $("#theme-toggler");
    const themeImage = $("#theme-toggler > img");
    const themeLabel = $("#theme-toggler > span");

    // On page load
    const currentTheme = localStorage.getItem("data-theme");

    if (currentTheme !== null) {
      // If currentTheme is set
      $("html").attr("data-theme", currentTheme);

      if (currentTheme === "dark") {
        // if current theme is dark
        $(themeImage).attr("src", "/images/moon.png");
        $(themeLabel).text("Night");
      } else {
        // if current theme is light
        $(themeImage).attr("src", "/images/sun.png");
        $(themeLabel).text("Day");
      }
    } else {
      // If currentTheme is not set --> set it to dark mode
      $("html").attr("data-theme", "dark");
      localStorage.setItem("data-theme", "dark");
      $(themeImage).attr("src", "/images/moon.png");
      $(themeLabel).text("Night");
    }

    // On toggling theme mode
    $(themeToggler).click(function () {
      if (localStorage.getItem("data-theme") === "dark") {
        // If theme is dark set it to light
        $("html").attr("data-theme", "light");
        localStorage.setItem("data-theme", "light");
        $(themeImage).attr("src", "/images/sun.png");
        $(themeLabel).text("Day");
      } else {
        // If theme is light set it to dark
        $("html").attr("data-theme", "dark");
        localStorage.setItem("data-theme", "dark");
        $(themeImage).attr("src", "/images/moon.png");
        $(themeLabel).text("Night");
      }
    });
  })();
}
