import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Banner } from '../components/Banner';
import rocket09 from '../../../public/rocket09.png';
import { useSpring, animated, config } from 'react-spring'

const Rocket_ = (props) => {
  const {
    index, //index determines the orbit height.
    message, // Banner message
    active = false,  // 0->1: Start the animation; 0->1: Hide the Rocket
    onEnd,   // The event at the end of animation
    color = 'red', // Rocket color
    iterations = 5,
    fightDuration = 10, // The time of fight per iteration, unit: sec.
  } = props;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const PlaneImageWidth = 300;
  const RocketContainerHeight = 80;
  const getRatio = w => windowWidth / (w + windowWidth);
  const slideIn = (props) => keyframes`
    0% { left: ${-props.RocketContainerWidth}px; }
    100% { left: ${windowWidth}px;}`;

  const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    top: ${100 + index * 300}px;
    left: ${props => -props.RocketContainerWidth}px;
    position: absolute;
    height: ${RocketContainerHeight}px;
    width: ${props => props.RocketContainerWidth}px;
    animation-name: ${props => slideIn(props)};
    animation-duration: ${fightDuration}s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-delay: ${props => fightDuration * props.index * getRatio(props.RocketContainerWidth)}s;
 `;

  const Plane = styled.img`
    display: flex; 
    width: ${PlaneImageWidth}px;
    height: ${RocketContainerHeight}px;
  `;

  const DummyBanner = styled.div`
  color: ${color};
  visibility: hidden;
  white-space:pre-wrap;
  flex-wrap: nowrap;
  font-size: 25px;
`;

  const bannerRef = useRef(null);
  const [rocketContainerWidth, setRocketContainerWidth] = useState(300);

  useEffect(() => {
    if (bannerRef.current) {
      const bannerWidth = bannerRef.current.offsetWidth;
      setRocketContainerWidth(bannerWidth + PlaneImageWidth);
    }
  }, [active]);

  return active && (<>
    {/* This DummyBanner is to calculate the width of banner inside Wrapper */}
    <DummyBanner ref={bannerRef}>{message}</DummyBanner>
    {Array.from(Array(iterations).keys()).map(i =>
      <Wrapper
        RocketContainerWidth={rocketContainerWidth}
        key={i}
        index={i}
        onAnimationEnd={i == iterations - 1 ? onEnd : undefined}
      >
        <Banner message={message} />
        <Plane src={rocket09} />
      </Wrapper>
    )}
  </>);
};

// export const Rocket = React.memo(Rocket_, (current, next) => current.active == next.active);

const Rocket__ = (props) => {
  const {
    message, // Banner message
    index,
    enableAnimation = true,
  } = props;
  const PlaneImageWidth = 300;
  const RocketImage = styled.img`
    display: flex;
    width: ${PlaneImageWidth}px;
  `;
  const [rocketContainerWidth, setRocketContainerWidth] = useState(500);
  const multiAnimation = useSpring({
    config: {
      clamp: true,
      duration: 5000 + index * 1000,
    },
    loop: true,
    from: { x: window.innerWidth },
    to: [
      { x: -rocketContainerWidth },
    ]
  });

  const commonStyle = {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    backgroundColor: 'red',
    top: index * 100,
    zIndex: index * 100
  };

  return (<>
    <animated.div style={enableAnimation ? {...multiAnimation, ...commonStyle} : commonStyle}>
      <RocketImage src={rocket09} />
      <Banner message={message}/>
      {/* <div>{message}</div> */}
    </animated.div>
  </>);
};



// export const Rocket = React.memo(Rocket__, (current, next) => current.message == next.message);
export const Rocket = Rocket__;