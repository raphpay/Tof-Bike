import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export class FirestoreService {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async getDocument<T>(id: string): Promise<T | null> {
    const docRef = doc(db, this.collectionName, id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;
    return {
      id: snapshot.id,
      ...(snapshot.data() as Omit<T, "id">),
    } as T;
  }

  async getDocuments<T>(): Promise<T[]> {
    const colRef = collection(db, this.collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<T, "id">),
    })) as T[];
  }
}
