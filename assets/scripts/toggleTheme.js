{
  // Gets image from server
  async function getImage(filename) {
    // Check environment mode of server
    try {
      const environment = await $.ajax({
        type: "GET",
        url: "/env",
      });

      if (environment === "production") {
        // If server is in production mode
        const imageBook = await $.ajax({
          type: "GET",
          url: "/rev-manifest.json",
        });
        return `/images/${imageBook[filename]}`;
      } else {
        // If server is in development mode
        return `/images/${filename}`;
      }
    } catch (err) {
      console.log(err);
    }
  }

  (async function () {
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
        $(themeImage).attr("src", await getImage("moon.png"));
        $(themeLabel).text("Night");
      } else {
        // if current theme is light
        $(themeImage).attr("src", await getImage("sun.png"));
        $(themeLabel).text("Day");
      }
    } else {
      // If currentTheme is not set --> set it to dark mode
      $("html").attr("data-theme", "dark");
      localStorage.setItem("data-theme", "dark");
      $(themeImage).attr("src", await getImage("moon.png"));
      $(themeLabel).text("Night");
    }

    // On toggling theme mode
    $(themeToggler).click(async function () {
      if (localStorage.getItem("data-theme") === "dark") {
        // If theme is dark set it to light
        $("html").attr("data-theme", "light");
        localStorage.setItem("data-theme", "light");
        $(themeImage).attr("src", await getImage("sun.png"));
        $(themeLabel).text("Day");
      } else {
        // If theme is light set it to dark
        $("html").attr("data-theme", "dark");
        localStorage.setItem("data-theme", "dark");
        $(themeImage).attr("src", await getImage("moon.png"));
        $(themeLabel).text("Night");
      }
    });
  })();
}
