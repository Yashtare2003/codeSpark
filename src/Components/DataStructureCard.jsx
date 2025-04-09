import React from "react";
import { useNavigate } from "react-router-dom";
import "./DataStructureCard.css"; // Import your CSS file for styling

const DataStructureCard = ({ image, name, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path); // Navigate to the route when the card is clicked
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-content">
        <img src={image} alt={name} className="card-image" />
        <h3 className="card-title">{name}</h3>
      </div>
    </div>
  );
};

export default DataStructureCard;
