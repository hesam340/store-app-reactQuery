import React from 'react'

function ProductInput({ name, title, register, errors }) {
  return (
    <div>
      <label htmlFor={name}>{title}</label>
      <input
        type={name === "name" ? "text" : "number"}
        id={name}
        placeholder={title}
        {...register(name)}
      />
      <span>{errors[name]?.message}</span>
    </div>
  )
}

export default ProductInput