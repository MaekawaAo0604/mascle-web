import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Firebase設定
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebaseアプリを初期化（まだ初期化されていない場合）
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export async function POST(request: NextRequest) {
  try {
    console.log('[Upload API] Request received');
    console.log('[Upload API] Firebase config:', {
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
      hasApiKey: !!firebaseConfig.apiKey,
    });

    // 認証チェック（オプション）
    const authHeader = request.headers.get('authorization');
    console.log('[Upload API] Auth header:', authHeader ? 'present' : 'not present');

    // FormDataから画像を取得
    console.log('[Upload API] Parsing FormData...');
    const formData = await request.formData();
    const file = formData.get('file') as File;
    console.log('[Upload API] File received:', file ? `${file.name} (${file.size} bytes, ${file.type})` : 'null');

    if (!file) {
      console.log('[Upload API] Error: No file provided');
      return NextResponse.json(
        { error: 'ファイルがありません' },
        { status: 400 }
      );
    }

    // ファイルサイズチェック（5MB制限）
    if (file.size > 5 * 1024 * 1024) {
      console.log('[Upload API] Error: File too large');
      return NextResponse.json(
        { error: 'ファイルサイズが大きすぎます（最大5MB）' },
        { status: 400 }
      );
    }

    // 画像タイプチェック
    if (!file.type.startsWith('image/')) {
      console.log('[Upload API] Error: Invalid file type');
      return NextResponse.json(
        { error: '画像ファイルのみアップロード可能です' },
        { status: 400 }
      );
    }

    // ファイル名をユニークに
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    console.log('[Upload API] Generated filename:', fileName);

    // Firebase Storageにアップロード
    console.log('[Upload API] Initializing Firebase Storage...');
    const storage = getStorage(app);
    console.log('[Upload API] Storage instance created');
    const storageRef = ref(storage, `images/${fileName}`);
    console.log('[Upload API] Storage ref created:', `images/${fileName}`);

    // FileをArrayBufferに変換
    console.log('[Upload API] Converting file to buffer...');
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log('[Upload API] Buffer created:', buffer.length, 'bytes');

    // メタデータ
    const metadata = {
      contentType: file.type,
    };
    console.log('[Upload API] Metadata:', metadata);

    // アップロード
    console.log('[Upload API] Uploading to Firebase Storage...');
    await uploadBytes(storageRef, buffer, metadata);
    console.log('[Upload API] Upload complete');

    // URLを取得
    console.log('[Upload API] Getting download URL...');
    const downloadURL = await getDownloadURL(storageRef);
    console.log('[Upload API] Download URL:', downloadURL);

    return NextResponse.json({ url: downloadURL });
  } catch (error) {
    console.error('[Upload API] Error occurred:', error);
    console.error('[Upload API] Error details:', {
      name: (error as Error).name,
      message: (error as Error).message,
      stack: (error as Error).stack
    });
    return NextResponse.json(
      { error: 'アップロードに失敗しました', details: (error as Error).message },
      { status: 500 }
    );
  }
}
