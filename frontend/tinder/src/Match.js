import React, { useState } from 'react';
import './components/Match.css';

//props contains User data for the match 
const Match = (props) => {
    return (
            //name of match, skills they offer, skills they are looking for, and email
        <div className = "matchBox">
            <h1 className = "username">{props.username}</h1>
            <div className = "titleText">Skills:</div>
            <div className = "userSkills">
                {props.skills.length !== 0 ? props.skills.map(el => {
                    return (
                        <div className = "skill">
                            {el}
                        </div>
                    )
                }) : []}
            </div>
            <div className = "userSkills">Wants to Learn:</div>
            <div className = "skills_to_learn">
                {props.skills_to_learn.length !== 0 ? props.skills_to_learn.map(el => {
                    return (
                        <div className = "skill">
                            {el}
                        </div>
                    )
                }) : []}
            </div>
            <div className = "contactInfo">
                {props.email}
            </div>
        </div>
    )
};

export default Match;