import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

  const [newUser, setNewUser]=useState(false);
  const [user, setUser]=useState({
      isSignedIn:false,
      name:'',
      email:'',
    })


    
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

    const handleSignIn=()=> {
      var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((res=>{
          const {displayName,email}=res.user;
          const signedInUser={
            isSignedIn:true,
            name:displayName,
            email:email
          }
          setUser(signedInUser);
        }))
    }
    
    const handleSignOut=()=>{
      firebase.auth().signOut()
      .then(res=>{
        const signedOutUser={
          isSignedIn:false,
          name:'',
          email:'',
          error:'',
          success:false
        }
        setUser(signedOutUser);
      })
    }

    const handleBlur=(e)=>{
      if(e.target.name==='email'){
        const isEmailValid=/\S+@\S+\.\S+/.test(e.target.value);
      }
      if(e.target.name==='password'){
        const isPasswordValid=e.target.value.length >6;
        const passwordHasNumber=/^(?=.*?[0-9])(?=.*?[a-zA-Z]).{3,30}$/.test(e.target.value);
      }

    }
     
    const handleSubmit=(e)=>{
      if (newUser && user.email && user.password){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then (res=>{
          const newUserInfo={...user};
          newUserInfo.error='';
          newUserInfo.success=true;
          setUser(newUserInfo);
        })
        // .catch (error=>{
          // if (!newUser && user.email && user.password){
            // firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            // .then (res=>{
              // const newUserInfo={...user};
              // newUserInfo.error='';
              // newUserInfo.success=false;
            //   setUser(newUserInfo);
            // })         

        // e.preventDefault();
      }
    }
  


    
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email} 
            setLoggedInUser(signedInUser);
            history.replace(from);
            // ...
          }).catch(function(error) {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
    }
    const handleGitSignIn = () => {
        var gitProvider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(gitProvider).then(function(result) {
            const {displayName, email} = result.user;
            const signedInUserGit = {name: displayName, email} 
            setLoggedInUser(signedInUserGit);
            console.log(loggedInUser);
            history.replace(from);
            // ...
          }).catch(function(error) {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
    }

    return (
        <div className="login">
          <h1>Login Here</h1>
          <div>
            <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""/>
            <label htmlFor="newUser">New User Sign up</label>
            <form action="" onSubmit={handleSubmit} >
              {newUser && <input type="text" name="name" id="" placeholder="Enter Your Name Here " onChange={handleBlur} required />}
              <br/>
              <input type="text" name="email" id="" placeholder="Enter Your Email Here " onChange={handleBlur} required />
              <br/>
              <input type="password" name="password" id="" placeholder="Enter Your Password Here " onChange={handleBlur} required />
              <br/>
             {
               user.isSignedIn? <input type="submit" onClick={handleSignOut } value="Sign Out"/> :
               <input type="submit" onClick={handleSignIn } value="Sign In"/>
             } 
             {
               user.isSignedIn && <p>Welcome, {user.name}</p>
             }
            </form>
            <br/>
            <p style={{color:'red'}} >{user.error}</p> 
            {
              user.success && <p style={{color:'green'}}> User {newUser ? 'created' : 'loggedIn'} successfully</p>
            }
            <p>Or different Option Below</p> 
          </div>
          <div className="container">      
          
            <button onClick={handleGoogleSignIn}>Google Sign in</button>
            <br/>
            <button onClick={handleGitSignIn}>Github Sign in</button>
          </div>
            
        </div>
    );
};

export default Login;