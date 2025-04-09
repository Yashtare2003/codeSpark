// CardCarousel.jsx
import React, { useState, useEffect } from 'react';
import './CardCarousel.css'; // Import the CSS file
import p1 from "../assets/images/p1.jpg";
import p2 from "../assets/images/p2.jpg";
import p3 from "../assets/images/p3.jpg";
import p4 from "../assets/images/p4.png";
import p5 from "../assets/images/p5.png";


const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [
    {
      id: 1,
      imgSrc: p1,
      text: 'This DSA visualizer has been a complete game-changer for me! As someone who struggles with abstract concepts, I found it incredibly difficult to grasp the intricacies of algorithms like sorting and searching. This tool, however, made everything click. The step-by-step animations and the ability to interact with the visualizations brought the concepts to life and made them so much easier to understand. I highly recommend this to anyone learning DSA!',
      author: 'John Doe'
    },
    {
      id: 2,
      imgSrc: p2,
      text: 'Before I found this website, I had a really hard time visualizing data structures like trees, graphs, and linked lists. They just seemed like these intangible concepts that I couldn\'t wrap my head around. This platform, however, provided a clear and intuitive way to see how these structures work. The interactive elements allowed me to experiment with different operations and see the results in real-time, which was a game-changer for my understanding. I can\'t recommend this enough!',
      author: 'Jane Smith'
    },
    {
      id: 3,
      imgSrc: p3,
      text: 'Being a visual learner, I always struggled with traditional textbook explanations of algorithms and data structures. This tool, however, has been a lifesaver! The animations are not only visually stunning but also incredibly informative. They break down complex operations into smaller, digestible steps, making it much easier to follow the logic and understand the underlying principles. I wish I had discovered this sooner!',
      author: 'Peter Jones'
    },
    {
      id: 4,
      imgSrc: p4,
      text: 'I was really stressed about my upcoming DSA exam, but this website helped me immensely! The interactive visualizations allowed me to practice different algorithms and data structures in a hands-on way. I could see the impact of my code on the visualizations, which helped me solidify my understanding and identify any areas where I needed to improve. Thanks to this tool, I aced my exam!',
      author: 'Sarah Lee'
    },
    {
      id: 5,
      imgSrc: p5,
      text: 'Learning DSA can be a daunting task, especially when you\'re faced with dense textbooks and abstract concepts. I wish I had this tool when I was first starting out! The clear explanations, coupled with the engaging visualizations, make learning DSA so much more approachable and enjoyable. This website has the potential to demystify DSA for countless students.',
      author: 'David Kim'
    },
    
  ];
  
  
  
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % cards.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [cards.length]);

  const nextCard = () => {
    setCurrentIndex((currentIndex + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((currentIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        <div className="carousel-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {cards.map(card => (
            <div key={card.id} className="carousel-card">
              <div className="carousel-card-top">
                <img src={card.imgSrc} alt={`Card ${card.id}`} />
              </div>
              <div className="carousel-card-bottom">
                <p>{card.text}</p>
                <h3>- {card.author}</h3>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-prev" onClick={prevCard}>‹</button>
        <button className="carousel-next" onClick={nextCard}>›</button>
      </div>
    </div>
  );
};

export default CardCarousel;
