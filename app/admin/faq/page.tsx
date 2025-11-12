'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import type { FAQ } from '@/lib/types';

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      const faqsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FAQ[];
      setFaqs(faqsData);
    } catch (error) {
      console.error('FAQ取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('本当に削除しますか？')) return;

    try {
      await deleteDoc(doc(db, 'faqs', id));
      setFaqs(faqs.filter((faq) => faq.id !== id));
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
        <h1 className="text-3xl font-bold">FAQ管理</h1>
        <Link
          href="/admin/faq/new"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          新規作成
        </Link>
      </div>

      <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-dark-bg">
            <tr>
              <th className="px-6 py-4 text-left">順序</th>
              <th className="px-6 py-4 text-left">質問</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {faqs.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                  FAQがありません
                </td>
              </tr>
            ) : (
              faqs.map((faq) => (
                <tr key={faq.id} className="border-t border-dark-border">
                  <td className="px-6 py-4">{faq.order}</td>
                  <td className="px-6 py-4">{faq.question}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/admin/faq/${faq.id}`}
                      className="text-primary hover:text-primary-light"
                    >
                      編集
                    </Link>
                    <button
                      onClick={() => handleDelete(faq.id)}
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
