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

  const fadOut = keyframes`
    0% {opacity:1;}
    100% {opacity:0;}
  `;
  const FadeIn = styled.img`
    position: fixed;
    width: 100%;
    height: 100%;
    animation: ${fadeIn} 1s;
    animation-fill-mode: forwards;
  `;

  const FadeOut = styled.img`
    position: fixed;
    width: 100%;
    height: 100%;
    animation: ${fadOut} 1s;
    animation-fill-mode: forwards;
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

  const [timePeriod, setTimePeriod] = useState('day');

  useInterval(() => {
    setTimePeriod(timePeriod === 'day' ? 'night' : 'day');
  }, 10000);

  const renderBackgroundImage = () => {
    if (timePeriod === 'day') {
      return (<>
        <FadeIn src={backgroundDay} />
        <FadeOut src={backgroundNight} />
      </>);
    }
    else {
      return (<>
        <FadeOut src={backgroundDay} />
        <FadeIn src={backgroundNight} />
      </>)
    };
  };
  return (<>
    {renderBackgroundImage()}
    <Cloud1 src={cloud} />
    <Cloud2 src={cloud} />
  </>);
};

// use memo to avoid refreshing when the state is updated. Launching the rocket in our case.
export const Background = React.memo(Background_);
