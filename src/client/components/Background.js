import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import backgroundDay from '../../../public/backgroundDay.png';
import backgroundNight from '../../../public/backgroundNight.png';
import cloud from '../../../public/cloud.png';
import { useInterval } from '../utils.js';

const Background_ = () => {
  const fadeIn = keyframes`
    0% {opacity:0;}
    100% {opacity:1;}
  `;

  const Wrapper = styled.img`
    position: fixed;
    width: 100%;
    height: 100%;
    animation: ${fadeIn} 1s;
  `;

  const Cloud1 = styled.img`
    position: absolute;
    top: 50px;
    left: 100px;
    z-index: 400;
  `;

  const Cloud2 = styled.img`
    position: absolute;
    top: 100px;
    left: 200px;
    z-index: 100;
  `;

  const [backgroundImage, setBackgroundImage] = useState('day');

  useInterval(() => {
    setBackgroundImage(backgroundImage === 'day' ? 'night' : 'day');
  }, 10000);

  return (<>
    <Wrapper src={backgroundImage === 'day' ? backgroundDay : backgroundNight} />
    <Cloud1 src={cloud}/>
    <Cloud2 src={cloud}/>
  </>);
};

// use memo to avoid refreshing when the state is updated. Launching the rocket in our case.
export const Background = React.memo(Background_);
