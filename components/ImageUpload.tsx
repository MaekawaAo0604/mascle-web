'use client';

import { useState, useRef } from 'react';
import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
}

export default function ImageUpload({ onImageUploaded }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ファイルサイズチェック（5MB制限）
    if (file.size > 5 * 1024 * 1024) {
      alert('ファイルサイズが大きすぎます（最大5MB）');
      return;
    }

    // 画像タイプチェック
    if (!file.type.startsWith('image/')) {
      alert('画像ファイルのみアップロード可能です');
      return;
    }

    // プレビュー表示
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Firebase Storageにアップロード
    setUploading(true);
    setUploadProgress(0);

    try {
      // ファイル名をユニークに
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const storageRef = ref(storage, `images/${fileName}`);

      // アップロードタスクを作成
      const uploadTask = uploadBytesResumable(storageRef, file);

      // アップロードの進捗を監視
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('アップロードエラー:', error);
          alert('画像のアップロードに失敗しました: ' + error.message);
          setUploading(false);
          setPreview(null);
          setUploadProgress(0);
        },
        async () => {
          // アップロード完了
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);

          // 親コンポーネントに通知
          onImageUploaded(downloadURL);

          // 成功メッセージ
          alert('画像をアップロードしました！Markdownに挿入されます。');

          setUploading(false);
          setPreview(null);
          setUploadProgress(0);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      );
    } catch (error) {
      console.error('画像アップロードエラー:', error);
      alert(error instanceof Error ? error.message : '画像のアップロードに失敗しました');
      setUploading(false);
      setPreview(null);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors ${
            uploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {uploading ? 'アップロード中...' : '画像を選択'}
        </label>
        <span className="text-sm text-gray-400">
          JPG, PNG, GIF (最大5MB)
        </span>
      </div>

      {preview && (
        <div className="relative w-full max-w-md">
          <img
            src={preview}
            alt="プレビュー"
            className="w-full h-auto rounded-lg border border-dark-border"
          />
          {uploading && (
            <div className="absolute inset-0 bg-dark-bg/80 flex items-center justify-center rounded-lg">
              <div className="text-center w-full px-8">
                <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-sm mb-2">アップロード中...</p>
                <div className="w-full bg-dark-border rounded-full h-2 mb-1">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400">{Math.round(uploadProgress)}%</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
