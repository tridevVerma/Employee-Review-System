{
  (function () {
    $(".add-employee-btn").on("click", (e) => {
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: $(e.target).attr("href"),
        success: function ({ data }) {
          $(`#user-${data.userID}`).remove();
          notifyMsg("success", "Employee added !!");
        },
        error: function (err) {
          console.log(err);
          notifyMsg("error", err.responseText);
        },
      });
    });

    $(".remove-employee-btn").click(function (e) {
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: $(e.currentTarget).attr("href"),
        success: function ({ data }) {
          if (data.logout) {
            window.location.href = "/";
          }
          $(`#employee-${data.deletedEmployeeID}`).remove();
          notifyMsg("success", "Employee removed !!");
        },
        error: function (err) {
          console.log(err);
          notifyMsg("error", err.responseText);
        },
      });
    });

    $(".employees-container").on(
      "submit",
      $(".employee-update-form"),
      function (e) {
        e.preventDefault();
        $.ajax({
          type: "POST",
          url: $(e.target).attr("action"),
          data: $(e.target).serialize(),
          success: function ({ data }) {
            if (data.logout) {
              document.location.href = "/";
            }
            const employee = data.updatedEmployee;
            const newCard = `<div class="card" id="employee-${employee._id}">
          <div class="card-heading">
            <h2>Employee</h2>
            <a
              href="/employee/remove/${employee._id}"
              class="remove-employee-btn"
            >
              <i class="fa-solid fa-trash"></i>
            </a>
          </div>
          <div class="card-content">
            <form
              action="/employee/update/${employee._id}"
              method="POST"
              class="employee-update-form"
            >
              <div>
                <label for="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="${employee.user.email}"
                />
              </div>
              <div>
                <label for="firstname">Firstname</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="${employee.user.firstname}"
                />
              </div>
              <div>
                <label for="astname">Lastname</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="${employee.user.lastname}"
                />
              </div>
              <div>
            <span>Is Admin</span>
            <label class="switch">
              <input type="checkbox" name="isAdmin" ${
                employee.isAdmin ? "checked" : ""
              } />
              <span class="slider round"></span>
            </label>
          </div>
              <button type="submit">Update</button>
            </form>
          </div>
        </div>`;
            $(`#employee-${employee._id}`).replaceWith(newCard);
            notifyMsg("success", "Employee updated !!");
          },
          error: function (err) {
            console.log(err);
            notifyMsg("error", err.responseText);
          },
        });
      }
    );
  })();

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
}
