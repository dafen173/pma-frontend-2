# ProjectManagementApp

## This project is a project management system built with Angular.

## [DEMO version of the application](https://dafen173.github.io/pma-frontend-2)

<br>

### Backend Server (provided by [RS-School](https://github.com/rolling-scopes-school/final-task-backend/tree/main/Project%20management%20application)) has been deployed [here](https://pma-backend-668b.up.railway.app/api-docs/)

<br>
<hr>
<br>

## To run the application locally

<br>

### Start server side:
[LOOK HERE](https://github.com/rolling-scopes-school/final-task-backend/tree/main/Project%20management%20application)

<br>

### Start client side:
After cloning this repository install Dependencies first.
Client side dependencies by running in the `project-management-app` directory,  you can run:
#### `npm install`

then run the command in the `project-management-app` directory:
#### `npm start`

<br>

### Runs the app:<br>
Open [http://localhost:4200](http://localhost:4200) to view it in the browser.

<hr>

## Description

### Evaluation criteria
<br>

#### Welcome route
 + The welcome page should contain general information about the developer, project, and course.

 + In the upper right corner there are 2 buttons: login and sign up.

 + If there is an unexpired token, the user should be redirected to the "Main route" of the application automatically.

 + When the token expires - the user should be redirected to the "Welcome page" automatically.

 + Pressing the Login / Sign up button redirects a user to the route with the Login / Sign up form.

#### Login / Sign up
 + Login/log out should be present on all pages.

 + Form fields should be implemented according to the backend API. Validation should be implemented.

 + Upon successful login, the user should be redirected to "Main route".

#### Main route
 + Board creation functionality.

 + Displays all created boards as a list.

 + Each board in the list is displayed with a small preview of available information (title, description, etc). By clicking an element the user navigates to the board item (Board route). There's also a button for board deletion.

 + When trying to delete the board, we should receive a confirmation modal. The confirmation modal must be a generic component (one for the entire application).

#### Board route
 + Button for column creation is displayed.

 + If a board contains at least one column - a button for task creation is displayed as well.

 + A modal window with form is displayed for column and task creation.

 + A vertical scrollbar is displayed in the column when overflowing with the number of column tasks 20 points

 + By clicking on the task, we open a modal window with the edit task form. The requirements for the form and window are the same as everywhere else.

 + The task must have a delete task button. On click: confirmation modal -> delete.

 + The top of a column should always display the column title. By clicking the title the test should turn into a form with cancel and submit buttons. After typing a text into the input and clicking the submit button the tile of the column should be updated.

 + The column should have a delete button. By clicking -> confirmation modal -> when approving -> deleting.
