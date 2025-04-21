import './App.css';
import { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import RecentPosts from './components/RecentPosts';

function App() {
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  // const [darkmode, setDarkmode] = useState(false);
  const handlePost = async () => {
    if (!description || !location) {
      alert('Please fill in both fields');
      return;
    }
    try {
      await addDoc(collection(db, 'posts'), {
        description,
        location,
        gender,
        timestamp: Timestamp.now(),
      });

      setDescription('');
      setGender('');
      setLocation('');
      alert('post added anonymosulsy!');
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  useEffect(() => {
    const toggleBtn = document.getElementById('toggle-theme');
    const toggleTheme = () => {
      document.body.classList.toggle('dark-mode');
    };

    toggleBtn?.addEventListener('click', toggleTheme);

    // Clean up event listener when component unmounts
    return () => {
      toggleBtn?.removeEventListener('click', toggleTheme);
    };
  }, []);
  return (
    <>
      <div id='main-text'>
        <p style={{ fontSize: '42px', marginLeft: '-10px' }}>Spotted</p>
        <button id='toggle-theme'>Toggle dark Mode</button>
      </div>
      <RecentPosts />
      <div className='description-text'>
        <p style={{ marginLeft: '55px' }}>
          {' '}
          Describe the Person you are looking for:
        </p>
        <div>
          <select
            id='gender'
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value='' disabled>
              Select Gender
            </option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
        </div>
        <textarea
          className='inputBox'
          name='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className='description-text'>
        Location:
        <input
          className='locationBox'
          name='location'
          type='text'
          value={location}
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
            setGender('');
          }}
        >
          Delete
        </button>
      </div>
      <section style={{ marginTop: '40px' }}>
        <div id='main-text'>Search Spots</div>
        <input className='searchSpots-box'></input>
      </section>

      <section style={{ marginTop: '40px' }}></section>
    </>
  );
}

export default App;
