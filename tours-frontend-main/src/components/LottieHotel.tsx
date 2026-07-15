import React from 'react';
import { useLottie } from 'lottie-react';
import hotelAnimation from '../assets/Summer Holiday.json';

export default function LottieHotel() {
  const options = {
    loop: true,
    autoplay: true,
    animationData: hotelAnimation
  };

  const style = {
    width: '100%',
    height: '100%'
  };

  const { View } = useLottie(options, style);

  return <>{View}</>;
}
