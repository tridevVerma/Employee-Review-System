$(".tabs > ul > li").click((function(e){$(e.target).siblings().removeClass("active-tab"),$(e.target).addClass("active-tab"),"view"===e.target.id?($(".feedback-form").hide(),$(".previous-feedbacks-list").show()):($(".feedback-form").show(),$(".previous-feedbacks-list").hide())})),$(".ratings > i").click((function(e){const t=$(e.currentTarget).closest("div.card"),i=$(e.currentTarget).nextAll().length+1;$(t).find("input.review-rating").val(i),function(e){const t=$(e).find(".review-rating").val();$($(e).find(".ratings > i").get().reverse()).each((function(e,i){$(i).removeClass("rated"),t>e&&$(i).addClass("rated")}))}(t)}));