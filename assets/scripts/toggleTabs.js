{
  // Toggle tabs on home page (Incomplete feedbacks and completed Feedbacks)
  (function () {
    $(".tabs > ul > li").click(function (e) {
      // remove active class if already present on any tabs
      $(e.target).siblings().removeClass("active-tab");

      // add active class to clicked tab
      $(e.target).addClass("active-tab");

      // Show tabs which are chosen
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
      // select card in which rating resides
      const card = $(e.currentTarget).closest("div.card");

      // count no of stars given
      const count = $(e.currentTarget).nextAll().length + 1;

      // set hidden input which will carry ratings to server
      $(card).find("input.review-rating").val(count);
      showRatings(card);
    });

    function showRatings(card) {
      // Count no of stars
      const ratedStars = $(card).find(".review-rating").val();

      // Show selected stars
      $($(card).find(".ratings > i").get().reverse()).each(function (
        index,
        element
      ) {
        $(element).removeClass("rated");
        if (ratedStars > index) {
          $(element).addClass("rated");
        }
      });
    }
  })();
}
