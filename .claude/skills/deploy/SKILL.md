---
name: deploy
description: Musuhi紹介サイトをGitHub Pagesに公開する。mainへのcommit・push、Pagesビルドの完了確認、公開URLの動作確認まで。
---

# deploy — GitHub Pages へ公開

`main` に push すると GitHub Pages が自動でデプロイする。ビルド工程はない。

## 手順

1. 変更内容を確認する:
   ```bash
   git status && git diff
   ```
2. ローカルで表示確認が済んでいることをユーザーに確認する（未確認なら `/update-site` の手順3へ）
3. コミットして push:
   ```bash
   git add -A
   git commit -m "<日本語で簡潔に。動詞から始める>"
   git push origin main
   ```
4. Pages のビルド完了を確認する:
   ```bash
   gh api repos/Musuhi-Voice/Musuhi-web-site/pages/builds/latest --jq '.status'
   # "built" になるまで数十秒待って再実行
   ```
5. 公開URLが200を返し、更新が反映されていることを確認する:
   ```bash
   curl -s -o /dev/null -w "%{http_code}" https://musuhi-voice.github.io/Musuhi-web-site/
   ```
   反映確認は変更した文言で grep するとよい:
   ```bash
   curl -s https://musuhi-voice.github.io/Musuhi-web-site/ | grep -o "<確認したい文言>"
   ```

## 注意

- push = 即・本番公開。確認前に push しない
- CDNキャッシュで反映に最大数分かかることがある
- Pages が未設定の場合は次で有効化できる:
  ```bash
  gh api -X POST repos/Musuhi-Voice/Musuhi-web-site/pages \
    -f "source[branch]=main" -f "source[path]=/"
  ```
