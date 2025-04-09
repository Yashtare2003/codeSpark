import React, { useState, useEffect } from "react";
import "./selectionsort.css"; // Add your CSS styles

const SelectionSort = () => {
  const [array, setArray] = useState([]);
  const [animations, setAnimations] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const selectionSort = (arr) => {
    const anims = [];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        // Animation step showing the comparison
        anims.push({ array: [...arr], comparing: [minIdx, j], swapping: null });

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      // Swap if needed
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        // Animation step showing the swap
        anims.push({
          array: [...arr],
          comparing: null,
          swapping: [i, minIdx],
        });
      }
    }

    // Final sorted state
    anims.push({
      array: [...arr],
      comparing: null,
      swapping: null,
      done: true,
    });
    setAnimations(anims);
  };

  const visualizeArray = (anim) => {
    const container = document.getElementById("array-container");
    container.innerHTML = "";
    anim.array.forEach((value, i) => {
      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = `${value * 10}px`; // Height based on value
      bar.style.lineHeight = `${value * 10}px`; // Center text vertically
      bar.innerText = value; // Display value

      if (
        anim.comparing &&
        (i === anim.comparing[0] || i === anim.comparing[1])
      ) {
        bar.style.backgroundColor = "red"; // Highlight comparing elements
      } else if (
        anim.swapping &&
        (i === anim.swapping[0] || i === anim.swapping[1])
      ) {
        bar.style.backgroundColor = "green"; // Highlight swapping elements
      } else {
        bar.style.backgroundColor = "#007bff"; // Default color
      }

      if (anim.done) {
        bar.style.backgroundColor = "green"; // Mark sorted elements as green
      }

      container.appendChild(bar);
    });
  };

  const logVariables = (anim) => {
    const logContainer = document.getElementById("log-container");
    const logEntry = document.createElement("div");
    logEntry.className = "log-entry";

    if (anim.comparing) {
      logEntry.innerHTML = `<strong>Comparing:</strong> Elements at indices ${anim.comparing[0]} and ${anim.comparing[1]}`;
    } else if (anim.swapping) {
      logEntry.innerHTML = `<strong>Swapping:</strong> Elements at indices ${anim.swapping[0]} and ${anim.swapping[1]}`;
    } else if (anim.done) {
      logEntry.innerHTML = `<strong>Sorted!</strong>`;
    }

    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
  };

  const startSort = () => {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim()) {
      let arr = userInput.split(",").map(Number);

      if (arr.some(isNaN)) {
        alert("Please enter valid numbers separated by commas.");
        return;
      }

      setArray(arr);
      setAnimations([]);
      setCurrentStep(0);
      selectionSort([...arr]);
      document.getElementById("log-container").innerHTML = ""; // Clear previous logs
    } else {
      alert("Please enter numbers to sort.");
    }
  };

  const nextStep = () => {
    if (currentStep < animations.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  useEffect(() => {
    if (animations.length > 0 && animations[currentStep]) {
      visualizeArray(animations[currentStep]);
      logVariables(animations[currentStep]);
    }
  }, [currentStep, animations]);

  return (
    <div className="container">
      <div className="input-section">
        <input
          type="text"
          id="userInput"
          placeholder="Enter numbers separated by commas"
        />
        <button onClick={startSort}>Start Sorting</button>
      </div>
      <div className="visualization-section">
        <div id="array-container"></div>
        <div id="log-container"></div>
      </div>
      <div className="control-section">
        <button onClick={prevStep} disabled={currentStep === 0}>
          Prev
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep >= animations.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectionSort;
