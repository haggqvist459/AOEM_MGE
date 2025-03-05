import React from 'react'

const ScoreBoardWrapper = ({ children, className }) => {
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1 ${className}`}>
            {children}
        </div>
    )
}

export default ScoreBoardWrapper