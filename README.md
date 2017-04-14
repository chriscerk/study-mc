# StudyMC

<img align="center" src="https://raw.githubusercontent.com/chriscerk/studymc/master/readme/studymc-logo.jpg" alt="Logo">

Study-MC (Study Medicinal Chemistry) is a College of Pharmacy web application to help graduate students learn, test, and review their course materials.

# Overview

[Organization](https://github.com/chriscerk/study-mc#organization)

[Running the Application Locally](https://github.com/chriscerk/study-mc#development)

[Development](https://github.com/chriscerk/study-mc#development)

[Other Info.](https://github.com/chriscerk/studymc#other-information)

[Screenshots](https://github.com/chriscerk/studymc#screenshots)

### Quicklinks
App: https://apps.phar.umich.edu/study-mc/

Sprint Planning: https://trello.com/studymc

Virtual Lib: https://pharmacy.umich.edu/mcvl/


# Organization
<strong>Learn</strong>
Content provided to help expand the student's knowledge along with practice problems which include feedback.

<strong>Test</strong>
Example test questions to gauge a student's knowledge on a particular topic.

<strong>Review</strong>
A review sheet which students can fill out online then print upon completion.


# Running the Application Locally


1. Ensure [Node.js](https://nodejs.org/en/) & [Git](https://git-scm.com/downloads) are installed

2. `git clone git@github.com:chriscerk/study-mc.git`

3. `cd study-mc`

4. `npm install`

5. `ng serve` 

6. Navigate to `http://localhost:4200/` in your browser.

7. Create a file named `firebase.config.ts` and put it in the `/src/environments/` folder

8. Get your firebase credentials and insert as:

`export const firebaseConfig = {
    apiKey: "",
    authDomain: "your-app-name.firebaseapp.com",
    databaseURL: "https://your-app-name.firebaseio.com",
    projectId: "your-app-name",
    storageBucket: "your-app-name.appspot.com",
    messagingSenderId: ""
  };`

# Development

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


### Building

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.


# Deploying the Application

1. `npm run deploy` 

2. Copy the contents of the `dist` directory to the server through FileZilla.


# Other Information

### Images

For each Topic in a Course, the images are stored in `assets/media/compounds/`. For each new topic added to a course, a new folder must be created WITH THE SAME NAME AS THE TOPIC in this location. Images for that topic must be placed inside of the new folder. 

### UM Access

<strong>Dev Environment</strong>: http://dev-apps.phar.umich.edu/study-mc/

`/afs/umich.edu/group/acadaff/pharmacy/devapps/study-mc`

<strong>Production Environment</strong>: https://apps.phar.umich.edu/study-mc/

`/afs/umich.edu/group/acadaff/pharmacy/Private/html/study-mc`


### Further help

[Angular](https://angular.io)

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Screenshots
