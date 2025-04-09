import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
// import Algo from "./Components/Algorithm/Algo.jsx";
// import Algo2 from "./Components/Algo2/Algo2.jsx";
import BinarySearch from "./Components/DS/BinarySearch/BinarySearch.jsx";
// import Stack from "./Components/DS/stack/Stack.jsx";
// import LinkedList from "./Components/DS/LL/LinkedList.jsx";
// import DoublyLinkedList from "./Components/DS/DLL/DoublyLinkedList.jsx";
import HomePage from "./Components/Homepage.jsx";
import ComingSoon from "./Components/ComingSoon.jsx";
// import CircularLinkedList from "./Components/DS/CLL/CircularLinkedList.jsx";
import SelectionSort from "./Components/DS/SelectionSort/SelectionSort.jsx";
import InsertionSort from "./Components/DS/InsertionSort/InsertionSort.jsx";
import Stack from "./Components/DS/Stack/Stack.jsx";
import LinkedList from "./Components/DS/LL/LinkedList.jsx";
import BubbleSortVisualizer from "./Components/DS/BubbleSort/BubbleSortVisualizer.jsx";
import MergeSort from "./Components/DS/MergeSort/MergeSort.jsx";
import ArrayVisualizer from "./Components/DS/Array/ArrayVisualizer.jsx";
// import MergeSort from "./Components/DS/MergeSort/MergeSort.jsx";

const router = createBrowserRouter([
  {
    path:'/',
    element:<Navbar/>
  },
  // {
  //   path:'algorithm',
  //   element:<Algo/>
  // },
  // {
  //   path:'algorithm2',
  //   element:<Algo2/>
  // },
  {
    path:'data-structure/homepage/array',
    element:<ArrayVisualizer />
  },
  {
    path:'data-structure/homepage/binarysearch',
    element:<BinarySearch />
  },
  {
    path:'data-structure/homepage/selectionsort',
    element:<SelectionSort/>
  },
  {
    path:'data-structure/homepage/insertionsort',
    element:<InsertionSort/>
  },
  {
    path:'data-structure/homepage/bubblesortviz',
    element:<BubbleSortVisualizer/>
  },
  
  {
    path:'data-structure/homepage/mergesort',
    element:<MergeSort/>
  },
  {
    path:'data-structure/homepage/stack',
    element:<Stack />
  },
  {
    path:'data-structure/homepage/linked-list',
    element:<LinkedList />
  },
  // {
  //   path:'data-structure/homepage/mergesort',
  //   element:<MergeSort/>
  // },
  // {
  //   path:'data-structure/homepage/stack',
  //   element:<Stack/>
  // },
  // ,
  // {
  //   path:'data-structure/homepage/linkedlist',
  //   element:<LinkedList/>
  // },
  // {
  //   path:'data-structure/homepage/doublylinkedlist',
  //   element:<DoublyLinkedList/>
  // },
  // {
  //   path:'data-structure/homepage/circularlinkedlist',
  //   element:<CircularLinkedList/>
  // },
  {
    path:'data-structure/homepage',
    element:<HomePage/>
  },
  {
    path: 'data-structure/homepage/*',
    element: <ComingSoon />, // Fallback route for undefined paths
  },
])



ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
  // <App/>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Navbar from "./Components/Navbar/Navbar.jsx";
// import Algo from "./Components/Algorithm/Algo.jsx";
// import Algo2 from "./Components/Algo2/Algo2.jsx";
// import BinarySearch from "./Components/DS/BinarySearch/BinarySearch.jsx";
// import Stack from "./Components/DS/stack/Stack.jsx";
// import LinkedList from "./Components/DS/LL/LinkedList.jsx";
// import DoublyLinkedList from "./Components/DS/DLL/DoublyLinkedList.jsx";
// import HomePage from "./Components/Homepage.jsx";



// // Define your routes
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Navbar />,
//     children: [
//       {
//         index: true, // This will be the default route when the path is "/"
//         element: <HomePage />, // You need to create a HomePage component
//       },
//       {
//         path: "/algorithm",
//         element: <Algo />,
//       },
//       {
//         path: "/algorithm2",
//         element: <Algo2 />,
//       },
//       {
//         path: "/binarysearch",
//         element: <BinarySearch />,
//       },
//       {
//         path: "/stack",
//         element: <Stack />,
//       },
//       {
//         path: "/linkedlist",
//         element: <LinkedList />,
//       },
//       {
//         path: "/doublylinkedlist",
//         element: <DoublyLinkedList />,
//       },
//       {
        
//       },
//     ],
//   },
// ]);

// // Render the application
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );
