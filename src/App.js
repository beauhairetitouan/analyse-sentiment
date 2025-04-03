import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import DatePicker from './components/DatePicker';
import TweetsSection from './components/TweetsSection';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tweets, setTweets] = useState([]);


  const handleDateChange = (e, isStartDate) => {
    if (isStartDate) {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };


  const handleAnalyzeClick = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(`http://localhost:5001/api/twitter/user/${searchQuery}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      const userId = data.data.id;

      const tweetsResponse = await fetch(
        `http://localhost:5001/api/twitter/users/${userId}/tweets?start_date=${startDate}&end_date=${endDate}`
      );
      if (!tweetsResponse.ok) {
        throw new Error('Failed to fetch user tweets');
      }
      const tweetsData = await tweetsResponse.json();
      setTweets(tweetsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={`${process.env.PUBLIC_URL}/logo_tweet.png`} className="logo" alt="logo" />
        <div className="header-container">
          <SearchBar
            searchQuery={searchQuery}
            handleSearchChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="date-container">
            <DatePicker date={startDate} handleDateChange={handleDateChange} isStartDate={true} />
            <DatePicker date={endDate} handleDateChange={handleDateChange} isStartDate={false} />
          </div>
          <button className="analyze-button" onClick={handleAnalyzeClick}>
            Analyser
          </button>
        </div>
      </header>
      <main className="App-main">
        <TweetsSection tweets={tweets} />
      </main>
      <footer className="App-footer">
        <p>© 2025 Titouan BEAUHAIRE</p>
      </footer>
    </div>
  );
}

export default App;
