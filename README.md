# lottie-playground

Lottie の JSON ファイルをアップロードして、その場で再生・操作できるプレイグラウンド。
アップロード後は Play/Pause・ループ・再生速度・拡大率を操作できる。

## できること

- Lottie の `.json` ファイルをドラッグ&ドロップ、またはファイル選択でアップロード
- 複数ファイルをアップロードし、一覧から切り替え・削除
- Play/Pause、ループ切り替え、再生速度（0.5x〜2x）、拡大率（50%〜300%）の操作
- ライト/ダークをアプリ内で切り替え（初期値はOSの設定に従う）

アップロードしたファイルや切り替えたテーマはブラウザのメモリ上にのみ保持され、リロードすると消える。

## セットアップ

```bash
npm install
npm run dev
```

`npm run dev` の後、表示されたURL（通常は http://localhost:5173 ）をブラウザで開く。

## その他のコマンド

```bash
npm run build          # 型チェック + 本番ビルド
npm run lint            # oxlint
npm run format          # oxfmt（書き込み）
npm run format:check    # oxfmt（差分チェックのみ）
npm run preview         # ビルド済みの内容をローカルで確認
```

## 使用ライブラリ

- [Vite](https://vitejs.dev/) + React + TypeScript
- [lottie-react](https://github.com/Gamote/lottie-react)（Lottieアニメーションの再生）
- [React Compiler](https://react.dev/learn/react-compiler)（`useCallback`/`useMemo` を手書きせずに自動メモ化）
- [oxlint](https://oxc.rs/docs/guide/usage/linter) / [oxfmt](https://oxc.rs/docs/guide/usage/formatter)（lint・format）
