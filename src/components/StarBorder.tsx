import React from 'react';
import './StarBorder.css';

interface StarBorderProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const StarBorder = ({ children, className, onClick }: StarBorderProps) => {
  return (
    <div className={`star-border-container ${className || ''}`} onClick={onClick}>
      <div className="border-gradient-bottom" style={{ background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)' }} />
      <div className="border-gradient-top" style={{ background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)' }} />
      <div className="inner-content">
        {children}
      </div>
    </div>
  );
};

export default StarBorder;