import React, {useState} from "react";
import {auth, db} from './firebase'
import {BrowserRouter, Route, useHistory, Link} from 'react-router-dom'
import { initGame } from "./game";
import logo from "./assets/logo2.png"
import petes from "./assets/janiKaasinen.jpg"

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
            Project Research
            </h1>
            <h2 class="subititle">
            Introduction
            </h2>
            <ul>
<li>What is the website about?</li>
<p>This webapp will be a chess game where two people can play each other online, and possibly chat with each other, I want
to use REACT to make it have a responsive design and Firebase for hosting and online play
</p>
<li>What is it’s purpose (can be more than one)?</li>
<p>For friends to be able to play the excellent game of chess together!</p>
<li>Who is the target audience?</li>
<p>Chess's primary demographic is people between 25 and 34 years old, so they would be my target audience</p>
<li>What does the target audience want from the website?</li>
<p>A discrete place for friends to goof around with chess without it effecting their FIDE rating (like it would on chess.com)</p>
</ul>
<h2>Competitive Research</h2>
<ul>
<li>Are there other websites on your topic?</li>
<p>There a lot of chess websites, chess.com, chess24.com, and Lichess.com are the most popular ones</p>
<li>What are other sites doing? What are they successful at? What are they unsuccessful at?</li>
<p>They have really complicated algorithms that can analyize games to detect errors once the game is complete, which can
very helpful for newer player. The only thing that most are unsccussful with is a somewhat ugly design/layout, but
chess.com is a very slick, pretty website.
</p>
<li>How can your site be better or different than the competitors?</li>
<p>Mine would be different in the presentation of the game itself and offer a more private experience since
I don't plan on incorporating any form of random matchmaking, but rather online games via invite
</p>
</ul>
<h2>Include your Project timeline</h2>
<ul>
<li>The project timeline should be presented in a table format. The timeline should specify the project tasks,
description, person involved in each task, and the expected date to complete each task. </li>
</ul>
<table>
<tr>
<th>Task</th>
<th>Description</th>
<th>Date</th>
</tr>
<tr>
<td>Create The Chess Game</td>
<td>Make a functional two player local chess game</td>
<td>11/10/21</td>
</tr>
<tr>
<td>Add The Online Multiplayer</td>
<td>Make a private matchmaking system (allow two players to play against eachother via the internet)</td>
<td>11/17/21</td>
</tr>
<tr>
<td>Add the Chat Feature</td>
<td>Make a chat feature were people playing against eachother can message one another</td>
<td>11/24/21</td>
</tr>
</table>

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