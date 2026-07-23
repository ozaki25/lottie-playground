import { useLayoutEffect, useState } from "react";
import { AnimationUploader } from "./components/AnimationUploader";
import { AnimationList } from "./components/AnimationList";
import { AnimationPlayer } from "./components/AnimationPlayer";
import { PlayerControls } from "./components/PlayerControls";
import { PlayerErrorBoundary } from "./components/PlayerErrorBoundary";
import { CodePreview } from "./components/CodePreview";
import { ThemeSwitch } from "./components/ThemeSwitch";
import type { LottieAnimation, Theme } from "./types";

function initialTheme(): Theme {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function App() {
  const [animations, setAnimations] = useState<LottieAnimation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const selectedAnimation = animations.find((a) => a.id === selectedId) ?? null;

  function handleAdd(animation: LottieAnimation) {
    setAnimations((prev) => [...prev, animation]);
    setSelectedId(animation.id);
    setIsPlaying(false);
  }

  function handleSelect(id: string) {
    setSelectedId(id);
    setIsPlaying(false);
  }

  function handleRemove(id: string) {
    setAnimations((prev) => prev.filter((a) => a.id !== id));
    if (id === selectedId) {
      setSelectedId(null);
      setIsPlaying(false);
    }
  }

  function handleTogglePlay() {
    setIsPlaying((prev) => !prev);
  }

  function handlePlaybackEnd() {
    setIsPlaying(false);
  }

  return (
    <div className="app">
      <header className="app-bar">
        <div className="wordmark">
          lottie<span>.</span>playground
        </div>
        <div className="app-bar-right">
          <div className="hint">
            {selectedAnimation ? `${selectedAnimation.name} を選択中` : ".json をドロップ、または選択"}
          </div>
          <ThemeSwitch theme={theme} onChange={setTheme} />
        </div>
      </header>

      <div className="workspace">
        <aside className="rail">
          <AnimationList
            animations={animations}
            selectedId={selectedId}
            onSelect={handleSelect}
            onRemove={handleRemove}
          />
          <AnimationUploader variant="compact" onAdd={handleAdd} />
        </aside>

        <main className="stage">
          {selectedAnimation ? (
            <>
              <section className="pane">
                <div className="pane-head">再生</div>
                <PlayerErrorBoundary
                  key={selectedAnimation.id}
                  onError={() => setIsPlaying(false)}
                >
                  <AnimationPlayer
                    animation={selectedAnimation}
                    loop={loop}
                    speed={speed}
                    isPlaying={isPlaying}
                    onPlaybackEnd={handlePlaybackEnd}
                  />
                </PlayerErrorBoundary>
                <PlayerControls
                  isPlaying={isPlaying}
                  onTogglePlay={handleTogglePlay}
                  loop={loop}
                  onToggleLoop={() => setLoop((prev) => !prev)}
                  speed={speed}
                  onSpeedChange={setSpeed}
                />
              </section>
              <section className="pane">
                <div className="pane-head">ソース</div>
                <CodePreview loop={loop} speed={speed} isPlaying={isPlaying} />
              </section>
            </>
          ) : animations.length > 0 ? (
            <section className="pane pane-empty">
              <p className="reselect-message">一覧からアニメーションを選んでください</p>
            </section>
          ) : (
            <section className="pane pane-empty">
              <AnimationUploader variant="empty" onAdd={handleAdd} />
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
