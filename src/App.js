import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import DatePicker from './components/DatePicker';
import TweetsSection from './components/TweetsSection';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <img src={`${process.env.PUBLIC_URL}/logo_tweet.png`} className="logo" alt="logo" />
        <div className="header-container">
          <SearchBar searchQuery={searchQuery} handleSearchChange={(e) => setSearchQuery(e.target.value)} />
          <div className="date-container">
            <DatePicker date={startDate} handleDateChange={setStartDate} isStartDate={true} />
            <DatePicker date={endDate} handleDateChange={setEndDate} isStartDate={false} />
          </div>
          <button className="analyze-button">Analyser</button>
        </div>
      </header>
      <main className="App-main">
        <TweetsSection />
      </main>
      <footer className="App-footer">
        <p>© 2025 Titouan BEAUHAIRE</p>
      </footer>
    </div>
  );
}

export default App;