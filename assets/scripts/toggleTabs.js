{
  (function () {
    $(".tabs > ul > li").click(function (e) {
      $(e.target).siblings().removeClass("active-tab");
      $(e.target).addClass("active-tab");
      if (e.target.id === "view") {
        $(".feedback-form").hide();
        $(".previous-feedbacks-list").show();
      } else {
        $(".feedback-form").show();
        $(".previous-feedbacks-list").hide();
      }
    });

    // Ratings hover and click handler

    $(".ratings > i").click(function (e) {
      const count = $(e.target).nextAll().length + 1;
      $(".review-rating").val(count);
      showRatings();
    });

    // show rated stars
    function showRatings() {
      const ratedStars = $(".review-rating").val();
      $($(".ratings > i").get().reverse()).each(function (index, element) {
        $(element).removeClass("rated");
        if (ratedStars > index) {
          $(element).addClass("rated");
        }
      });
    }
  })();
}
