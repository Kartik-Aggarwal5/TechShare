import { process_params } from 'express/lib/router';
import React, { useState } from 'react';
import Match from './Match.js';
import axios from 'axios';

//props contains the User's information, but we only really need their matches' usernames for this component 

const MatchesPage = (props) => {
    const [matchData, setMatchData] = useState({});
    let match_objects = [];
    for (var i = 0; i < props.matches.length; i++) {
        axios.get("mongodb://127.0.0.1:27017/tinder2.0/users/" + props.matches[i])
        .then(res => setMatchData(res));
        match_objects.push(matchData);
    }

    return (
        <div>
            {match_objects.length !== 0 ? match_objects.map(el => {
                return (
                    <Match username = {el.username} skills = {el.skills} skills_to_learn = {el.skills_to_learn} email = {el.email} />
                )
            }) : []};
        </div>
    )
};

export default MatchesPage;

