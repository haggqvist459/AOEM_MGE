import React from 'react'

const ExpandableSection = ({ children, isExpanded }) => {
  return (
    <div className={`border-b border-neutral-400 pb-2 transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-50 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-3"}`}>
      {children}
    </div>

  )
}

export default ExpandableSection
