{
  (function () {
    $(".add-employee-btn").click((e) => {
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: $(e.target).attr("href"),
        success: function ({ data }) {
          $(`#user-${data.userID}`).remove();
        },
        error: function (err) {
          console.log(err);
        },
      });
    });
  })();
}
