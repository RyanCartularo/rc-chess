import React, { useRef, useState } from 'react';
import './chat.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAP2FGUgKxgPWhjc2TWAGT4JtuKui8_u00",
    authDomain: "rc-chess-b8749.firebaseapp.com",
    projectId: "rc-chess-b8749",
    storageBucket: "rc-chess-b8749.appspot.com",
    messagingSenderId: "235483096939",
    appId: "1:235483096939:web:f30d00428782cfac7c8e2e",
    measurementId: "G-7QW50V5CW2"
};

function Chat(){

  const [user] = useAuthState(auth)

  return (
    <div className="Chat">
      <header>
        <h1> CHAT </h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }
  return(
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom(){
  const dummy = useRef()
  const messagesRef = db.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, {idField: 'id' })
  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()

    const {uid, photoURL} = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')
    dummy.current.scrollIntoView({behavior: 'smooth'})
  }
  return (<>
  <main>

    {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

    <span ref={dummy}></span>
  </main>

  <form onSubmit={sendMessage}>
    <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Say Hi!" />

    <button type="submit" disabled={!formValue}>🕊️</button>

  </form>
  </>)
}

function ChatMessage(props) {
  const { text,uid,photoURL} = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}

  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore()
  export const auth = firebase.auth()
  export {firebase}
  export default Chat