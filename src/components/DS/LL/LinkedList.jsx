import React, { useState } from 'react';
import './LinkedList.css';

const LinkedList = () => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');
  const [log, setLog] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const addNode = () => {
    const newNode = { value: parseInt(value, 10), next: null };
    if (list.length === 0) {
      setList([newNode]);
      setLog([{ step: `Head initialized with value ${value}` }]);
    } else {
      const newList = [...list];
      newList[newList.length - 1].next = newNode;
      setList([...newList, newNode]);
      setLog([...log, { step: `Added node with value ${value} to the end of the list` }]);
    }
    setValue('');
  };

  const deleteNode = () => {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      alert('Please enter a valid number');
      return;
    }
    let current = list[0];
    let prev = null;
    let index = 0;
    let steps = [];

    while (current !== null) {
      steps.push(`Step ${index + 1}: Comparing node value ${current.value} with ${val}`);
      if (current.value === val) {
        if (prev === null) {
          steps.push(`Node with value ${val} found at head. Updating head.`);
          setList(list.slice(1));
        } else {
          steps.push(`Node with value ${val} found. Removing it and updating links.`);
          prev.next = current.next;
          setList([...list.slice(0, index), ...list.slice(index + 1)]);
        }
        setLog([...log, ...steps, { step: `Node with value ${val} removed from the list.` }]);
        setValue('');
        return;
      }
      prev = current;
      current = current.next;
      index++;
    }
    setLog([...log, ...steps, { step: `Node with value ${val} not found in the list.` }]);
  };

  const searchNode = () => {
    const val = parseInt(searchValue, 10);
    if (isNaN(val)) {
      alert('Please enter a valid number to search');
      return;
    }
    let current = list[0];
    let index = 0;
    let steps = [];

    while (current !== null) {
      steps.push(`Step ${index + 1}: Comparing node value ${current.value} with ${val}`);
      if (current.value === val) {
        steps.push(`Node with value ${val} found at index ${index}.`);
        setLog([...log, ...steps]);
        setSearchValue('');
        return;
      }
      current = current.next;
      index++;
    }
    steps.push(`Node with value ${val} not found in the list.`);
    setLog([...log, ...steps]);
  };

  return (
    <div className="container">
      <h2>Singly Linked List</h2>
      <div className="input-section">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
        <button onClick={addNode}>Add Node</button>
        <button onClick={deleteNode}>Delete Node</button>
      </div>
      <div className="input-section">
        <input
          type="number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Enter value to search"
        />
        <button onClick={searchNode}>Search Node</button>
      </div>
      <div className="list-container">
        {list.map((node, index) => (
          <div className="node" key={index}>
            {node.value}
            {node.next && <span className="arrow">→</span>}
          </div>
        ))}
      </div>
      <div className="log-container">
        {log.map((entry, index) => (
          <div className="log-entry" key={index}>
            {entry.step}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkedList;
