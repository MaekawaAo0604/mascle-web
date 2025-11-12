import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from './firebase';

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error instanceof Error ? error.message : 'ログインに失敗しました' };
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'ログアウトに失敗しました' };
  }
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};
