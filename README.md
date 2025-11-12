# 大会公式サイト

Next.js 15 + TypeScript + Tailwind CSS + Firebaseで構築された大会公式ウェブサイト

## 機能

### 公開ページ
- **ホーム**: 大会の概要とメインビジュアル
- **イベント情報**: 開催イベントの一覧と詳細
- **大会について**: 大会の理念や概要
- **FAQ**: よくある質問
- **お問い合わせ**: 問い合わせフォーム

### 管理画面
- **ダッシュボード**: 全体の統計情報
- **イベント管理**: イベントの作成・編集・削除
- **ページ管理**: カスタムページの作成・編集
- **FAQ管理**: FAQの作成・編集・削除
- **お問い合わせ管理**: 問い合わせの閲覧・ステータス管理

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Firebase設定

1. [Firebase Console](https://console.firebase.google.com/)でプロジェクトを作成
2. Firebaseプロジェクトの設定から認証情報を取得
3. `.env.local`ファイルを作成（`.env.local.example`を参考に）

```bash
cp .env.local.example .env.local
```

4. `.env.local`に Firebase の認証情報を設定

### 3. Firebase初期設定

1. Firebase Consoleで**Authentication**を有効化
2. メール/パスワード認証を有効化
3. 最初の管理者ユーザーを手動で作成
4. **Firestore Database**を作成（テストモードで開始）

### 4. 開発サーバー起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 使い方

### 管理画面へのアクセス

1. `/admin/login` にアクセス
2. Firebaseで作成した管理者アカウントでログイン
3. ダッシュボードから各種管理機能を利用

### イベントの追加

1. 管理画面 > イベント管理 > 新規作成
2. タイトル、日時、場所、説明を入力
3. 画像URL（オプション）を追加
4. 作成ボタンをクリック

### ページの追加

1. 管理画面 > ページ管理 > 新規作成
2. タイトル、スラッグ、コンテンツを入力
3. 公開するにチェックを入れる
4. 作成ボタンをクリック

### FAQの追加

1. 管理画面 > FAQ管理 > 新規作成
2. 表示順序、質問、回答を入力
3. 作成ボタンをクリック

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **バックエンド**: Firebase (Authentication, Firestore)
- **デプロイ**: Vercel推奨

## プロジェクト構成

```
mascle_web/
├── app/                    # Next.js App Router
│   ├── admin/             # 管理画面
│   │   ├── dashboard/     # ダッシュボード
│   │   ├── events/        # イベント管理
│   │   ├── pages/         # ページ管理
│   │   ├── faq/           # FAQ管理
│   │   └── contacts/      # お問い合わせ管理
│   ├── events/            # イベント一覧ページ
│   ├── about/             # 大会についてページ
│   ├── faq/               # FAQページ
│   ├── contact/           # お問い合わせページ
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ
│   └── globals.css        # グローバルスタイル
├── components/            # Reactコンポーネント
│   ├── Header.tsx         # ヘッダー
│   └── Footer.tsx         # フッター
├── lib/                   # ユーティリティ
│   ├── firebase.ts        # Firebase設定
│   ├── auth.ts            # 認証関数
│   └── types.ts           # TypeScript型定義
└── public/                # 静的ファイル
```

## デプロイ

### Vercelへのデプロイ

1. Vercelアカウントでリポジトリをインポート
2. 環境変数を設定（`.env.local`の内容）
3. デプロイ実行

### 環境変数の設定（Vercel）

Vercel のプロジェクト設定で以下の環境変数を追加：

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## カスタマイズ

### テーマカラーの変更

`tailwind.config.ts` で primary カラーを変更:

```typescript
colors: {
  primary: {
    DEFAULT: '#dd1f1f',  // メインカラー
    dark: '#a01515',     // ダークバリエーション
    light: '#ff3333',    // ライトバリエーション
  }
}
```

### ロゴの変更

`components/Header.tsx` の「大会ロゴ」テキストを画像に置き換え:

```tsx
<Link href="/" className="text-2xl font-bold text-primary">
  <Image src="/logo.png" alt="大会ロゴ" width={120} height={40} />
</Link>
```

## ライセンス

MIT License
