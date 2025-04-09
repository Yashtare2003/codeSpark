import React, { useState, useEffect } from "react";
import "./insertionsort.css"; // Add your CSS styles
const InsertionSort = () => {
  const [array, setArray] = useState([]);
  const [animations, setAnimations] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const insertionSort = (arr) => {
    const anims = [];
    let n = arr.length;

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;

      // Animation step showing the key being compared
      anims.push({ array: [...arr], comparing: [i], key: key });

      // Move elements that are greater than key to one position ahead
      while (j >= 0 && arr[j] > key) {
        anims.push({ array: [...arr], comparing: [j], swapping: [j, j + 1] });
        arr[j + 1] = arr[j];
        j = j - 1;
      }

      // Insert the key into the correct position
      arr[j + 1] = key;
      anims.push({
        array: [...arr],
        comparing: null,
        swapping: null,
        inserted: i,
      });
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
  
    // Calculate the maximum value in the array to scale the heights
    const maxValue = Math.max(...anim.array);
    const maxHeight = 300; // Set a maximum height for the bars in pixels
    const barPadding = 20; // Padding to ensure bars don't touch the top
  
    anim.array.forEach((value, i) => {
      const bar = document.createElement("div");
      bar.className = "bar";
  
      // Normalize height based on max value
      const barHeight = (value / maxValue) * (maxHeight - barPadding); 
  
      // Apply the calculated height and padding to each bar
      bar.style.height = `${barHeight}px`; // Height based on value
      bar.style.lineHeight = `${barHeight}px`; // Center text vertically
      bar.style.marginTop = `${barPadding}px`; // Add padding from top
      bar.innerText = value; // Display value
  
      // Apply color based on animation step (comparing, swapping, etc.)
      if (anim.comparing && anim.comparing.includes(i)) {
        bar.style.backgroundColor = "red"; // Highlight comparing elements
      } else if (anim.swapping && anim.swapping.includes(i)) {
        bar.style.backgroundColor = "orange"; // Highlight swapping elements
      } else if (anim.inserted === i) {
        bar.style.backgroundColor = "green"; // Mark inserted element as green
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
      logEntry.innerHTML = `<strong>Comparing:</strong> Index ${anim.comparing[0]}`;
    } else if (anim.swapping) {
      logEntry.innerHTML = `<strong>Swapping:</strong> Elements at indices ${anim.swapping[0]} and ${anim.swapping[1]}`;
    } else if (anim.inserted !== null && anim.inserted !== undefined) {
      logEntry.innerHTML = `<strong>Inserted:</strong> Element at index ${anim.inserted}`;
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
      insertionSort([...arr]);
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
    <div className="insertionsort">
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
    </div>
  );
};

export default InsertionSort;