import React, { useState } from 'react';
import './stack.css';

const Stack = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [falling, setFalling] = useState(false); // State for the falling animation

  const push = () => {
    if (inputValue.trim() === '') {
      setMessage('Please enter a value to push.');
      return;
    }
    const newStack = [...stack, inputValue];
    setStack(newStack);
    setMessage(`Pushed ${inputValue} onto the stack. ${inputValue} is now the top element.`);
    setInputValue('');
  };

  const pop = () => {
    if (stack.length === 0) {
      setMessage('The stack is empty. Nothing to pop.');
      return;
    }

    setFalling(true); // Start the falling animation
    setTimeout(() => {
      const poppedValue = stack[stack.length - 1];
      const newStack = stack.slice(0, -1);
      setStack(newStack);
      setMessage(`Popped ${poppedValue} from the stack. ${newStack[newStack.length - 1] || 'None'} is now the top element.`);
      setFalling(false); // Reset falling state after the animation
    }, 500); // Duration of falling animation
  };

  const peek = () => {
    if (stack.length === 0) {
      setMessage('The stack is empty. No top element.');
      return;
    }
    const topValue = stack[stack.length - 1];
    setMessage(`${topValue} is the top element.`);
  };

  const isEmpty = () => {
    setMessage(stack.length === 0 ? 'The stack is empty.' : 'The stack is not empty.');
  };

  const clear = () => {
    setStack([]);
    setMessage('The stack has been cleared.');
  };

  return (
    <div className="stack_container">
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value to push"
        />
        <button onClick={push}>Push</button>
        <button onClick={pop}>Pop</button>
        <button onClick={peek}>Peek</button>
        <button onClick={isEmpty}>Is Empty?</button>
        <button onClick={clear}>Clear</button>
      </div>
      <div className="message-section">{message}</div>
      <div className="visualization-section">
        <div className="stack">
          {stack.map((value, index) => (
            <div
              key={index}
              className={`stack-element ${index === stack.length - 1 ? 'top-element' : ''} ${falling && index === stack.length - 1 ? 'falling' : ''}`}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stack;
