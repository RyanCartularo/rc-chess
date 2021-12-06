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
            Report
            </h1>
            <h2 class="subititle">
            Approach/Methodology
            </h2>
            
            <p>The Idea behind the website was to creat a simple chess website where two players can 
    compete against each other via the internet.
    <br></br>
    To achieve this I scoured the internet looking for any librarys or frameworks that might make this process
    a little easier.
    <br></br>
    I am very familar with web development so I wasnt to intimidated by making a project this large by myself,
    but I used heavy use of Youtube tutorials and other online resources anytime I struggled to figure out
    what to do next.
    <br></br>
    As far as the methodology I cobbled together the project by attaining little milestones one at a time,
    for example creating the game board, loading in pieces, encorportating a library to handle movement,
    etc... 
    <br></br>
    For a brief account of the major steps of the project it was </p>
    <ol>
        <li>1. Setup the React enviornment and all of the libraries I planned to use (easier said than done) </li>
        <li>2. Create a local chess game</li>
        <li>3. Add Firebase functionality and make the game playable online and add the simple matchmaking/sharing</li>
        <li>4. Style it and add the report</li>
    </ol>
    <br></br>
    <br></br>
    <h2 class="subititle">Tools/Libraries/Frameworks Used</h2>
    <ul>
    <li>Chess.js</li>
    <li>React</li>
    <li>Node.js</li>
    <li>Firebase</li>
    <li>Firestore</li>
    <li>React-DND</li>
    <li>Webpack</li>
    <li>RXFire</li>
    <li>RXJS</li>
    <li>BulmaCSS</li>
    <li>Background Image Created by Jani Kaasinen https://unsplash.com/photos/7VGzV09YnvA</li>
</ul>

<h2>Evaluation</h2>
<p>I am pretty happy with how the app came out. The points where it lets me down is a lack of features
    I would love to encourporate a better matchmaking system, Actual User Account, In Game Point Tracking,
    among other features. That being said I believe that this project goes far beyond the expectations of
    what was assigned, so in that context, I am very satisfied with it.
</p>
<br></br>
<h2>Discussion</h2>
<p>Overall creating this app was a great learning experience for me because I have only finished one other 
    React project (The scale of these projects always gets away from me so I have abandoned several) and
    I learned a lot about how to work with the framework.
    <br></br>
    I also taught myself Bulma CSS for this project because I heard it was a cool CSS framework and I really 
    love how easy it is to make things look really slick with it, but I still do struggle with some of its 
    functionality.
    <br></br>
    One thing that I originally wanted to add was a chat feature, which I was able to build for the most part,
    but it didn't work very well and I struggled with displaying it at the same time as the game, so I cut the
    feature sadly, I believe I have left almost all of the code in an unreachable section of this project in case
    I want to come back to it at a future date.
</p>
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
    <td>Add the Styling</td>
    <td>Make the Webapp look modern and professional</td>
    <td>11/24/21</td>
    </tr>
    <tr>
        <td>Host and Post The App</td>
        <td>launch the page on Firebase and send the code to the Professor</td>
        <td>12/2/21</td>
        </tr>
    </table>
  

    <br></br><br></br>
    <h2>Conculsion</h2>
    <p>In conculsion, I have successfully made RC Chess a fully function webapp where you can play your
        friends in a game of chess, using all of the possible moves and tactics that the game has. Their
        are certainly features I am still working on and would like to add, but the project is a triumphant
        success
    </p>
    <br></br><br></br>
    <h2>Future Work</h2>
    <p>As mentioned a couple of times above, their are a ton of features that I have been trying to add to
        this project including a chat feature, move tracker, point scoring, among many other things that 
        had to be cut for the sake of time for this due date. I will continue to chip away at those.
    </p>
    <br></br><br></br><br></br>
    <h1><a href="https://github.com/RyanCartularo/RC-Chess/blob/main/README.md">Link To GitHub (link to the live webpage in README): </a></h1>

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