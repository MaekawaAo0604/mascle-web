'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const pageId = params.id as string;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    published: false,
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const pageDoc = await getDoc(doc(db, 'pages', pageId));
        if (pageDoc.exists()) {
          const data = pageDoc.data();
          setFormData({
            title: data.title || '',
            slug: data.slug || '',
            content: data.content || '',
            published: data.published || false,
          });
        }
      } catch (error) {
        console.error('ページ取得エラー:', error);
      } finally {
        setFetching(false);
      }
    };

    fetchPage();
  }, [pageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateDoc(doc(db, 'pages', pageId), {
        ...formData,
        updatedAt: serverTimestamp(),
      });

      router.push('/admin/pages');
    } catch (error) {
      console.error('ページ更新エラー:', error);
      alert('更新に失敗しました');
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-center py-8">読み込み中...</div>;
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">ページ編集</h1>

      <form onSubmit={handleSubmit} className="bg-dark-card p-6 rounded-lg border border-dark-border space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            タイトル *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
            URL: /{formData.slug}
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
            {loading ? '更新中...' : '更新'}
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
