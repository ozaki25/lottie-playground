import type { Theme } from "../types";

type Props = {
  theme: Theme;
  onChange: (theme: Theme) => void;
};

export function ThemeSwitch({ theme, onChange }: Props) {
  return (
    <div className="theme-switch" role="group" aria-label="配色">
      <button type="button" aria-pressed={theme === "light"} onClick={() => onChange("light")}>
        ライト
      </button>
      <button type="button" aria-pressed={theme === "dark"} onClick={() => onChange("dark")}>
        ダーク
      </button>
    </div>
  );
}
