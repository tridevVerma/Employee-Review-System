{
  // Add employee via ajax
  (function () {
    $(".add-employee-btn").on("click", (e) => {
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: $(e.target).attr("href"), // url contains user's id which will be added to employees
        success: function ({ data }) {
          // if success --> remove user from registered users list
          $(`#user-${data.userID}`).remove();
          notifyMsg("success", "Employee added !!");
        },
        error: function (err) {
          console.log(err);
          notifyMsg("error", err.responseText);
        },
      });
    });

    // Add event listener to all delete employee buttons
    $(".remove-employee-btn").each((index, link) =>
      addListenerToDeleteLink(link)
    );

    // Add event listener submit to each employee
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
              window.location.href = "/";
            }
            // Get updated employee data from server
            const employee = data.updatedEmployee;

            // update the employee card with a new card
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

            // Add event listener to newly created employee card
            addListenerToDeleteLink(
              $(`#employee-${employee._id}`).find(".remove-employee-btn")[0]
            );
            notifyMsg("success", "Employee updated !!");
          },
          error: function (err) {
            notifyMsg("error", err.responseJSON.message);
          },
        });
      }
    );
  })();

  function addListenerToDeleteLink(link) {
    // helper function takes link to add event listener
    $(link).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: $(e.currentTarget).attr("href"),
        success: function ({ data }) {
          if (data.logout) {
            window.location.href = "/";
          }
          // Remove deleted employee card from all employees list
          $(`#employee-${data.deletedEmployeeID}`).remove();
          notifyMsg("success", "Employee and their feedbacks removed !!");
        },
        error: function (err) {
          notifyMsg("error", err.responseJSON.message);
        },
      });
    });
  }

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
