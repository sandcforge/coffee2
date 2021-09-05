import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { actionUpdateRocketStatus } from '../redux/actions';
import backgroundDay from '../../../public/backgroundDay.png';
import { Rocket } from '../components/Rocket';
import { APP_CONST } from '../constants';

const Container = styled.div`
`;

const Background = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const Admin = (props) => {
  return (<Container id='container'>
    <Rocket index={2} message={'1 叶黄素 叶黄素'} enableAnimation={false}/>
    <Background src={backgroundDay} />
  </Container>);
};

Screen.propTypes = {
  index: PropTypes.number.isRequired,
};