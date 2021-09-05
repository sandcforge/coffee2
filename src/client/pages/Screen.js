import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { actionUpdateRocketStatus } from '../redux/actions';
import { Rocket } from '../components/Rocket';
import { Background } from '../components/Background';
import { APP_CONST } from '../constants';

const Wrapper = styled.div`
`;

export const Screen = (props) => {
  const { index: screenIndex } = props
  const dispatch = useDispatch();
  const rocketStatus = useSelector(state => state.rocket.status);
  const rocketMessage = useSelector(state => state.rocket.message);
  const updateRocketStatus = (index) => {
    dispatch(actionUpdateRocketStatus({
      index,
    }));
  };

  return (<Wrapper>
    <Background/>
    {Array.from({length: APP_CONST.orbitNumber}).map((_,i) =>
      <Rocket
        key={i}
        index={i}
        active={rocketStatus[i] === 0}
        message={rocketMessage[i]}
        onEnd={() => updateRocketStatus(i)}
      />
    )}

  </Wrapper>);
};

Screen.propTypes = {
  index: PropTypes.number.isRequired,
};