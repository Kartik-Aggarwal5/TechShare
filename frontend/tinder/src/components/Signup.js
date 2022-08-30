import './Createuser.css';
import { useState } from 'react';
// import { createUserWithEmailAndPassword, 
//     onAuthStateChanged
//  } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
const url = "http://localhost:3030/auth/" 


function Createuser() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPw, setRegisterPw] = useState("");
//     // let navigate = useNavigate();

//     // const [user, setUser] = useState({});

//     // // onAuthStateChanged(auth, (currentUser) => {
//     // //     setUser(currentUser);
//     // // })

//     const register = async () => {
//         try {
//             // const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPw);
//             // navigate("/")
//         } catch (error) {
//             console.log(error.message);
//         }
//     }




    return (

    <body className = "CreateuserBackground">
        <div className="centerInfoDiv">
            <div className="contents">
                <div className="logo">
                    Kindling
                </div>
                <div className = "createAccount">Create account</div>
                <div className = "usernameAndPassword">
                    <div className="emailField">
                        <div className="usernameTitle">
                            Email Address
                            <input className="emailInput" type="text" placeholder="Email" onChange={(e) => setRegisterEmail(e.target.value)}/>
                        </div>

                        <div className = "userLogo">
                        </div>
                        <div className="underlineText1">
                        </div>
                    </div>

                    <div className="passwordField">
                        <div className="passwordTitle">
                            Password
                            <input className="passwordInput" type="password" placeholder="Password" onChange={(e) => setRegisterPw(e.target.value)}/>
                        </div>
                            <div className="underlineText2">
                            </div>
                            <button>Submit</button>
                    </div>
                </div>
            </div>
            <div className = "userSkills"></div>
            <div className = "skills_to_learn">
            </div>
            <div className = "contactInfo">
            </div>
        </div>
    </body>
    )
};


export default Createuser;