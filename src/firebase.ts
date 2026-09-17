import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  signInAnonymously
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  deleteDoc,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { SavedPromptItem, UserProfile } from './types';

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// CRITICAL: The app will break without this line
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Operation Types for error logging
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase connection test: client is offline or rules restricted.');
    } else {
      console.info('Firestore connection initialized.');
    }
    return false;
  }
}

// Auth Helpers
export async function loginWithGoogle(): Promise<FirebaseUser | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (result.user) {
      await syncUserProfile(result.user);
    }
    return result.user;
  } catch (err: unknown) {
    console.error('Google Sign In Error:', err);
    // If popup blocked or cancelled, let caller handle
    throw err;
  }
}

export async function loginAsGuest(): Promise<FirebaseUser | null> {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (err) {
    console.warn('Anonymous login error, using local fallback:', err);
    return null;
  }
}

export async function logoutUser(): Promise<void> {
  await firebaseSignOut(auth);
}

// User Profile Sync
export async function syncUserProfile(user: FirebaseUser, customData?: Partial<UserProfile>): Promise<void> {
  const userRef = doc(db, 'users', user.uid);
  try {
    const existing = await getDoc(userRef);
    if (!existing.exists()) {
      const newProfile: UserProfile = {
        id: user.uid,
        email: user.email || 'guru@sdm16surabaya.sch.id',
        displayName: user.displayName || 'Eko Wahyudi',
        schoolName: customData?.schoolName || 'SD Muhammadiyah 16 Surabaya',
        teacherName: customData?.teacherName || 'Eko Wahyudi',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(userRef, newProfile);
    } else if (customData) {
      await setDoc(userRef, { ...existing.data(), ...customData, updatedAt: new Date().toISOString() }, { merge: true });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
  }
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const userRef = doc(db, 'users', userId);
  try {
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `users/${userId}`);
  }
}

// Saved Prompts Firestore Operations
export async function savePromptToFirestore(userId: string, prompt: Omit<SavedPromptItem, 'id' | 'userId' | 'createdAt'>): Promise<string> {
  const promptId = 'p_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const promptRef = doc(db, 'users', userId, 'savedPrompts', promptId);
  const data: SavedPromptItem = {
    ...prompt,
    id: promptId,
    userId,
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(promptRef, data);
    return promptId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${userId}/savedPrompts/${promptId}`);
  }
}

export async function getSavedPromptsFromFirestore(userId: string): Promise<SavedPromptItem[]> {
  const collectionRef = collection(db, 'users', userId, 'savedPrompts');
  try {
    const q = query(collectionRef);
    const snap = await getDocs(q);
    const list: SavedPromptItem[] = [];
    snap.forEach((docItem) => {
      list.push(docItem.data() as SavedPromptItem);
    });
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `users/${userId}/savedPrompts`);
  }
}

export async function deleteSavedPromptFromFirestore(userId: string, promptId: string): Promise<void> {
  const promptRef = doc(db, 'users', userId, 'savedPrompts', promptId);
  try {
    await deleteDoc(promptRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `users/${userId}/savedPrompts/${promptId}`);
  }
}

// Call connection test on boot
testFirestoreConnection();
