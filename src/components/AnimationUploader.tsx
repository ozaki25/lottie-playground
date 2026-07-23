import { useRef, useState } from "react";
import type { DragEvent } from "react";
import type { LottieAnimation } from "../types";

type Props = {
  variant: "empty" | "compact";
  onAdd: (animation: LottieAnimation) => void;
};

function looksLikeLottie(data: unknown): data is object {
  return (
    typeof data === "object" &&
    data !== null &&
    Array.isArray((data as { layers?: unknown }).layers)
  );
}

function readAsAnimation(file: File): Promise<LottieAnimation> {
  if (!file.name.toLowerCase().endsWith(".json")) {
    return Promise.reject(new Error(`${file.name} は .json ファイルではありません`));
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      let data: unknown;
      try {
        data = JSON.parse(reader.result as string);
      } catch {
        reject(new Error(`${file.name} を読み込めませんでした（JSONとして解釈できません）`));
        return;
      }
      if (!looksLikeLottie(data)) {
        reject(new Error(`${file.name} は Lottie のアニメーションデータではありません`));
        return;
      }
      resolve({ id: crypto.randomUUID(), name: file.name, data });
    };
    reader.onerror = () => reject(new Error(`${file.name} の読み込みに失敗しました`));
    reader.readAsText(file);
  });
}

export function AnimationUploader({ variant, onAdd }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    try {
      const animation = await readAsAnimation(file);
      setError(null);
      onAdd(animation);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <div
      className={variant === "empty" ? "uploader uploader-empty" : "uploader uploader-compact"}
      data-drag-over={isDragOver || undefined}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        void handleFile(e.dataTransfer.files[0]);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".json,application/json"
        hidden
        onChange={(e) => {
          void handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {variant === "empty" ? (
        <div className="uploader-message">
          <p>
            <strong>Lottie の JSON ファイル</strong>をここにドラッグするか、選んでください
          </p>
          <button type="button" onClick={() => inputRef.current?.click()}>
            ファイルを選択
          </button>
        </div>
      ) : (
        <button type="button" className="rail-add" onClick={() => inputRef.current?.click()}>
          ＋ ファイルを追加
        </button>
      )}
      {error && <p className="uploader-error">{error}</p>}
    </div>
  );
}
