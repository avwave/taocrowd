import React, { useState } from "react";
import './index.scss';

const Collapsible = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className={`collapsible-content ${isOpen ? 'open' : ''}`}>
        {children}

      </div>
      
      <button
        className="button"
        onClick={() => { setIsOpen(!isOpen) }}
      >
        {isOpen ? 'hide' : 'view'}
      </button>
    </div>
  )
}

export {Collapsible}