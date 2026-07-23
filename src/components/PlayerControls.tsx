type Props = {
  isPlaying: boolean;
  onTogglePlay: () => void;
  loop: boolean;
  onToggleLoop: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
};

export function PlayerControls({
  isPlaying,
  onTogglePlay,
  loop,
  onToggleLoop,
  speed,
  onSpeedChange,
}: Props) {
  return (
    <div className="controls">
      <button
        type="button"
        className="play-btn"
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "一時停止" : "再生"}
        onClick={onTogglePlay}
      >
        <span className={isPlaying ? "icon icon-pause" : "icon icon-play"} aria-hidden="true" />
      </button>

      <button
        type="button"
        className={loop ? "loop-toggle on" : "loop-toggle"}
        aria-pressed={loop}
        onClick={onToggleLoop}
      >
        <span className="box" aria-hidden="true" />
        ループ
      </button>

      <div className="speed">
        <label htmlFor="speed-range">速度</label>
        <input
          id="speed-range"
          type="range"
          min={0.5}
          max={2}
          step={0.1}
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
        />
        <span className="value">{speed.toFixed(1)}×</span>
      </div>
    </div>
  );
}
