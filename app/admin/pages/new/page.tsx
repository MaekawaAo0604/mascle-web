'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function NewPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    published: false,
  });
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">新規ページ作成</h1>

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
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            コンテンツ *
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={15}
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary font-mono text-sm"
            required
            placeholder="Markdownまたはプレーンテキスト"
          />
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
  );
}
