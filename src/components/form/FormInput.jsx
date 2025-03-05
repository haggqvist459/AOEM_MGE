import React from 'react';

const FormInput = ({ id, placeholder, value, onChange, onBlur, required = false, allowDecimals = false }) => {
    return (
        <input
            type="number"
            inputMode="numeric"
            step={allowDecimals ? "any" : "1"}
            id={id}
            name={id}
            className="text-sm lg:text-lg border rounded border-neutral-600 w-full px-1 no-spinner"
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
        />
    );
};

export default FormInput;