# Employee-Review-System
This is an employee review system website where different user can give feedbacks to other employees. (All functionalities are governed by ADMIN)

Hoisted Link : [ERS](https://employee-review-system-b6f2.onrender.com)

# How to setup the project on local system
1. Clone this project
2. Start by installing npm if you don't have it already.
3. Navigate to Project Directory.
4. After reaching the project directory you have to run the following the command.
  - For development
    ```` 
          npm install 
          npm start
    ````
  - For Production
    ```` 
          npm install 
          npm run production
    ````
# Features
+ Initiate project with creating root admin.
+ Signup / Signin / Logout functionalities for Logged users / employees / admins
+ Light / Dark Mode for whole Project
+ Register users which could be added to employees group by one of the admins
+ Employees view
  - List of performance review requiring feedback
  - Form to Submit feedback
  - View previously submitted feedbacks by the logged employee
+ Admin view
  - All features of employee views are present for admin
  - View all registered users which will be added to employees group
  - View all employees ( update / delete / make admin )
  - Assign task to employees (give feedbacks)
  - All previous feedbacks by different users (both complete and incomplete)
+ Fully responsive website

## Technologies ##

### Languages ###

- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
  - Used as the main markup language for the website content.
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
  - Used to style the individual webpages.
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  - Used to create the interactive functionality of the website
- [JQuery](https://jquery.com/)
  - jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.
  
### Libraries ###

- [Mongoose](https://mongoosejs.com/)
  - Mongoose is a JavaScript object-oriented programming library that creates a connection between MongoDB and the Node.js JavaScript runtime environment.
- [Node-Sass](https://www.npmjs.com/package/node-sass)
  - Node-sass is a library that provides binding for Node.js to LibSass, the C version of the popular stylesheet preprocessor, Sass.
- [EJS](https://ejs.co/)
  - EJS is a simple templating language that lets you generate HTML markup with plain JavaScript.
- [Express-EJS-Layouts](https://www.npmjs.com/package/express-ejs-layouts)
  - Generate general Layout for UI
  
### Tools ###

- [Git](https://git-scm.com/)
  - Git was used for version control by utilizing the Gitpod terminal to commit to Git and push to GitHub.
- [GitHub](https://github.com/)
  - Used to store, host and deploy the project files and source code after being pushed from Git.
- [Visual Studio Code](https://code.visualstudio.com/)
  - A locally installed IDE connected to the GitHub repository for when there was no internet connection to use Gitpod.
- [Font-Awesome](https://fontawesome.com/icons?d=gallery)
  - Used for icons to enhance headings and add emphasis to text.
- [Google fonts](https://fonts.google.com/)
  - Used for the website fonts.
- [Gulp](https://gulpjs.com/)
  - Used to build (compile, compress and minify sass, js and images)


### Folder Structure

```
Employee Review System
    |
    |               |--->css
    |--->assets---->|--->images
    |               |--->sass
    |               |--->scripts
    |             
    |
    |                |--->customFlashMiddleware.js
    |                |--->environment.js
    |--->configs---->|--->localStrategyConfig.js
    |                |--->mongoose.js
    |                |--->viewHelper.js
    |
    |                  |-->createFirstAdmin.js
    |                  |-->EmployeeController.js
    |--->controllers-->|-->FeedbackController.js
    |                  |-->HomeController.js
    |                  |-->UserController.js
    |
    |               |-->Employee.js
    |--->models---->|-->Feedback.js
    |               |-->User.js
    |
    |              
    |               |-->employee.js
    |--->routes---->|-->feedback.js
    |               |-->index.js
    |               |-->user.js
    |
    |                                                  |--->_employee-view-ejs
    |              |--->partials.ejs              |--->|--->_navbar.ejs
    |                                                  |--->_sidebar.ejs
    |              |---> AddEmployee.ejs
    |              |---> AllEmployee.ejs
    |              |---> AssignTask.ejs
    |--->views---->|--->Feedback.ejs
    |              |--->Home.ejs
    |              |--->layout.ejs
    |              |--->SignIn.ejs
    |              |--->SignUp.ejs
    |
    |-->node_modules
    |-->.gitignore
    |--> index.js
    |--> package-lock.json
    |-->package.json
    
    ````
