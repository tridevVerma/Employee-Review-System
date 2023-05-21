{
  (function () {
    $("#reviewer").change(function () {
      $("#reviewee [value=" + $(this).val() + "]").attr({
        disabled: "disabled",
        style: "color:#999",
      });
    });

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
  })();
}
