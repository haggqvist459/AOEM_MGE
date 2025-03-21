import React from 'react';
import { FormSubHeader, InfoPopup } from '../../components'

const FormInput = ({ showInfo = false, message, title, id, placeholder, value, onChange, onBlur, required = false, allowDecimals = false, type = 'number' }) => {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row space-x-1'>
                {title &&
                    <FormSubHeader title={title} />
                }
                {showInfo &&
                    <div className="relative top-[2px]">
                        <InfoPopup size='size-4' message={message} />
                    </div>
                }
            </div>
            <input
                type={type}
                inputMode={type === 'number' ? 'numeric' : undefined}
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
        </div>

    );
};

export default FormInput;