import { useState, useEffect } from 'react';
import RandomItem from './components/randomItem';
import BanList from './components/banList';
import History from './components/history';
import './index.css';  // Importing the CSS file

function App() {
  const [randomItem, setRandomItem] = useState(null);  // For storing the current random item
  const [banList, setBanList] = useState([]);          // List of banned attributes
  const [history, setHistory] = useState([]);          // Session history of viewed items

  // Fetch random item from the correct API
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=live_4L450YR75W3BYo7Idc68Yq9vzXNi4Qf3dyHOz2GxvIoptKBqZUiEwy6lRb4MNOdt');
      const data = await response.json();

      // Log the full response to ensure breed information is included
      console.log(data);

      // If no breeds data, fetch another image
      if (!data[0]?.breeds?.length) {
        fetchData();  // Fetch another one if breed is missing
        return;
      }

      const breedName = data[0].breeds[0].name;

      if (!banList.includes(breedName)) {
        setRandomItem(data[0]);
        setHistory((prevHistory) => [...prevHistory, data[0]]);
      } else {
        fetchData();  // Fetch another if breed is banned
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to add or remove an attribute from the ban list
  const toggleBanList = (attribute) => {
    setBanList((prevBanList) => {
      if (prevBanList.includes(attribute)) {
        // Remove the item from the ban list
        return prevBanList.filter((item) => item !== attribute);
      } else {
        // Add the item to the ban list
        return [...prevBanList, attribute];
      }
    });
  };

  useEffect(() => {
    fetchData();  // Fetch data on component mount
  }, []);

  return (
    <div className="App">
      <div className="history-section">
        <h2>Who have we seen so far?</h2>
        <History history={history} />
      </div>

      <div className="discover-section">
        <h1>Trippin' on Cats</h1>
        <p>Discover cats from your wildest dreams!</p>
        {randomItem && <RandomItem item={randomItem} addToBanList={toggleBanList} />}
        <button onClick={fetchData}>Discover!</button>
      </div>

      <div className="ban-list-section">
        <h2>Ban List</h2>
        <BanList banList={banList} removeFromBanList={toggleBanList} />
      </div>
    </div>
  );
}

export default App;
