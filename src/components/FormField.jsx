import React from 'react'

const FormField = ({ labelValue, placeholder, id, value, onChange, required=true}) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="font-bold text-amber-600 my-1">{labelValue}</label>
            <input
                type="text"
                className="border rounded w-full px-2 mb-2"
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