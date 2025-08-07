# React Step Application with Redux

This is a React application with a multi-step form that includes user registration and login functionality using Redux for state management.

## Features

### User Registration
- Users can register with a username and password
- Duplicate username validation
- Password confirmation validation
- Success message on successful registration

### User Login
- Login validation against registered users
- Only allows login with registered credentials
- Error messages for invalid credentials
- Success message on successful login

### Redux State Management
- Centralized state management using Redux Toolkit
- User registration and login actions
- Persistent user data during session
- Logout functionality

## Redux Implementation

### Store (`src/store.js`)
- Configured Redux store with user reducer
- Uses Redux Toolkit for simplified setup

### Slice (`src/slice.js`)
- User management slice with actions:
  - `addUser`: Register new users
  - `loginUser`: Validate and login users
  - `logoutUser`: Clear login state
  - `clearUsers`: Reset all user data
  - `clearLoginError`: Clear login error messages

### State Structure
```javascript
{
  users: {
    registeredUsers: [], // Array of registered users
    isLoggedIn: false,   // Login status
    currentUser: null,   // Currently logged in user
    loginError: null     // Login error messages
  }
}
```

## Components

### Stepper (`src/Components/Stepper/Stepper.jsx`)
- Main navigation component
- Uses Redux to access registered users
- Manages step navigation

### UserForm (`src/Components/UserForm/UserForm.jsx`)
- Registration form component
- Uses Redux to add new users
- Validates duplicate usernames

### Login (`src/Components/Login/Login.jsx`)
- Login form component
- Uses Redux for login validation
- Shows appropriate error/success messages

### Success (`src/Components/Success/Success.jsx`)
- Success page with user information
- Logout functionality
- Displays current user details

## How to Use

1. **Register**: Fill out the registration form with username and password
2. **Login**: Use the registered credentials to login
3. **Navigate**: Complete the remaining steps in the application
4. **Logout**: Use the logout button on the success page

## Dependencies

- React 19.0.0
- Redux Toolkit (@reduxjs/toolkit)
- React Redux (react-redux)
- Ant Design (antd)
- React Router DOM (react-router-dom)

## Installation

```bash
npm install
npm start
```

The application will run on `http://localhost:3000`
