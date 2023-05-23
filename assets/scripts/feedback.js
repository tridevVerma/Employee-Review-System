{
  (function () {
    // Delete a feedback (only accessible to admins)
    $(".delete-feedback-btn").click(function (e) {
      const feedID = e.currentTarget.id;
      $.ajax({
        type: "GET",
        url: `/feedbacks/delete-review/${feedID}`, // Send ID of feed which will be deleted
        success: function ({ data }) {
          // Remove feedback card on successfully removing feedback
          $(`#card-${data.feedID}`).remove();
          notifyMsg("success", "Feedback Deleted !!");
        },
        error: function (err) {
          notifyMsg("error", err.responseText);
        },
      });
    });

    // method to call noty
    notifyMsg = function (typeMsg, textMsg) {
      new Noty({
        theme: "relax",
        text: textMsg,
        type: typeMsg,
        layout: "topRight",
        timeout: 1500,
      }).show();
    };
  })();
}
