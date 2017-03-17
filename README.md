# Study-MC

<img align="center" src="https://raw.githubusercontent.com/chriscerk/studymc/master/readme/studymc-logo.jpg" alt="Logo">

Study-MC (Study Medicinal Chemistry) is a College of Pharmacy web application to help graduate students learn, test, and review their course materials.

# Overview

[Organization](https://github.com/chriscerk/study-mc#organization)

[Development](https://github.com/chriscerk/study-mc#development)

[UM Access](https://github.com/chriscerk/study-mc#um-access)

[Other Info.](https://github.com/chriscerk/studymc#other-information)

[Screenshots](https://github.com/chriscerk/studymc#screenshots)

## Quicklinks
App: https://apps.phar.umich.edu/studymc/

Sprint Planning: https://trello.com/studymc

Virtual Lib: https://pharmacy.umich.edu/mcvl/


# Organization
<strong>Learn</strong>
Content provided to help expand the student's knowledge along with practice problems which include feedback.

<strong>Test</strong>
Example test questions to gauge a student's knowledge on a particular topic.

<strong>Review</strong>
A review sheet which students can fill out online then print upon completion.


# Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.1.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Building

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

For production run `ng build -prod --base-href study-mc --aot` followed by `npm run precache`


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# UM Access

The live version of this application is currently "bodyless" (without Laravel) due to inability to update the UM server version of PHP and install dependencies for Laravel. The "bodyless" application is located at: `studymc/public/studymc`.

<strong>Dev Environment</strong>: http://dev-apps.phar.umich.edu/study-mc/

`/afs/umich.edu/group/acadaff/pharmacy/devapps/study-mc`

<strong>Production Environment</strong>: https://apps.phar.umich.edu/study-mc/

`/afs/umich.edu/group/acadaff/pharmacy/Private/html/study-mc`


