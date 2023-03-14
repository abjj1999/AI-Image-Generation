import React from 'react'

const Form = ({
  label,
  type,
  value,
  handleChange,
  name,
  placeholder,
  isSurprise,
  handleSurpriseMe
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={name} className="
        block text-sm font-medium text-grey-900
        ">
          {label}
        </label>
        {isSurprise && (
          <button onClick={handleSurpriseMe} className="font-semibold bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black text-sm">
            Surprise me
          </button>
        )}
      </div>
      <input type={type} name={name} id={name} placeholder={placeholder} value={value} onChange={handleChange}
         className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3'
      />
      
    </div>
  )
}

export default Form
