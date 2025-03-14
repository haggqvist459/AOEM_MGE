import React from 'react'

const ScoreBoardWrapper = ({ children, className, gridCols='grid-cols-2' }) => {
    return (
        <div className={`grid ${gridCols} gap-2 mt-1 ${className}`}>
            {children}
        </div>
    )
}

export default ScoreBoardWrapper