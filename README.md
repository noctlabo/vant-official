# VΛNT OFFICIAL — static site

ダンスパフォーマンスチーム VΛNT の公式サイト（デモ）。ビルド不要の静的サイトです。

## 構成

- `index.html` … TOP
- `shop.html` / `product.html` / `cart.html` / `checkout.html` … SHOP（商品28点・カートはブラウザ保存のダミー）
- `schedule.html` / `news.html` / `news-goods.html` … 日程・お知らせ
- `feed*.html` / `archive*.html` … 動画・アーカイブ
- `ally.html` / `lounge.html` / `thread.html` / `photo.html` / `backstage.html` / `login.html` … ΛLLY SIDE
- `live-*.html` … ONLINE LIVE / FAN MEETING / FREE LIVE / STAGE LIVE
- `styles.css` … 全ページ共通スタイル
- `script.js` … 日本語表記ヒント、フィルター、カート処理
- `products.js` … SHOP の商品データ
- `assets/` … ロゴ・写真

すべてのページが同じヘッダー／フッターのマークアップを持つため、共通部分を変更するときは全ページをまとめて編集してください。

## ローカルで見る

```
python3 -m http.server 8000
```

その後 http://localhost:8000/ を開きます。

## GitHub Pages で公開する

1. このフォルダの中身をリポジトリのルートに置く
2. Settings → Pages → Source を `main` / `/ (root)` に設定

`.nojekyll` を同梱しているため、Jekyll の処理は行われません。

## 注記

- 掲載している価格・日程・在庫・投稿などはすべてサンプルデータです。
- ロゴ画像は差し替え不可（支給素材）。配色は BLACK × SILVER × WHITE、メンバーカラーはアクセントのみ（WAKA=SILVER / INA=BLUE #195cff / KUMA=RED #ff2340）。
