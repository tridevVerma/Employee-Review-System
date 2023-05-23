{
  // One person can't review himself, so disable reviewee if reviewer is chosen
  (function () {
    $("#reviewer").change(function () {
      $("#reviewee [value=" + $(this).val() + "]").attr({
        disabled: "disabled",
        style: "color:#999",
      });
    });

    // If choice altered, remove disable prop
    $("#reviewer").change(function () {
      $("#reviewee")
        .find("option")
        .each(function () {
          $(this).removeAttr("disabled");
        });
      $("#reviewee [value=" + $(this).val() + "]").attr({
        disabled: "disabled",
        style: "color: var(--body-text)",
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
