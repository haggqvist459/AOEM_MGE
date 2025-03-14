import React from 'react'
import { FormSubHeader } from '../../components'

const ExpandableHeader = ({ toggleExpansion, isExpanded, title }) => {
  return (
    <div className='flex flex-row space-x-2'>
    <button
      type='button'
      onClick={() => toggleExpansion(!isExpanded)}
      className="flex flex-row items-center justify-between w-full text-left focus:outline-none"
    >
      <FormSubHeader title={title} className={'text-lg md:text-xl'} />
      {/* Triangle Icon */}
      <span className={`text-blue-900 inline-block transform transition-transform ${isExpanded ? "rotate-90" : "rotate-0"}`}>
        ▶
      </span>
    </button>
  </div>
  )
}

export default ExpandableHeader