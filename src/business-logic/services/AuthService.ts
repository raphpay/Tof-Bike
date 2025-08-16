import { getAuth, signInWithEmailAndPassword, type Auth } from "firebase/auth";

export class AuthService {
  private auth: Auth;

  constructor() {
    this.auth = getAuth();
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      throw error;
    }
  }
}
