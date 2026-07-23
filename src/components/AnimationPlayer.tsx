import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import type { LottieAnimation } from "../types";

type Props = {
  animation: LottieAnimation;
  loop: boolean;
  speed: number;
  zoom: number;
  isPlaying: boolean;
  onPlaybackEnd: () => void;
};

const baseSize = 200;

export function AnimationPlayer({ animation, loop, speed, zoom, isPlaying, onPlaybackEnd }: Props) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const didFinishRef = useRef(false);

  useEffect(() => {
    lottieRef.current?.setSpeed(speed);
  }, [speed]);

  useEffect(() => {
    lottieRef.current?.animationItem?.setLoop(loop);
  }, [loop]);

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

  const size = baseSize * zoom;

  return (
    <div className="canvas">
      <Lottie
        lottieRef={lottieRef}
        animationData={animation.data}
        loop
        autoplay={false}
        onComplete={handleComplete}
        // style is applied straight to a plain div inside lottie-react, not read by any
        // effect dependency there, so a fresh object each render costs nothing here
        // oxlint-disable-next-line react-perf/jsx-no-new-object-as-prop
        style={{ width: size, height: size }}
      />
    </div>
  );
}
