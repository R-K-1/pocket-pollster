# Pocket Pollster Project

This is an application demonstrating the power and simplicity of the React framework
It enables users to create, answer, and view statistics about polls.


## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── package.json # npm package manager file.
├── package-lock.json # npm package manager file.
├── yarn.lock # yarn package manager file.
├── node_modules
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── index.css # Global styles.
    ├── index.js # You should not need to modify this file. It is used for DOM rendering only.
    ├── logo.svg # React Logo.
    ├── utils # Miscellaneous reusable data and functions
    │   ├── helpers.js # formmatting functions
    │   ├── api.js # middleware between react front end and js back-end 
    │   └── _DATA.js # back-end data and low level code to access it
    ├── reducers # returning application expected state based on intended action
    │   ├── authedUser.js # for states related to user authentication
    │   ├── index.js # wrapper object for easily importing and exporting all reducers
    │   ├── questions.js # for states related to questions
    │   └── users.js # for states related to user accounts
    ├── middleware # providing information and hooks for action between dispatch and persistence
    │   ├── logger.js # logging pre and post action states to the browser dev tool console
    │   └── index.js # wrapper object for easily importing and exporing all middleware
    ├── components # UI and Business logic
    │   ├── App.js # this is the root of the app
    │   ├── AuthedUser.js # for user authentication
    │   ├── AuthedUserBar.js # for authenticated user info displaying in a bar at the top of every route
    │   ├── Leaderboard.js # for user ranking
    │   ├── Nav.js # for navigation bar displayed at the top of every route
    │   ├── NewQuestion.js # for adding a poll
    │   ├── Question.js # for viewing, navigating to and/or answering a question
    │   ├── Questions.js # for listing questions
    │   └── Users.js # for listing users and their stats
    ├── actions # For persisting to the redux store
    │   ├── authedUser.js # for user authentication
    │   ├── questions.js # for questions
    │   ├── questions.js # wrapper for easily importing and exporting all actions
    │   └── users.js # for users
```

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

Do not hesitate to submit a pull request.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
