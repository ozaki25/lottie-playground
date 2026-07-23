import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import type { LottieAnimation } from "../types";

type Props = {
  animation: LottieAnimation;
  loop: boolean;
  speed: number;
  isPlaying: boolean;
  onPlaybackEnd: () => void;
};

export function AnimationPlayer({ animation, loop, speed, isPlaying, onPlaybackEnd }: Props) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const didFinishRef = useRef(false);

  useEffect(() => {
    lottieRef.current?.setSpeed(speed);
  }, [speed]);

  useEffect(() => {
    if (isPlaying) {
      if (didFinishRef.current) {
        didFinishRef.current = false;
        lottieRef.current?.goToAndPlay(0, true);
      } else {
        lottieRef.current?.play();
      }
    } else {
      lottieRef.current?.pause();
    }
  }, [isPlaying]);

  function handleComplete() {
    didFinishRef.current = true;
    onPlaybackEnd();
  }

  return (
    <div className="canvas">
      <Lottie
        lottieRef={lottieRef}
        animationData={animation.data}
        loop={loop}
        autoplay={false}
        onComplete={handleComplete}
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
}
