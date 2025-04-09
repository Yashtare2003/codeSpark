import React from "react";
import DataStructureCard from "./DataStructureCard";
import "./Homepage.css";
import sll from "../assets/images/sll.png";
import dll from "../assets/images/dll.png";
import cll from "../assets/images/cll.png";
import stack from "../assets/images/stack.png";
import ss from "../assets/images/selectionsort.jpg";
import is from "../assets/images/insertionsort.png";
import bs from "../assets/images/bubblesort.jpg";
import ms from "../assets/images/mergesort.png";
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

// Example data for the cards
const dataStructures = [
  { name: "Linked List", image: sll, path: "/data-structure/homepage/linked-list" },
  { name: "Doubly Linked List", image: dll, path: "/data-structure/homepage/doublylinkedlist" },
  { name: "Circular Linked List", image: cll, path: "/data-structure/homepage/circularlinkedlist" },
  { name: "Stack", image: stack, path: "/data-structure/homepage/stack" },
  { name: "Selection Sort", image: ss, path: "/data-structure/homepage/selectionsort" },
  { name: "Insertion Sort", image: is, path: "/data-structure/homepage/insertionsort" },
  { name: "Bubble Sort", image: bs, path: "/data-structure/homepage/bubblesortviz" },
  { name: "Merge Sort", image: ms, path: "/data-structure/homepage/mergesort" },

  { name: "Queue", image: queue, path: "/data-structure/homepage/queue" },
  { name: "Binary Tree", image: tree, path: "/data-structure/homepage/binarytree" },
  { name: "Binary Search", image: tree, path: "/data-structure/homepage/binarysearch" },
  { name: "Array", image: heap, path: "/data-structure/homepage/array" },
  { name: "Graph", image: graph, path: "/data-structure/homepage/graph" },
  { name: "Hash Table", image: hashTable, path: "/data-structure/homepage/hashtable" },
  { name: "Trie", image: trie, path: "/data-structure/homepage/trie" },
  { name: "Segment Tree", image: segmentTree, path: "/data-structure/homepage/segmenttree" },
  { name: "Red-Black Tree", image: redBlackTree, path: "/data-structure/homepage/redblacktree" },
  { name: "AVL Tree", image: avlTree, path: "/data-structure/homepage/avltree" },
  { name: "Priority Queue", image: priorityQueue, path: "/data-structure/homepage/priorityqueue" },

  // Add more data structures here if images are available
];

const HomePage = () => {
  return (
    <div className="homepage">
      <h1 className="title">Data Structures</h1>
      <div className="card-container">
        {dataStructures.map((ds, index) => (
          <DataStructureCard
            key={index}
            image={ds.image}
            name={ds.name}
            path={ds.path}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
