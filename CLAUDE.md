# Musuhi-web-site — Claude Code 指示書

Musuhi（音声ジャーナリングアプリ / https://www.musuhi-voice.com/ ）の紹介ランディングページ。
GitHub Pages で公開する静的サイトです。ビルド工程はありません。

- 公開URL: https://musuhi-voice.github.io/Musuhi-web-site/
- 公開方法: `main` ブランチの root を GitHub Pages が配信（push すると自動デプロイ）

## ファイル構成

```
index.html          # ページ本体（1ページ構成）
assets/css/style.css  # スタイル（デザイントークンは :root に集約）
assets/js/main.js     # スクロール演出・水引コードの描画アニメーション
assets/img/           # favicon.svg など
.nojekyll             # Jekyll 処理を無効化（そのまま配信）
.claude/skills/       # update-site / deploy Skill
```

## デザインの決まりごと

このLPのデザインは意図を持って固定されています。変更時は必ず踏襲すること。

- **カラー**（`style.css` の `:root` で定義。ハードコードせずトークンを使う）
  - `--ruri` #1b3c9c 瑠璃（水引の青・主役）／ `--ruri-deep` hover
  - `--yoru` #0f1b45 夜（ストーリー・フッター背景）
  - `--ink` 本文 ／ `--mist` 補足 ／ `--kasumi` 罫線 ／ `--hakuji` #f7f8fc ページ背景
  - `--kin` #c4a45f 金（差し色。多用しない）
- **書体**: 見出し・本文UIとも Zen Kaku Gothic New（Windows は Meiryo にフォールバック）／ 欧文 = Inter（Google Fonts）。
  見出しは `--font-heading`、本文は `--font-gothic` トークンを使う（明朝体は2026-07に廃止済み）
- **署名的要素**: 「声の波形が水引の結びになる」SVGコード（ヒーロー）と、最終CTAの蝶結び。
  ヒーローの縦書き見出し（`writing-mode: vertical-rl`）もアイデンティティの一部。
- **モーション**: `.reveal`（IntersectionObserver でフェードイン）と `.draw-path`（線の描画）。
  `prefers-reduced-motion` を必ず尊重する（main.js / style.css 両方に分岐あり）。
- アプリへの導線は https://www.musuhi-voice.com/signup（新規登録）と https://www.musuhi-voice.com/（アプリ）。

## 動作確認

ローカルプレビュー: `python3 -m http.server 8080` をリポジトリ root で実行し http://localhost:8080 を開く。
ヘッドレス確認（macOS）:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --hide-scrollbars --window-size=1440,7200 --virtual-time-budget=9000 \
  --screenshot=/tmp/lp.png "file://$PWD/index.html"
```

注意: macOS の headless Chrome はウィンドウ最小幅（約500px）があるため、モバイル幅の確認は
390px幅の iframe に読み込むデバッグHTMLを使うか、実機/DevToolsで行う。

## 運用ルール

1. `main` に push すると即・本番公開される。公開前に必ずローカルで表示確認する
2. 文言変更はこのリポジトリ内で完結（アプリ本体は別リポジトリ Musuhi-Web）
3. 外部CDNは Google Fonts のみ。新たな外部依存を追加しない
4. コミットメッセージは日本語で簡潔に。動詞から始める

## Skills

| Skill | 用途 |
| --- | --- |
| `/update-site` | 文言・セクション・スタイルの更新手順（確認込み） |
| `/deploy` | main へ push して GitHub Pages に公開、配信確認まで |
