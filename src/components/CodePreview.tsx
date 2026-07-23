import { memo, useMemo } from "react";
import { Highlight, type PrismTheme } from "prism-react-renderer";

type Props = {
  loop: boolean;
  speed: number;
  isPlaying: boolean;
};

const noInlineStyleTheme: PrismTheme = {
  plain: {},
  styles: [],
};

function CodePreviewImpl({ loop, speed, isPlaying }: Props) {
  const code = useMemo(
    () => `<Lottie
  lottieRef={lottieRef}
  animationData={animationData}
  loop={${loop}}
  autoplay={false}
/>

lottieRef.current.setSpeed(${speed.toFixed(1)})
lottieRef.current.${isPlaying ? "play()" : "pause()"}`,
    [loop, speed, isPlaying],
  );

  return (
    <Highlight code={code} language="jsx" theme={noInlineStyleTheme}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={`code ${className}`}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export const CodePreview = memo(CodePreviewImpl);
