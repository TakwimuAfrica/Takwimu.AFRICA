import { useEffect } from 'react';
import ReactDOM from 'react-dom';

function Portal({ children, element }) {
  // Create a new div within the element that we'll render our component
  const el = document.createElement('div');
  useEffect(() => {
    element.appendChild(el);
    return () => {
      // Remove our div on un-mount; Not the element itself since that's
      // outside our control
      if (el.parentElement === element) {
        element.removeChild(el);
      }
    };
  }, [el, element]);

  // Render when el is appended to DOM
  return el.parentNode ? ReactDOM.createPortal(children, el) : null;
}

export default Portal;
