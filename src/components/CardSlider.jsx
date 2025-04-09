import React, { useEffect } from 'react';
import './CardSlider.css';
import sll from "../assets/images/sll.png";
import dll from "../assets/images/dll.png";
import stack from "../assets/images/stack.png";
import queue from "../assets/images/queue.png";
import tree from "../assets/images/tree.png";
import graph from "../assets/images/graph.png";
import hashTable from "../assets/images/hashTable.png";
import heap from "../assets/images/heap.png";
import trie from "../assets/images/trie.png";
import segmentTree from "../assets/images/segmentTree.jpg";
import redBlackTree from "../assets/images/redBlackTree.png";
import avlTree from "../assets/images/avlTree.png";
import priorityQueue from "../assets/images/priorityQueue.jpg";

const CardSlider = () => {
  useEffect(() => {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slideCount = document.querySelectorAll('.slider-item').length;
    let currentIndex = 0;

    function goToNextSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      const offset = -currentIndex * 100;
      sliderWrapper.style.transform = `translateX(${offset}%)`;
    }

    const interval = setInterval(goToNextSlide, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const cards = [
    { name: "Linked List", description: "This is a description for Linked List.", image: sll },
    { name: "Doubly Linked List", description: "This is a description for Doubly Linked List.", image: dll },
    { name: "Stack", description: "This is a description for Stack.", image: stack },
    { name: "Queue", description: "This is a description for Queue.", image: queue },
    { name: "Binary Tree", description: "This is a description for Binary Tree.", image: tree },
    { name: "Graph", description: "This is a description for Graph.", image: graph },
    { name: "Hash Table", description: "This is a description for Hash Table.", image: hashTable },
    { name: "Heap", description: "This is a description for Heap.", image: heap },
    { name: "Trie", description: "This is a description for Trie.", image: trie },
    { name: "Segment Tree", description: "This is a description for Segment Tree.", image: segmentTree },
    { name: "Red-Black Tree", description: "This is a description for Red-Black Tree.", image: redBlackTree },
    { name: "AVL Tree", description: "This is a description for AVL Tree.", image: avlTree },
    { name: "Priority Queue", description: "This is a description for Priority Queue.", image: priorityQueue },
  ];

  return (
    <div className="card-slider">
      <div className="slider-container">
        <div className="slider-wrapper">
          {cards.map((card, index) => (
            <div className="slider-item" key={index}>
              <div className="card">
                <div className="card-top">
                  <img src={card.image} alt={card.name} className="card-image" />
                </div>
                <div className="card-bottom">
                  <h3 className="card-name">{card.name}</h3>
                  <p className="card-description">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
