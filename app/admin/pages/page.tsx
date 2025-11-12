'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import type { Page } from '@/lib/types';

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const q = query(collection(db, 'pages'), orderBy('updatedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const pagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Page[];
      setPages(pagesData);
    } catch (error) {
      console.error('ページ取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('本当に削除しますか？')) return;

    try {
      await deleteDoc(doc(db, 'pages', id));
      setPages(pages.filter((page) => page.id !== id));
    } catch (error) {
      console.error('削除エラー:', error);
      alert('削除に失敗しました');
    }
  };

  if (loading) {
    return <div className="text-center py-8">読み込み中...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">ページ管理</h1>
        <Link
          href="/admin/pages/new"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          新規作成
        </Link>
      </div>

      <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-dark-bg">
            <tr>
              <th className="px-6 py-4 text-left">タイトル</th>
              <th className="px-6 py-4 text-left">スラッグ</th>
              <th className="px-6 py-4 text-left">公開状態</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {pages.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                  ページがありません
                </td>
              </tr>
            ) : (
              pages.map((page) => (
                <tr key={page.id} className="border-t border-dark-border">
                  <td className="px-6 py-4">{page.title}</td>
                  <td className="px-6 py-4">{page.slug}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        page.published
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {page.published ? '公開' : '下書き'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/admin/pages/${page.id}`}
                      className="text-primary hover:text-primary-light"
                    >
                      編集
                    </Link>
                    <button
                      onClick={() => handleDelete(page.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
