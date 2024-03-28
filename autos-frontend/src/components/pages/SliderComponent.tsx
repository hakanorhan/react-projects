import React from 'react'

interface SliderProps {
    imageSrc: string[]
}

const SliderComponent: React.FC<SliderProps> = ({ imageSrc }) => {
  return ( <>
    {imageSrc.map((image, index) => (
                <div key={index}>
                    <img width='400px' src={image} alt="Bild" />
                </div>
            ))}
  </>
  )
}

export default SliderComponent;
