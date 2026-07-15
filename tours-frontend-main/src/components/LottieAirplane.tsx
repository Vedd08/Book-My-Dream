import React from 'react';
import { useLottie } from 'lottie-react';
import airplaneAnimation from '../assets/AirPlane Loading animation.json';

export default function LottieAirplane() {
  const options = {
    loop: true,
    autoplay: true,
    animationData: airplaneAnimation
  };

  const style = {
    width: '100%',
    height: '100%'
  };

  const { View } = useLottie(options, style);

  return <>{View}</>;
}
