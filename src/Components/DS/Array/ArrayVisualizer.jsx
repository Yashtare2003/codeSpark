import React, { useState } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import './ArrayVisualizer.css'; // Import custom CSS for styling

const ArrayVisualizer = () => {
  const [input, setInput] = useState('');
  const [array, setArray] = useState([]);
  const [log, setLog] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [valueToInsert, setValueToInsert] = useState('');
  const [indexToDelete, setIndexToDelete] = useState('');
  const [valueToSearch, setValueToSearch] = useState('');
  const [isInserting, setIsInserting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchPath, setSearchPath] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInsertChange = (e) => {
    setValueToInsert(e.target.value);
  };

  const handleIndexChange = (e) => {
    setIndexToDelete(e.target.value);
  };

  const handleSearchChange = (e) => {
    setValueToSearch(e.target.value);
  };

  const handleSetArray = () => {
    const arr = input.split(',').map(Number);
    setArray(arr);
    setLog([]);
    logOperation(`Array set to: [${arr.join(', ')}]`);
  };

  const logOperation = (message) => {
    setLog((prev) => [...prev, message]);
  };

  const handleInsert = () => {
    const index = currentIndex;
    const value = Number(valueToInsert);

    if (index < 0 || index > array.length) {
      toastr.error('Index out of bounds. Please enter a valid index.');
      return;
    }

    setIsInserting(true);
    const newArray = [...array];

    // Animation logic for inserting
    setTimeout(() => {
      newArray.splice(index, 0, value);
      setArray(newArray);
      logOperation(`Inserted ${value} at index ${index}. Current array: [${newArray.join(', ')}]`);
      setIsInserting(false);
    }, 1000);
  };

  const handleDelete = () => {
    const index = Number(indexToDelete);

    if (index < 0 || index >= array.length) {
      toastr.error('Index out of bounds. Please enter a valid index.');
      return;
    }

    setIsDeleting(true);
    const newArray = [...array];

    // Animation logic for deleting
    setTimeout(() => {
      newArray.splice(index, 1);
      setArray(newArray);
      logOperation(`Deleted element at index ${index}. Current array: [${newArray.join(', ')}]`);
      setIsDeleting(false);
    }, 1000);
  };

  const handleSearch = () => {
    const value = Number(valueToSearch);
    const indices = [];
    let found = false;

    setIsSearching(true);
    setSearchPath([]); // Reset search path for new search

    const searchArray = [...array];

    searchArray.forEach((element, index) => {
      setTimeout(() => {
        logOperation(`Comparing with element at index ${index}: ${element}`);
        setSearchPath((prev) => [...prev, index]);

        if (element === value) {
          found = true;
          indices.push(index);
          logOperation(`Found ${value} at index ${index}`);
          toastr.success(`Value ${value} found at index ${index}`);
        }

        if (index === searchArray.length - 1 && !found) {
          logOperation(`Value ${value} not found in the array.`);
          toastr.error(`Value ${value} not found in the array.`);
          setIsSearching(false);
        }

        if (found && index === searchArray.length - 1) {
          logOperation(`Search completed. Value ${value} found at indices: ${indices.join(', ')}`);
          setIsSearching(false);
        }
      }, 1000 * (index + 1));
    });
  };

  return (
    <div>
      <h2>Array Data Structure Visualization</h2>

      <div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter comma-separated numbers"
        />
        <button onClick={handleSetArray}>Set Array</button>
      </div>

      <div>
        <input
          type="number"
          value={currentIndex}
          onChange={(e) => setCurrentIndex(Number(e.target.value))}
          placeholder="Current Index"
        />
      </div>

      <div>
        <input
          type="text"
          value={valueToInsert}
          onChange={handleInsertChange}
          placeholder="Value to Insert"
        />
        <button onClick={handleInsert}>Insert</button>
      </div>

      <div>
        <input
          type="number"
          value={indexToDelete}
          onChange={handleIndexChange}
          placeholder="Index to Delete"
        />
        <button onClick={handleDelete}>Delete</button>
      </div>

      <div>
        <input
          type="text"
          value={valueToSearch}
          onChange={handleSearchChange}
          placeholder="Value to Search"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="array-container">
        {array.map((val, index) => (
          <div
            key={index}
            className={`array-element ${isInserting ? 'inserting' : ''} ${isDeleting ? 'deleting' : ''} ${searchPath.includes(index) ? 'searching' : ''}`}
            style={{
              flex: 1,
              backgroundColor: 'teal',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              margin: '0 2px',
              transition: '0.5s ease',
              position: 'relative',
            }}
          >
            {val}
            <div className="index-label">{index}</div>
          </div>
        ))}
      </div>

      <div className="log-container">
        {log.map((entry, index) => (
          <div key={index}>{entry}</div>
        ))}
      </div>
    </div>
  );
};

export default ArrayVisualizer;
