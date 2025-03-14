import { useState, useEffect } from "react";


const ToggleButton = ({ isToggled, onChange, onBlur }) => {

    const [delayedToggle, setDelayedToggle] = useState(isToggled);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayedToggle(isToggled);
        }, 200);

        return () => clearTimeout(timer);
    }, [isToggled]);

    return (
        <button
            type="button"
            aria-pressed={isToggled}
            checked={isToggled}
            onClick={onChange}
            onBlur={onBlur}
            className={`w-10 h-5 rounded-full transition-all duration-500 ${isToggled ? 'bg-blue-900' : 'bg-neutral-400'}`}
        >
                <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform duration-500 ${isToggled ? "translate-x-full" : "translate-x-0"
                        }`}
                >
                    {delayedToggle
                        ? (<svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="2 2 20 20"
                            strokeWidth="2"
                            stroke="currentColor"
                            className={`size-5 translate-y-0 transition-colors duration-500 ${isToggled ? 'text-blue-900' : 'text-neutral-400'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>)
                        : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="2 2 20 20"
                                strokeWidth="2" stroke="currentColor"
                                className={`size-5 translate-y-0 transition-colors duration-500 ${isToggled ? 'text-blue-900' : 'text-neutral-400'}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        )}
                </div>
        </button>
    );
};

export default ToggleButton;