import type { LottieAnimation } from "../types";

type Props = {
  animations: LottieAnimation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
};

export function AnimationList({ animations, selectedId, onSelect, onRemove }: Props) {
  if (animations.length === 0) {
    return (
      <div className="rail-empty">
        まだアニメーションが
        <br />
        ありません
      </div>
    );
  }

  return (
    <ul className="rail-list">
      {animations.map((animation) => (
        <li
          key={animation.id}
          className={animation.id === selectedId ? "rail-item active" : "rail-item"}
        >
          <button type="button" className="rail-item-select" onClick={() => onSelect(animation.id)}>
            <span className="dot" aria-hidden="true" />
            <span className="name">{animation.name}</span>
          </button>
          <button
            type="button"
            className="remove"
            aria-label={`${animation.name} を削除`}
            onClick={() => onRemove(animation.id)}
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}
