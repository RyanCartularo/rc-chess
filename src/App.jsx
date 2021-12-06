import React from "react";
import './App.css'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './Home'
import UserForm from './UserForm'
import GameApp from "./GameApp";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import Report from './Test.jsx'
import Research from './research.jsx'
import About from './About.jsx'
import Contact from './contact.jsx'

export default function App() {
    const [user, loading, error] = useAuthState(auth)
    if(loading){
        return 'loading ...'
    }
    if(error){
        return 'Sorry, Authentication Error'
    }
    if(!user){
        return <UserForm />
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home></Home>
                </Route>
                <Route path="/game/:id">
                    <GameApp />
                </Route>
                <Route path="/report.html">
                    <Report />
                </Route>
                <Route path="/research.html">
                    <Research />
                </Route>
                <Route path="/perfume.html">
                    <About />
                </Route>
                <Route path="/contact.html">
                    <Contact />
                </Route>
            </Switch>
        </Router>
    )
}