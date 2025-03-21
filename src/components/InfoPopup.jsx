import { useState, useRef, useEffect } from 'react';



const InfoPopup = ({ message, size = 'size-4' }) => {

  const [show, setShow] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block self-end" ref={popupRef}>
      <button
        onClick={() => setShow(prev => !prev)}
        className="text-blue-900 hover:text-secondary text-sm font-bold"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={size}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>

      </button>
      {show && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 p-2 bg-neutral-700 text-blue-50 text-xs rounded shadow">
          {message}
        </div>
      )}
    </div>
  );
}

export default InfoPopup