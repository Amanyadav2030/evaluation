## React-Redux-Meetup-App

#### Problem Statement

Create the following application: Events Page using the boilerplate code provided .

## Submission Instructions [Please note]

## Maximum Marks - 25

- The Submission should not contain spaces, for example /rct-101 folder/eval will not work
- Do not push node_modules and package_lock.json to github

```
 ✅ able to submit the app - 1 mark ( minimum score )
 ✅ Check Initial Redux Store Structure - 2 marks
 ✅ Check if error text is visible if user doesn't exists- 2 marks
 ✅ Check if error text is visible if wrong paswword is entered- 2 marks
 ✅ Check if the get request made and the  store is getting updated after the user logs in with correct credentials - 3 marks
 ✅ Check if current user data gets updated in ths store when the user logs in - 2 marks
 ✅ Check if all events are displayed on dashboard - 2 marks
 ✅ Check if home is accessible only after login - 2 marks
 ✅ Check if the subscribed events are displayed correctly on home page- 2 marks
 ✅ Check if the recommended events are displayed correctly on home page - 2 marks
 ✅ Check if user is able to subscribe to events - 2 marks
 ✅ Check if log out is working -1 mark
 ✅ Check if register is working properly - 2 marks
```

## Installation

- you can use any node version >=14 and <=16
- please make sure you do not push package-lock.json

- Download and unzip the boilerplate file and then copy the "**contents**" of the unzipped file in the Masai Folder.
- Navigate to the Masai Folder, in VS Code.
- Run the following commands inside,
  - `npm install`
  - `npm start`
  - `npm run server` -> to start the json-server
- **_Note_**:

1. Libraries needs to be installed by yourself if not available in package.json
2. Make sure that the json-server is up and running at port 8080
3. Create a .env file. Include `REACT_APP_JSON_SERVER_PORT=8080` in it
4. You need to restart the react server once the env file is updated.
5. Use `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}` as the json-server url wherever you use http://localhost:8080

#### Steps

### Testing Objectives

- Ability to set up a Redux and connect it with your React application
- Ability to use Redux, and Redux-Thunk, for storing and accessing application data, respectively
- Ability to get, and update data, using JSON-server

### Understanding Component Structure

- Components
  - Dashboard
  - Home
  - Login
  - Register
  - EventCard
- Routes
  - All Routes
    - Path: “/”, Page: Dashboard (Public Route)
    - Path: “/login, Page: Login (Public Route)
    - Path: “/home”, Page: Home (Protected Route/Page, accessible after logging in)
    - Path: “/register”, Page: Register (Public Route)

### Redux

- Store
  - AppReducer

**NOTE**: Redux is mandatory for this application

1. Some of the boilerplate is provided. You are expected to write all the other remaining parts (action-creators, reducer file logic, etc) to set up the redux store.
2. Make sure Redux is connected with your React application properly, and you have access to the Redux store data

### JSON Data:

- db.json file is included in the boilerplate zip file, with the initial users and meetups data. **Do not overwrite/modify this data**
- understand the DB structure

### Features to build:

1. The user should be able to fetch the users data from the db.json file (using JSON-server, axios, Redux-thunk)

   - Fetch all user data, and check if the name (input from the user) matches in user data, and then check the password for that user to log in.

2. The data received from API calls should be stored in the Redux store

- Current User's data
- Meetup events data

3. Your initial redux state should look like this (make sure you are following the same naming)
   ```
   userData: {},
   isLoading: false,
   isAuth: false,
   meetupsData: [],
   errorText:null
   ```
4. Update is isLoading ,errorText and isAuth states on relevant states of login.

5. Show all meetup events data on dashboard

6. On the dashboard page there are following buttons:

   a. without Login

   - Show My Events: Clicking this button should redirect the user to /login page
   - Login: Clicking this button should redirect the user to / page
   - Register: Clicking this button should redirect the user to /register home page

   b. With Login

   - Show My Events: Clicking this button should redirect the user to /home page
   - Logout button : Clicking this button should redirect the user to /login page

7. ‘home’ : “Home” is a protected route/component. Make sure that it is accessible only after logging in.

8. Show the following details on home page:

   - go back to dashboard button : Clicking this button should redirect the user to dashboard page
   - Subscribed Events: The user data holds the ids of subscribed events- reconcile them with meetups data, and show only subscribed events from the entire data here
   - Recommended Events: Any event that is not subscribed by the user should be shown here

9. The user should be able to subscribe to events from the recommended events list. When that happens the event should be removed from recommended and shoud be added to subscribed events in real time. All of this should also be updated to your server data. To achieve this, place a PATCH request on "/users" data to alter the details of subscribed events.

### Components Description:

1.  Login page(/login) - should make a GET request to `/users` end point

    - `User does not exists` message should be shown if the username doesn't match with the user in db
    - `Incorrect Password` message shown if the password is wrong.
    - once login with correct credentials redirect the user to `dashboard`("/" route) page
      ![](https://i.imgur.com/AwlQoCI.png)
      ![](https://i.imgur.com/7nwiBRI.png)

2.  Dashboard page (/)

    - Onload Should make a GET request to `/meetups` end point and display the meetup details
    - on clicking the `Show My Events` button redirect to `Home` page if logged in else redirect user to `login` page
    - on clicking logout button manage the state of `isAuth` in store and redirect to login page

    look at the navbar without login
    ![](https://i.imgur.com/Gtum3n4.png)

    Dashboard page and navbar with login
    ![](https://i.imgur.com/jDwybuk.png)

3.  Home Page (/home)

- If user logged in this page should display subscribed events and recommended events
- Subscribed events should be displayed based on user's data ( whatever events he is subscribed to )
- Recommended events should be displayed (all the events that the user is not subscribed to)
- On clicking the subscribe event button user should be able to make PATCH request to /users/id and send the subscribed event's id (please note subscribed is an array of all subscribed event ids)
- user can subscribe to more than one event.

![](https://i.imgur.com/Oj3RLK1.png)

4.  Register Page (/register)
    - When user clicks on submit a POST request to '/users" endpoint should be placed.
    - it should have the following fields
    - name
    - location
    - interests (strings separated by commas)
    - password

![](https://i.imgur.com/MgnoK6Q.png)

### General Instructions:

- Do not remove `data-testid=’xxx’` from anywhere inside the code. They are the test inputs, removing them, may lead to low scores.
- Do not change the current folder structure, and names of components provided.
- Only use the data present in the db.json file, and do not modify the data in the json file.

#### General guidelines

- The system on cp.masaischool.com may take between 1-20 minutes for responding,
- so we request you to read the problem carefully and debug before itself
- we also request you not to just submit it last minute
- try to keep one submission at a time
