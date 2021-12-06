import React, {useState} from "react";
import {auth, db} from './firebase'
import {BrowserRouter, Route, useHistory, Link} from 'react-router-dom'
import { initGame } from "./game";
import logo from "./assets/logo2.png"
import petes from "./assets/janiKaasinen.jpg"




const report =() => (
  <div></div>
)


const routes = (
  <BrowserRouter>
    <div>
      <Route path="/report" component={report} />
    </div>
  </BrowserRouter>
)

export default function Home() {
    const {currentUser} = auth
    const [showModal, setShowModal] = useState(false)
    const history = useHistory()
    const newGameOptions = [
        {label: 'Black pieces', value: 'b'},
        {label: 'White pieces', value: 'w'},
        {label: 'Random', value: 'r'}
    ]

    function handlePlayOnline() {
        setShowModal(true)
    }

    function handlePlayLocal() {
        initGame()
    }

    async function startOnlineGame(startingPiece) {
        const member = {
            uid: currentUser.uid,
            piece: startingPiece === 'r' ? ['b','w'][Math.round(Math.random())] : startingPiece,
            name: localStorage.getItem('userName'),
            creator: true
        }
        const game = {
            status : 'waiting',
            members: [member],
            gameId: `${Math.random().toString(36).substr(2,9)}_${Date.now()}`
        }
        await db.collection('games').doc(game.gameId).set(game)
        history.push(`/game/${game.gameId}`)
    }

    return(
        <>
        <html class="has-navbar-fixed-top" />
        <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
        
    <a class="navbar-item"  >
    <img src={logo} alt="logo" width="120" height="100" />
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
        
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="./">
        Home
      </a>

      <a class="navbar-item" href="./report.html">
        Report
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item" href={"research.html"}>
            Research
          </a>
          <a class="navbar-item" href={"./perfume.html"}>
          About Me
          </a>
          <a class="navbar-item" href={"./contact.html"}>
            Contact
          </a>
          <hr class="navbar-divider" />
          <a class="navbar-item" href= "mailto:ryan.cartularo@gmail.com?subject = Feedback&body = Message" >
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>These Buttons</strong>
          </a>
          <a class="button is-light">
            Do Nothing
          </a>
        </div>
      </div>
    </div>
  </div>
        </nav>

        <section className="hero is-dark is-fullheight-with-navbar has-bg-img" style={{backgroundImage: require('./assets/janiKaasinen.jpg'), backgroundSize: "cover", backgroundBlendMode: "soft-light"}}>
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                  Contact Information
              </h1>
              <h2 class="subititle">
                Email: <a href= "mailto:ryan.cartularo@gmail.com?subject = Feedback&body = Message" >Ryan.Cartularo@gmail.com</a>
                <br></br>
                Linkedin: <a href="https://www.linkedin.com/in/ryan-cartularo/"> Linkedin.com/in/ryan-cartularo </a>
                <br></br>
                Github: <a href="https://github.com/RyanCartularo"> Github.com/RyanCartularo</a>
              </h2>
            </div>
            <div className="column home-columns">
                <button className="button is-primary" onClick={handlePlayOnline}>
                    New Game
                </button>
            </div>
            </div>
        </section>
        <div className={`modal ${showModal ? 'is-active': ''}`}>
            <div className="modal-background"> </div>
            <div className="modal-content">
                <div className="card">
                    <div className="card-content">
                        <div className="content">
                            Please Select The Piece You Want To Start With
                        </div>
                    </div>
                    <footer className="card-footer">
                        {newGameOptions.map(({label, value}) => (
                            <span className="card-footer-item pointer" key={value} 
                                onClick={() => startOnlineGame(value)}>
                                {label}
                            </span>
                         ))}       
                    </footer>
                </div>
            </div>
            <button className="modal-close is-large" onClick={() => setShowModal(false)}></button>
        </div>
        
        </>
    )
}