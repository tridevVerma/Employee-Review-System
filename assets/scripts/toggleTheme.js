{
  // Gets image from server
  function getImage(filename) {
    // Check environment mode of server
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/env",
      success: function (environment) {
        if (environment === "production") {
          // Server is running in production mode
          $.ajax({
            url: "http://localhost:3000/rev-manifest.json",
            type: "GET",
            success: function (data) {
              // set filename to hashed filename and get image from server
              return getImageHelper(data[filename]);
            },
            error: function (err) {
              console.log(err);
            },
          });
        } else {
          // Server is running in development mode
          return getImageHelper(filename);
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  }

  function getImageHelper(filename) {
    // Get image from server with filename
    $.ajax({
      url: "/images/" + filename,
      method: "GET",
      xhrFields: {
        responseType: "blob",
      },
      success: function (data) {
        // return url of image
        return URL.createObjectURL(data);
      },
      error: function (err) {
        console.log(err);
      },
    });
  }

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
        $(themeImage).attr("src", getImage("moon.png"));
        $(themeLabel).text("Night");
      } else {
        // if current theme is light
        $(themeImage).attr("src", getImage("sun.png"));
        $(themeLabel).text("Day");
      }
    } else {
      // If currentTheme is not set --> set it to dark mode
      $("html").attr("data-theme", "dark");
      localStorage.setItem("data-theme", "dark");
      $(themeImage).attr("src", getImage("moon.png"));
      $(themeLabel).text("Night");
    }

    // On toggling theme mode
    $(themeToggler).click(function () {
      if (localStorage.getItem("data-theme") === "dark") {
        // If theme is dark set it to light
        $("html").attr("data-theme", "light");
        localStorage.setItem("data-theme", "light");
        $(themeImage).attr("src", getImage("sun.png"));
        $(themeLabel).text("Day");
      } else {
        // If theme is light set it to dark
        $("html").attr("data-theme", "dark");
        localStorage.setItem("data-theme", "dark");
        $(themeImage).attr("src", getImage("moon.png"));
        $(themeLabel).text("Night");
      }
    });
  })();
}
