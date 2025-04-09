import React, { useState } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const MergeSort = () => {
  const [input, setInput] = useState('');
  const [array, setArray] = useState([]);
  const [log, setLog] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSortInput = () => {
    const arr = input.split(',').map(Number);
    setArray(arr);
    setLog([]);
    setCurrentStep(0);
    setSteps([]);
    createSteps(arr);
  };

  const createSteps = (arr) => {
    const stepsArr = [];
    mergeSort(arr, stepsArr);
    setSteps(stepsArr);
  };

  const mergeSort = (arr, stepsArr) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), stepsArr);
    const right = mergeSort(arr.slice(mid), stepsArr);
    const merged = merge(left, right, stepsArr);

    // Log the merge process
    stepsArr.push({
      left,
      right,
      merged,
    });

    return merged;
  };

  const merge = (left, right, stepsArr) => {
    const merged = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        merged.push(left[i]);
        i++;
      } else {
        merged.push(right[j]);
        j++;
      }
    }

    while (i < left.length) {
      merged.push(left[i]);
      i++;
    }

    while (j < right.length) {
      merged.push(right[j]);
      j++;
    }

    // Log the merge process
    stepsArr.push({
      left,
      right,
      merged,
    });

    return merged;
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      const { left, right, merged } = steps[currentStep + 1];
      setLog((prev) => [
        ...prev,
        `Left: [${left.join(', ')}] | Right: [${right.join(', ')}] | Merged: [${merged.join(', ')}]`,
      ]);
    } else {
      toastr.info('Reached the end of the sort.');
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      const { left, right, merged } = steps[currentStep - 1];
      setLog((prev) => [
        ...prev,
        `Left: [${left.join(', ')}] | Right: [${right.join(', ')}] | Merged: [${merged.join(', ')}]`,
      ]);
      setCurrentStep(currentStep - 1);
    } else {
      toastr.error('Already at the first step.');
    }
  };

  return (
    <div>
      <h2>Merge Sort Visualization</h2>

      <div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter comma-separated numbers"
        />
        <button onClick={handleSortInput}>Set Array</button>
      </div>

      <div>
        <button onClick={handleNextStep}>Next Step</button>
        <button onClick={handlePrevStep}>Previous Step</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {steps.length > 0 &&
          steps[currentStep] && (
            <div style={{ display: 'flex' }}>
              {steps[currentStep].merged.map((val, index) => (
                <div
                  key={index}
                  style={{
                    height: `${val * 10}px`,
                    width: '30px',
                    margin: '0 5px',
                    backgroundColor: 'teal',
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
          )}
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
        {log.map((entry, index) => (
          <div key={index}>{entry}</div>
        ))}
      </div>
    </div>
  );
};

export default MergeSort;
