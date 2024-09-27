import React from 'react'

function LoadingPage({ title, description }) {
  return (
    <div className="flex flex-col w-screen  p-[40px] h-full items-center pt-[10rem]">
      <h5 className="text-blackText font-bold text-[2.5rem] text-center leading-[64px]">{title}</h5>
      <p className="text-[#6C7275] tracking-tigh font-karla leading-[2.25rem] text-[1.5rem]">
        {description}
      </p>
    </div>
  )
}

export default LoadingPage
