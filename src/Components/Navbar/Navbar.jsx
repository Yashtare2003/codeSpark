// Navbar.jsx
import React, { useEffect } from "react";
import { useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollProgressBar from 'react-scroll-progress-bar';

import { Link, useNavigate } from "react-router-dom";
import "./nav.css"; // Your main CSS file
import logo1 from "../../assets/logo1.png";
import logo6 from "../../assets/logo6.png";

import about_us from "../../assets/images/about_us.jpg";
import our_mission from "../../assets/images/our_mission.png";
import our_history from "../../assets/images/our_history.png";
import meet_our_team from "../../assets/images/meet_our_team.jpg";
import algovid from "../../assets/algovid.mp4";

import contactus from "../../assets/images/contactus.jpg";

import alfred_aho from "../../assets/images/alfred_aho.jpg";
import dijkstra from "../../assets/images/dijkstra.jpg";
import donald_knuth from "../../assets/images/donald_knuth.jpg";
import jeffereyullman from "../../assets/images/jeffereyullman.jpg";
import peterjweinberger from "../../assets/images/peterjweinberger.jpg";
import robert_floyd from "../../assets/images/robert_floyd.jpg";
import ask_me from "../../assets/images/ask_me.png";

import CardCarousel from "../CardCarousel"; // Import the CardCarousel component
import PdfViewer from "../PdfViewer";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome for icons
import { faComments } from '@fortawesome/free-solid-svg-icons'; // Import chat icon
// import '../ChatBot.css'; // Import styles
import ChatBot from "../ChatBot";


function Navbar() {
  const [scrollHeight, setScrollHeight] = useState(0);

  const handleScroll = () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    const progress = (currentScroll / totalHeight) * 100;

    setScrollHeight(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    if (window.Swiper) {
      new window.Swiper(".swiper-container", {
        spaceBetween: 30,
        slidesPerView: 1,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        loop: true,
      });
    }
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const notifySuccess = () => {
    toast.success("Your feedback has been successfully sent!", {
      icon: <span style={{ fontSize: "2rem" }}>🎉</span> // Customize the icon size
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.message.trim() === "") {
      toast.error("Message cannot be empty!");
      return;
    }
    
    emailjs.send('service_bv1eerl', 'template_egagbs4', formData, 'xOGRGzMt1VJ-ChUzJ')
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
      toast.success('Your feedback has been successfully sent!');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((err) => {
      console.error('Failed to send email. Error: ', err);
      toast.error('Failed to send your feedback. Please try again.');
    });
};

  const [showPdf, setShowPdf] = useState(false);

  const handlePdfClick = () => {
    window.open('src/assets/docs/Notes_DS.pdf', '_blank');
  };

  const navigate = useNavigate();

const handleDataStructureClick = () => {
  navigate("/data-structure/homepage");
};

const scrollToContactUs = () => {
  const contactSection = document.querySelector('.contact-us');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <img src={logo6} alt="Logo" className="logo" />
{/* Suggested code may be subject to a license. Learn more: ~LicenseLog:1031432371. */}
{/* Suggested code may be subject to a license. Learn more: ~LicenseLog:230455049. */}
          <p className="site-name">Code<span style={{ color: "#ec847c" }}>Spark</span>Pro⚡</p>

        </div>
        <div className="navbar-right">
        <button className="contact-button" onClick={scrollToContactUs}>
    Contact Us
  </button></div>
      </div>
      <div className="vertical-progress" style={{ height: `${scrollHeight}%` }} />
      
      {/* Main Introduction Section */}
      <div className="navbar-body">
        <div className="navbar-content">
          <h1 className="intro-heading">
            Explore <span className="animate-fade-in-out text-[#ec847c]">Algorithms</span> with Visuals
          </h1>
          <p className="intro-text ">
          CodeSpark Pro⚡ offers a structured pathway to understanding algorithms and data structures 
          through interactive visualizations and real-time simulations — making advanced concepts approachable for all learners.
          </p>
          <div className="btn-container">
          <button onClick={handlePdfClick} className="get-started-button ">
        Get Started with Notes <span>&#8594;</span>
      </button>
      <button onClick={handleDataStructureClick} className="get-started-button">
    Start with Data Structures <span>&#8594;</span>
  </button>
            {showPdf && <PdfViewer pdfUrl="/src/assets/docs/Notes_DS.pdf" />}          </div>
        </div>
        <div className="navbar-media">
          <video src={algovid} autoPlay loop muted className="promo-video" />
          <div className="image-collage">
            <h2>Famous Mentions</h2>
            <div className="collage">
    <div className="image-row">
        <div className="image-item">
            <a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm" target="_blank" rel="noopener noreferrer">
                <img src={dijkstra} alt="Dijkstra's Algorithm" />
                <div className="overlay">
                    <span className="image-name">Dijkstra's</span>
                </div>
            </a>
        </div>
        <div className="image-item">
            <a href="https://en.wikipedia.org/wiki/Donald_Knuth" target="_blank" rel="noopener noreferrer">
                <img src={donald_knuth} alt="Donald Knuth" />
                <div className="overlay">
                    <span className="image-name">Donald Knuth</span>
                </div>
            </a>
        </div>
        <div className="image-item">
            <a href="https://en.wikipedia.org/wiki/Jeffrey_Ullman" target="_blank" rel="noopener noreferrer">
                <img src={jeffereyullman} alt="Jeffrey Ullman" />
                <div className="overlay">
                    <span className="image-name">Jeffrey Ullman</span>
                </div>
            </a>
        </div>
    </div>
    <div className="image-row">
        <div className="image-item">
            <a href="https://en.wikipedia.org/wiki/Robert_Floyd" target="_blank" rel="noopener noreferrer">
                <img src={robert_floyd} alt="Robert Floyd" />
                <div className="overlay">
                    <span className="image-name">Robert Floyd</span>
                </div>
            </a>
        </div>
        <div className="image-item">
            <a href="https://en.wikipedia.org/wiki/Alfred_Aho" target="_blank" rel="noopener noreferrer">
                <img src={alfred_aho} alt="Alfred Aho" />
                <div className="overlay">
                    <span className="image-name">Alfred Aho</span>
                </div>
            </a>
        </div>
        <div className="image-item">
            <a href="https://en.wikipedia.org/wiki/Peter_J._Weinberger" target="_blank" rel="noopener noreferrer">
                <img src={peterjweinberger} alt="Peter J. Weinberger" />
                <div className="overlay">
                    <span className="image-name">Peter J. Weinberger</span>
                </div>
            </a>
        </div>
    </div>
</div>

          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="slider-section">
        <h2 className="section-title">User About Us</h2>
        <CardCarousel />
      </div>

      {/* About Us Section */}
      <div className="about-us">
  <div className="section" id="about-us">
    <div className="section-content left">
    <img src={about_us} alt="Logo" className="about_us" />
    </div>
    <div className="section-content right">
      <p>
        <strong>CodeSpark Pro⚡</strong> is a leading provider of high-quality educational tools designed to help users master algorithms and data structures. Our platform features interactive visualizations that transform complex theoretical concepts into engaging, easy-to-understand experiences.
      </p>
    </div>
  </div>
  
  <div className="section" id="our-mission">
    <div className="section-content left">
    <img src={our_mission} alt="Logo" className="our_mission" />
    </div>
    <div className="section-content right reversed">
      <p>
        Our mission is to enhance learning by offering intuitive visualizations and hands-on tools. We aim to bridge the gap between theoretical knowledge and practical application, making computer science concepts accessible to learners of all levels.
      </p>
    </div>
  </div>

  <div className="section" id="our-history">
    <div className="section-content left">
    <img src={our_history} alt="Logo" className="our_history" />
    </div>
    <div className="section-content right">
      <p>
        Founded in 2024, CodeSpark Pro began with a simple idea: to create a platform where students and professionals could explore algorithms interactively. Over the years, we've expanded our offerings and grown our team, but our commitment to educational excellence remains unchanged.
      </p>
    </div>
  </div>

  <div className="section" id="meet-the-team">
    <div className="section-content left">
    <img src={meet_our_team} alt="Logo" className="meet_our_team" />
    </div>
    <div className="section-content right reversed">
      <p>
        Our team is composed of passionate educators and developers dedicated to improving the learning experience. With backgrounds in computer science, education, and design, we work together to create tools that are both informative and engaging.
            </p>
            <div className="team-member">
          <h3>Sundaram- </h3>
          <p>Senior Developer at <strong>Tech Innovators Inc.</strong></p>
        </div>
        <div className="team-member">
          <h3>Yadnesh-</h3>
          <p>Lead Designer at <strong>Creative Solutions Ltd.</strong></p>
        </div>
        <div className="team-member">
          <h3>Shivesh-</h3>
          <p>Project Manager at <strong>NextGen Tech Co.</strong></p>
        </div>
        <div className="team-member">
          <h3>Manish-</h3>
          <p>Data Scientist at <strong>DataPioneers LLC.</strong></p>
        </div>
        <div className="team-member">
          <h3>Yash-</h3>
          <p>Marketing Lead at <strong>GrowthExperts Inc.</strong></p>
        </div>
        <div className="team-member">
          <h3>Shubham-</h3>
          <p>Software Engineer at <strong>Epic Games.</strong></p>
        </div>
        <div className="team-member">
          <h3>Anurag-</h3>
          <p>UX/UI Specialist at <strong>DesignMasters Ltd.</strong></p>
        </div>
        <div className="team-member">
          <h3>Jayesh-</h3>
          <p>Managing Director, Fresher Training Expert at <strong>MindShooters Ltd., Los Angeles</strong></p>
        </div>
        <div className="team-member">
          <h3>Rupesh-</h3>
          <p>Senior Corporate Trainer at <strong>Bada Business.com, Bangalore</strong></p>
        </div>
        <div className="team-member">
          <h3>Satyam-</h3>
          <p>Senior AWS Engineer Trainer at <strong>NeoG.com, Chennai</strong></p>
        </div>
    </div>
  </div>

  <Link to="/about" className="learn-more-button">
    Learn More
  </Link>
</div>


      {/* Contact Us Section */}

      <div className="contact-us">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-form-container">
          <div className="contact-form-left">
            {/* Add your image here */}
            <img src={contactus} alt="Contact Us" />
          </div>
          <div className="contact-form-right">
          <form className="contact-form" onSubmit={handleSubmit}>
  <div className="form-group">
    <div className="label-div">
      <label htmlFor="name">Name:</label>
    </div>
    <div className="input-div">
      <input
        type="text"
        id="name"
        name="name"
        required
        value={formData.name}
        onChange={handleChange}
      />
    </div>
  </div>
  <div className="form-group">
    <div className="label-div">
      <label htmlFor="email">Email:</label>
    </div>
    <div className="input-div">
      <input
        type="email"
        id="email"
        name="email"
        required
        value={formData.email}
        onChange={handleChange}
      />
    </div>
  </div>
  <div className="form-group">
    <div className="label-div">
      <label htmlFor="message">Your Message:</label>
    </div>
    <div className="input-div">
      <input
        type="text"
        id="message"
        name="message"
        required
        value={formData.message}
        onChange={handleChange}
      />
    </div>
  </div>
  
  <button type="submit" className="submit-button">
    Send Message
  </button>
</form>

<ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  closeOnClick
  pauseOnHover
  draggable
  style={{ fontSize: "1.2rem" }}
/></div>

        </div>
      </div>

      <div className="App">
      {/* <h1>AI Chat Bot</h1> */}
      <ChatBot />
      {/* Sticky chat icon */}
      <div className="sticky-chat-icon" onClick={() => document.querySelector('.chatbot').classList.toggle('open')}>
      <img src={ask_me} alt="Ask Me" />
      </div>
    </div>
    

      {/* Footer Section */}
      <footer className="footer">
  <div className="footer-content">
    <p>&copy; 2024 CodeSpark Pro. All rights reserved. Author: Yash Tare</p>
    <p>Mentorship and guidance by Mrs. Prachi Adhiraj Mam, Assistant Professor, Dept. of CS, B.K. Birla College.</p> {/* Added specific mention */}
    <div className="footer-links">
      <Link to="/privacy-policy">Privacy Policy</Link>
      <Link to="/terms-of-service">Terms of Service</Link>
    </div>
  </div>
</footer>

    </div>
  );
}

export default Navbar;
