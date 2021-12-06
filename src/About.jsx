import React, {useState} from "react";
import {auth, db} from './firebase'
import {BrowserRouter, Route, useHistory, Link} from 'react-router-dom'
import { initGame } from "./game";
import logo from "./assets/logo2.png"
import iAmKing from "./assets/Ryan.jfif"

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
            About Me
            </h1>
            <h2 class="subititle">
            Ryan Cartularo
            </h2>
            <img src={iAmKing} alt="logo" width="300" height="300" />
            <br></br><br></br>
            <h2 class="subititle">
            I am a senior at Fitchburg State University majoring in Computer Science and Minoring in Mathematics. 
            </h2>
            <br></br>
            <h2 class="subititle">
            I created this Web App as both an assignment for my Web Programming class as well as a portfolio piece. 
            </h2>
            <br></br>
            <h2 class="subititle">
            As a chess player it has always been a fantasy of mine to create my own chess website, I hope everyone enjoys it!
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
                          Please Select The Piece You Want To Start
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