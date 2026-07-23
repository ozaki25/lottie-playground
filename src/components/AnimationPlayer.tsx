import { useEffect } from "react";
import type { MutableRefObject } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import type { LottieAnimation } from "../types";

type Props = {
  animation: LottieAnimation;
  loop: boolean;
  speed: number;
  lottieRef: MutableRefObject<LottieRefCurrentProps | null>;
};

export function AnimationPlayer({ animation, loop, speed, lottieRef }: Props) {
  useEffect(() => {
    lottieRef.current?.setSpeed(speed);
  }, [speed, animation.id, lottieRef]);

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
