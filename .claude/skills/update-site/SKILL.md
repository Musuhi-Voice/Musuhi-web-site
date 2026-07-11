---
name: update-site
description: Musuhi紹介サイトの文言・セクション・スタイルを更新する。編集箇所の特定、デザイントークンの遵守、ローカル確認までの手順。
---

# update-site — サイト更新

Musuhi LP（index.html / assets/）を安全に更新するための手順。

## 手順

1. **変更内容をユーザーに確認する**（文言変更か、セクション追加か、スタイル調整か）
2. 該当箇所を編集する（下の「どこに何があるか」を参照）
3. ローカルで表示確認する:
   ```bash
   python3 -m http.server 8080
   # → http://localhost:8080 をユーザーに確認してもらう
   ```
   またはヘッドレスChromeでスクリーンショット（CLAUDE.md参照）を撮り、デスクトップ(1440px)を目視確認する
4. 確認が取れたら `/deploy` で公開する（勝手に push しない）

## どこに何があるか（index.html のセクション）

| セクション | id / class | 内容 |
| --- | --- | --- |
| ヘッダー | `.site-header` | ロゴ・ナビ・CTAボタン |
| ヒーロー | `.hero` | 縦書き見出し・リード文・CTA・水引コードSVG |
| 課題 | `#problem` | 「記録は増えたのに、感情は残っていない。」 |
| 創業ストーリー | `#story` | カセットテープSVG・引用・Founder署名（紺背景） |
| できること | `#features` | 残す／振り返る／つなぐ の3カード |
| 使い方 | `#how` | 3ステップ |
| β版・コミュニティ | `#community` | Well-being Lab カード（Discord招待はmailto） |
| 最終CTA | `#start` | 蝶結びSVG・signupへの導線 |
| フッター | `.site-footer` | リンク・コピーライト |

## 編集時のルール

- 色は必ず `style.css` の `:root` トークン（`--ruri` `--kin` など）を使う。hex直書き禁止
- 新しいテキストブロックにフェードインを付けるなら `class="reveal"` を足すだけでよい
- SVGの線画アニメーションは `class="draw-path"` を付けると自動で描画される
- 縦書き見出し（`.hero__title`）の行は `<span class="hero__title-line">` 単位。行を増やす場合は高さ（`height`）の調整が必要
- アプリへのリンク先: 新規登録 `https://www.musuhi-voice.com/signup` ／ アプリ `https://www.musuhi-voice.com/`
- コミュニティ連絡先: `voice.message.gift.musuhi@gmail.com`
- OGP（`<meta property="og:*">`）はキャッチコピーを変えたら合わせて更新する
