# Musuhi-web-site

音声ジャーナリングアプリ **Musuhi**（https://www.musuhi-voice.com/ ）の紹介ランディングページです。
GitHub Pages で公開しています。

- 公開URL: **https://musuhi-voice.github.io/Musuhi-web-site/**
- 静的サイト（HTML / CSS / JS のみ、ビルド不要）
- `main` ブランチに push すると自動でデプロイされます

## ローカルプレビュー

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## 構成

```
index.html            # ページ本体（1ページ構成のLP）
assets/css/style.css  # スタイル（デザイントークンは :root）
assets/js/main.js     # スクロール演出・水引コード描画
assets/img/           # favicon など
.claude/skills/       # Claude Code 用 Skill（update-site / deploy）
```

## 更新の仕方（Claude Code）

このリポジトリで Claude Code を開き、次の Skill を使ってください。

| Skill | 用途 |
| --- | --- |
| `/update-site` | 文言・セクション・スタイルの更新（ローカル確認まで） |
| `/deploy` | main へ push して公開、配信確認まで |

デザインの決まりごと（カラー・書体・モチーフ）は [`CLAUDE.md`](./CLAUDE.md) を参照。

---

One Moment. One Voice. — © 2026 Musuhi
