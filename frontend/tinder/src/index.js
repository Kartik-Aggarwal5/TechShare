import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Match from './Match.js';
import MatchesPage from './MatchesPage.js';
import HomePage from './HomePage.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//props for MatchesPage/HomePage are an object with info for current logged in user 

const user_profile = {
  username: "Kartikkk",
  realname: "Kartik the Man",
  email: "kartiktheman5@gmail.com",
  likes: ["Angelthegod", "NatPent", "VukP", "AdiP", "MatM"],
  dislikes: [""],
  matches: ["Angelthegod", "NatPent", "VukP", "AdiP", "MatM"],
  profilepic: "",
  skills: ["Ninjitsu", "gourmet cooking"],
  skills_to_learn: ["React", "kickboxing", "chess"]
};

ReactDOM.render(
  <Router>
    <Switch>
      <Route username = {user_profile[username]} matches = {user_profile[matches]} path = "/MatchesPage">
        <MatchesPage />
      </Route>
      <Route username = {user_profile[username]} skills = {user_profile[skills]} skills_to_learn = {user_profile[skills_to_learn]} email = {user_profile[email]} path = "/HomePage">
        <HomePage />
      </Route>
    </Switch>
  </Router>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
