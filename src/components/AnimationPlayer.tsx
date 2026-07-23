import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import type { LottieAnimation } from "../types";

type Props = {
  animation: LottieAnimation;
  loop: boolean;
  speed: number;
  isPlaying: boolean;
};

export function AnimationPlayer({ animation, loop, speed, isPlaying }: Props) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    lottieRef.current?.setSpeed(speed);
  }, [speed]);

  useEffect(() => {
    if (isPlaying) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <div className="canvas">
      <Lottie
        lottieRef={lottieRef}
        animationData={animation.data}
        loop={loop}
        autoplay={false}
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
}
