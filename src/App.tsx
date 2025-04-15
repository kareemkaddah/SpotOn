import './App.css';
import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import RecentPosts from './components/RecentPosts';

function App() {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const handlePost = async () => {
    if (!description || !location) {
      alert('Please fill in both fields');
    }
    try {
      await addDoc(collection(db, 'posts'), {
        description,
        location,
        tiemstamp: Timestamp.now(),
      });
      setDescription('');
      setLocation('');
      alert('post added anonymosulsy!');
    } catch (error) {
      console.error('Error posting:', error);
    }
  };
  return (
    <>
      <div id='main-text'>Welcome to spot on!</div>
      <div className='description-text'>
        Describe the Person you are looking for:
        <textarea
          className='inputBox'
          name='Description'
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className='description-text'>
        Location:
        <input
          className='locationBox'
          name='location'
          type='text'
          onChange={(e) => setLocation(e.target.value)}
        ></input>
      </div>
      <div style={{ display: 'flex' }}>
        <button className='post-botton' onClick={handlePost}>
          Post Anonymosly
        </button>
        <button
          className='delete-botton'
          onClick={() => {
            setDescription('');
            setLocation('');
          }}
        >
          Delete
        </button>
      </div>
      <section style={{ marginTop: '40px' }}>
        <div id='main-text'>Search Spots</div>
        <input className='searchSpots-box'></input>
      </section>

      <section style={{ marginTop: '40px' }}>
        <RecentPosts />
      </section>
    </>
  );
}

export default App;
