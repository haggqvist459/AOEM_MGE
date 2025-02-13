import React from 'react'

const FormField = ({ labelValue, placeholder, id, value, onChange, required=true}) => {
    
    return (
        <div className="flex flex-col w-full mb-2">
            <label htmlFor={id} className="w-full font-bold text-blue-900 my-1">{labelValue}</label>
            <input
                type="text"
                className="border rounded w-full px-1"
                placeholder={placeholder}
                name={id}
                id={id}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default FormField