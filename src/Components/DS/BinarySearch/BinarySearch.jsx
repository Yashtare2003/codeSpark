import React, { useState } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const BinarySearch = () => {
  const [input, setInput] = useState('');
  const [array, setArray] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [log, setLog] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [foundIndices, setFoundIndices] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [found, setFound] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSortInput = () => {
    let arr = input.split(',').map(Number);
    const isSorted = arr.every((val, i, arr) => i === 0 || arr[i - 1] <= val);

    if (!isSorted) {
      toastr.warning('Array must be sorted for binary search. Sorting the array automatically.');
      arr = arr.sort((a, b) => a - b);
    }

    setArray(arr);
    setSorted(true);
    setFoundIndices([]);
    setCurrentStep(0);
    setLog([]);
    setFound(false);
    createSteps(arr, parseInt(searchValue, 10));
  };

  const createSteps = (arr, val) => {
    let l = 0;
    let r = arr.length - 1;
    let stepsArr = [];
    let logArr = [];

    while (l <= r) {
      let m = Math.floor((l + r) / 2);
      logArr.push(`Comparing mid element at index ${m} with value ${val}.`);
      stepsArr.push({ left: l, right: r, mid: m, found: false });

      if (arr[m] === val) {
        logArr.push(`Value found at index ${m}.`);
        setFoundIndices((prevIndices) => [...prevIndices, m]);
        stepsArr.push({ left: l, right: r, mid: m, found: true });
        break;
      } else if (arr[m] < val) {
        logArr.push(`Moving right, new left is ${m + 1}.`);
        l = m + 1;
      } else {
        logArr.push(`Moving left, new right is ${m - 1}.`);
        r = m - 1;
      }
    }

    if (l > r) {
      logArr.push(`Value ${val} not found.`);
      stepsArr.push({ left: null, right: null, mid: null, found: false });
    }

    setSteps(stepsArr);
    setLog(logArr);
  };

  const handleNextStep = () => {
    if (!sorted || !steps.length) {
      toastr.error('Please sort the array and set the search value.');
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (steps[currentStep].found) {
      toastr.success(`Value found at index: ${steps[currentStep].mid}`);
    } else {
      toastr.error('Reached the end of the search, value not found.');
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      toastr.error('Already at the first step.');
    }
  };

  return (
    <div>
      <h2>Binary Search Visualization</h2>

      <div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter comma-separated numbers"
        />
        <button onClick={handleSortInput}>Sort & Set Array</button>
      </div>

      <div>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchValueChange}
          placeholder="Enter value to search"
        />
        <button onClick={handleNextStep}>Next Step</button>
        <button onClick={handlePrevStep}>Previous Step</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {array.map((val, index) => (
          <div
            key={index}
            style={{
              height: `${val * 10}px`,
              width: '30px',
              margin: '0 5px',
              backgroundColor:
                currentStep >= 0 &&
                currentStep < steps.length &&
                steps[currentStep].mid === index
                  ? 'crimson'
                  : currentStep >= 0 &&
                    currentStep < steps.length &&
                    (steps[currentStep].left === index || steps[currentStep].right === index)
                  ? 'orange'
                  : 'teal',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            {val}
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '20px',
          maxHeight: '200px',
          overflowY: 'auto',
          backgroundColor: '#f9f9f9',
          padding: '10px',
          border: '1px solid #ddd',
        }}
      >
        {log.slice(0, currentStep + 1).map((entry, index) => (
          <div key={index}>{entry}</div>
        ))}
      </div>
    </div>
  );
};

export default BinarySearch;
