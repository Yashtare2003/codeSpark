// src/BubbleSortVisualizer.js
import React, { useState } from 'react';
import './BubbleSortVisualizer.css';

const BubbleSortVisualizer = () => {
  const [values, setValues] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightIndexes, setHighlightIndexes] = useState([-1, -1]); // For highlighting
  const [currentArray, setCurrentArray] = useState([]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    const valueArray = input.split(',')
      .map(num => parseInt(num.trim(), 10))
      .filter(num => !isNaN(num));
    setValues(valueArray);
    setSteps([]); // Clear steps on new input
    setCurrentStep(0); // Reset current step
    setHighlightIndexes([-1, -1]); // Reset highlight
    setCurrentArray(valueArray); // Set initial array
  };

  const bubbleSort = () => {
    const newSteps = [];
    const arr = [...values]; // Copy the original array

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        // Prepare for highlighting and logging
        newSteps.push({
          action: `Comparing ${arr[j]} and ${arr[j + 1]}`,
          array: [...arr],
          highlight: [j, j + 1], // Indexes to highlight
        });

        // Only swap if needed
        if (arr[j] > arr[j + 1]) {
          // Swap the elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          newSteps.push({
            action: `Swapping ${arr[j]} and ${arr[j + 1]}`,
            array: [...arr],
            highlight: [j, j + 1], // Highlight after swap
          });
        }
      }
    }

    newSteps.push({
      action: `Final Sorted Array: ${arr.join(', ')}`,
      array: [...arr],
      highlight: [] // No highlights at the end
    });

    setSteps(newSteps);
    setCurrentStep(0); // Reset to first step after sorting
    setHighlightIndexes([-1, -1]); // Reset highlight
    setCurrentArray(values); // Reset the current array to the initial values
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setHighlightIndexes(steps[currentStep + 1].highlight); // Highlight the current step
      setCurrentArray(steps[currentStep + 1].array); // Update current array to reflect step
    }
  };

  return (
    <div className="bubble-sort-container">
      <h2>Bubble Sort Visualization</h2>
      <input
        type="text"
        placeholder="Enter numbers separated by commas"
        onChange={handleInputChange}
      />
      <button onClick={bubbleSort} disabled={values.length === 0}>Sort</button>

      <div className="bar-container">
        {currentArray.map((value, index) => (
          <div
            key={index}
            className="bar"
            style={{
              height: `${value * 10}px`,
              backgroundColor: highlightIndexes.includes(index) ? 'orange' : 'lightblue', // Highlight if index matches
            }}
          >
            {value}
          </div>
        ))}
      </div>

      <div className="steps-container">
        {steps.length > 0 && (
          <>
            <div className="step">
              {steps[currentStep].action}
            </div>
            <div className="step">
              Current Array: {steps[currentStep].array.join(', ')}
            </div>
          </>
        )}
      </div>

      <div className="navigation">
        <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>Previous</button>
        <button onClick={nextStep} disabled={currentStep === steps.length - 1}>Next</button>
      </div>
    </div>
  );
};

export default BubbleSortVisualizer;
