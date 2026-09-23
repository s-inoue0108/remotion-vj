# Remotion-VJ

DJ Mix オーディオを VJ 動画へレンダリングするツール

## インストール

```bash
npm install
```

## レンダリング

動画：

```bash
npm run render -- sample sample.mp4
```

クリップ画像：

```bash
frame=10
npm run still -- sample sample.png $frame
```

## ディレクトリ構造

```
/public/sample/
├── covers/
│   ├── sample1.jpg
│   └── sample2.png
├── metadata.json
├── theme.json
└── sample.wav
```

`metadata.json` およびテーマカラーの JSON を必要とします：

https://github.com/s-inoue0108/remotion-vj/samples/