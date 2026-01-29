import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Welcome.css';

const Welcome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const slides = [
    {
      title: "Discover Amazing Movies",
      description: "Explore thousands of movies from different genres and languages",
      icon: "🎬"
    },
    {
      title: "Create Your Watchlist",
      description: "Save movies you want to watch and never forget them",
      icon: "📋"
    },
    {
      title: "Host Watch Parties",
      description: "Invite friends to watch movies together virtually",
      icon: "🎉"
    },
    {
      title: "Filter & Search",
      description: "Find movies by genre, language, or search by name",
      icon: "🔍"
    },
    {
      title: "Join the Community",
      description: "Connect with movie lovers and share your experiences",
      icon: "👥"
    }
  ];

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="welcome">
      <div className="welcome-header">
        <h1>🎬 MovieDiscover</h1>
        <div className="auth-buttons">
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/signup" className="btn btn-primary">Sign Up</Link>
        </div>
      </div>

      <div className="carousel">
        <div className="slide">
          <div className="slide-icon">{slides[currentSlide].icon}</div>
          <h2>{slides[currentSlide].title}</h2>
          <p>{slides[currentSlide].description}</p>
        </div>
        
        <div className="carousel-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <div className="welcome-footer">
        <p>Ready to start your movie journey?</p>
        <Link to="/signup" className="btn btn-large btn-primary">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Welcome;