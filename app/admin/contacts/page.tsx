'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Contact } from '@/lib/types';

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const contactsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Contact[];
      setContacts(contactsData);
    } catch (error) {
      console.error('お問い合わせ取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Contact['status']) => {
    try {
      await updateDoc(doc(db, 'contacts', id), { status });
      setContacts(
        contacts.map((contact) =>
          contact.id === id ? { ...contact, status } : contact
        )
      );
    } catch (error) {
      console.error('ステータス更新エラー:', error);
      alert('更新に失敗しました');
    }
  };

  if (loading) {
    return <div className="text-center py-8">読み込み中...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">お問い合わせ管理</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
          <div className="p-4 bg-dark-bg border-b border-dark-border">
            <h2 className="text-xl font-bold">お問い合わせ一覧</h2>
          </div>
          <div className="overflow-y-auto max-h-[600px]">
            {contacts.length === 0 ? (
              <p className="p-6 text-center text-gray-400">
                お問い合わせがありません
              </p>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`p-4 border-b border-dark-border cursor-pointer hover:bg-dark-bg ${
                    selectedContact?.id === contact.id ? 'bg-dark-bg' : ''
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{contact.subject}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        contact.status === 'new'
                          ? 'bg-blue-900/30 text-blue-400'
                          : contact.status === 'in-progress'
                          ? 'bg-yellow-900/30 text-yellow-400'
                          : 'bg-green-900/30 text-green-400'
                      }`}
                    >
                      {contact.status === 'new'
                        ? '新規'
                        : contact.status === 'in-progress'
                        ? '対応中'
                        : '解決済み'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{contact.name}</p>
                  <p className="text-sm text-gray-400">{contact.email}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-dark-card rounded-lg border border-dark-border">
          <div className="p-4 bg-dark-bg border-b border-dark-border">
            <h2 className="text-xl font-bold">詳細</h2>
          </div>
          {selectedContact ? (
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-400">件名</label>
                <p className="font-bold">{selectedContact.subject}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">お名前</label>
                <p>{selectedContact.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">メールアドレス</label>
                <p>{selectedContact.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">お問い合わせ内容</label>
                <p className="whitespace-pre-wrap mt-2 p-4 bg-dark-bg rounded-lg">
                  {selectedContact.message}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">ステータス</label>
                <select
                  value={selectedContact.status}
                  onChange={(e) =>
                    updateStatus(selectedContact.id, e.target.value as Contact['status'])
                  }
                  className="px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
                >
                  <option value="new">新規</option>
                  <option value="in-progress">対応中</option>
                  <option value="resolved">解決済み</option>
                </select>
              </div>
            </div>
          ) : (
            <p className="p-6 text-center text-gray-400">
              お問い合わせを選択してください
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
