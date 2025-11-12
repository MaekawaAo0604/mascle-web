'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import MarkdownPreview from '@/components/MarkdownPreview';
import ImageUpload from '@/components/ImageUpload';

export default function NewPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    published: false,
  });
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'pages'), {
        ...formData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      router.push('/admin/pages');
    } catch (error) {
      console.error('ページ作成エラー:', error);
      alert('作成に失敗しました');
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleImageUploaded = (url: string) => {
    // Markdown形式で画像を挿入
    const imageMarkdown = `\n![画像の説明](${url})\n`;
    setFormData({
      ...formData,
      content: formData.content + imageMarkdown,
    });
  };

  return (
    <div className="max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">新規ページ作成</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 編集フォーム */}
        <div>
          <form onSubmit={handleSubmit} className="bg-dark-card p-6 rounded-lg border border-dark-border space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            タイトル *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium mb-2">
            スラッグ *
          </label>
          <input
            type="text"
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
            required
          />
          <p className="text-sm text-gray-400 mt-1">
            URL: /{formData.slug || 'slug'}
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="content" className="block text-sm font-medium">
              コンテンツ * (Markdown対応)
            </label>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="text-sm text-primary hover:text-primary-light"
            >
              {showPreview ? '編集モード' : 'プレビュー'}
            </button>
          </div>

          {/* 画像アップロード */}
          <div className="mb-4">
            <ImageUpload onImageUploaded={handleImageUploaded} />
          </div>

          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={15}
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary font-mono text-sm"
            required
            placeholder="# 見出し1

## 見出し2

画像を追加:
![代替テキスト](画像URL)

リンク:
[リンクテキスト](URL)

- リスト項目1
- リスト項目2

**太字** *イタリック*"
          />
          <p className="text-xs text-gray-500 mt-2">
            Markdown記法が使えます。画像、リンク、見出し、リストなど
          </p>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="w-4 h-4 text-primary bg-dark-bg border-dark-border rounded focus:ring-primary"
          />
          <label htmlFor="published" className="ml-2 text-sm font-medium">
            公開する
          </label>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? '作成中...' : '作成'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>

    {/* プレビュー */}
    <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
      <h2 className="text-xl font-bold mb-4">プレビュー</h2>
      <div className="bg-dark-bg p-6 rounded-lg min-h-[400px]">
        {formData.content ? (
          <MarkdownPreview content={formData.content} />
        ) : (
          <p className="text-gray-500 text-center py-12">
            コンテンツを入力するとプレビューが表示されます
          </p>
        )}
      </div>
    </div>
  </div>
    </div>
  );
}
