import Image from 'next/image'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const leftToRight = keyframes`
  from {
    left: -100px;
  }
  50% {
    left: 50%;
  }
  to {
    left: -100px;
  }
`

const leftToRightMobile = keyframes`
  from {
    left: -100px;
  }
  50% {
    left: 25%;
  }
  to {
    left: -100px;
  }
`

const ImageContainer = styled.div`
  position: absolute;
  left: 0px;
  animation: ${spin} 1s linear infinite, ${leftToRight} 8s ease-in-out infinite;

  @media only screen and (max-width: 480px) {
    animation: ${spin} 1s linear infinite,
      ${leftToRightMobile} 5s ease-in-out infinite;
  }
`

const RollingBallImage: React.FC = () => {
  return (
    <ImageContainer>
      <Image
        src='/icons/apple-touch-icon-180x180.png'
        alt="Rofi's icon"
        layout='fixed'
        width='180px'
        height='180px'
        objectFit='contain'
      />
    </ImageContainer>
  )
}

export default RollingBallImage
