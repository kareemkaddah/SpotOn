import './App.css';
import { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import RecentPosts from './components/RecentPosts';
import darkMode from './assets/darkMode.svg';

function App() {
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const [activity, setActivity] = useState('');
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
        activity,
        timestamp: Timestamp.now(),
      });
      setActivity('');
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
        <button
          className='darkMode'
          id='toggle-theme'
          style={{ border: 'none' }}
        >
          <img
            src={darkMode}
            alt='Dark Mode'
            style={{ width: '40px', height: '40px' }}
          ></img>
        </button>
      </div>
      <RecentPosts />
      <div className='description-text'>
        <p style={{ marginLeft: '55px' }}>
          {' '}
          Describe the Person you are looking for:
        </p>
        <div>
          <select
            className='gender-box'
            id='gender'
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value='' disabled>
              Spotted Gender
            </option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <div>
          <select
            className='gender-box'
            id='activity'
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          >
            <option value='' disabled>
              Activity
            </option>
            <option value='Car'>Car</option>
            <option value='Train'>Train</option>
            <option value='Walking'>Walking</option>
            <option value='Other'>Other</option>
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
            setActivity('');
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
