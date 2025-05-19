import './App.css';

import { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import RecentPosts from './components/RecentPosts';
import { City } from 'country-state-city';
import darkMode from './assets/darkMode.svg';

function App() {
  const cities = City.getCitiesOfState('DE', 'NW');
  const [location, setLocation] = useState('');
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const [activity, setActivity] = useState('');

  // const [darkmode, setDarkmode] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setLocation(input);
    if (input.length > 0) {
      const suggestions = cities
        .map((city) => city.name)
        .filter((name) => name.toLowerCase().startsWith(input.toLowerCase()))
        .slice(0, 10);
      setFilteredCities(suggestions);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };
  const handleSelectCity = (city: string) => {
    setLocation(city);
    setShowDropdown(false);
  };
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
          <div className='activity-options'>
            {['Car🚗', 'Train🚋', 'Walking🚶‍♀️', 'Airplane✈️', 'Other'].map(
              (option) => (
                <div
                  key={option}
                  className={`activity-box ${
                    activity === option ? 'selected' : ''
                  }`}
                  onClick={() => setActivity(option)}
                >
                  {option}
                </div>
              )
            )}
          </div>
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
          onChange={handleInputChange}
        ></input>
        {showDropdown && (
          <ul
            className='dropdown'
            style={{
              listStyle: 'none',
              margin: 0,
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: 'white',
              position: 'absolute',
              top: '45px', // adjust based on your input height
              left: 0,
              width: '100%',
              zIndex: 1000,
            }}
          >
            {filteredCities.map((city, idx) => (
              <li
                key={idx}
                onClick={() => handleSelectCity(city)}
                style={{ padding: '5px', cursor: 'pointer' }}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
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
