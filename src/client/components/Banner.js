import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import bannerHeader from '../../../public/bannerHeader.png';
import bannerTailer from '../../../public/bannerTailer.png';
import bannerBody from '../../../public/bannerBody.png';

const BannerContainer = styled.div`
display: flex;
white-space:pre-wrap;
flex-wrap: nowrap;
font-size: 25px;
`;

export const Banner = (props) => {
  const {
    message = '留言版。', // Banner message
  } = props;

  const Container = styled.div`
    display: flex;
  `;
  const BannerCharContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-item: center;
  `;

  const BannerHeaderTailer = styled.img`
    width: 12px;
    height: 28px;
  `;
  const BannerBodyBorder = styled.img`
    width: 24px;
    height: 4px;
  `;
  const BannerChar = styled.div`
    width: 24px;
    height: 20px;
    color: white;
  `;

  return (<Container>
    <BannerHeaderTailer src={bannerTailer} />
    {[...message].map((c, i) => <BannerCharContainer key={i}>
      <BannerBodyBorder src={bannerBody} />
      <BannerChar>{c}</BannerChar>
      <BannerBodyBorder src={bannerBody} />
    </BannerCharContainer>
    )}
    <BannerHeaderTailer src={bannerHeader} />
  </Container>);
};
