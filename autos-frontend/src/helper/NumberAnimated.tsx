import React, { memo } from 'react'
import { useSpring, animated } from 'react-spring';

interface NumberProps {
    n: number | undefined
  }

const NumberAnimated: React.FC<NumberProps> = ({ n }) => {
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 200,
      config: { mass: 1, tension: 20, friction: 10 }
    });
    
    return <animated.div>{number.to(n => n.toFixed(0))}</animated.div>
  }

  export default memo(NumberAnimated);
