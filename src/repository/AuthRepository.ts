import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Resource } from '../core/resource';
import { User } from '../model/user';




class AuthRepository {
  private usersCollection = firestore().collection('users');

  async loginWithEmail(email: string, password: string): Promise<Resource<User>> {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (!user) return { type: 'error', message: 'User not found' };
      return await this.getUserData(user.uid);
    } catch (error: any) {
      return { type: 'error', message: error.message || 'Login failed' };
    }
  }

  async signUpWithEmail(
    name: string,
    email: string,
    password: string,
    address: string
  ): Promise<Resource<User>> {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (!user) return { type: 'error', message: 'User creation failed' };
      
      const newUser: User = { uid: user.uid, name, email, address };
      await this.saveUserData(newUser);
      
      return { type: 'success', data: newUser };
    } catch (error: any) {
      return { type: 'error', message: error.message || 'Signup failed' };
    }
  }

  private async getUserData(uid: string): Promise<Resource<User>> {
    try {
      const document = await this.usersCollection.doc(uid).get();
      // FIX: Use .exists property instead of .exists() method
      return document.exists() 
        ? { type: 'success', data: document.data() as User }
        : { type: 'success', data: { uid, name: '', email: '', address: '' } };
    } catch (error: any) {
      return { type: 'error', message: error.message || 'Failed to fetch user data' };
    }
  }

  private async saveUserData(user: User): Promise<void> {
    await this.usersCollection.doc(user.uid).set(user);
  }

  async getCurrentUserWithAddress(): Promise<User | null> {
    const user = auth().currentUser;
    if (!user) return null;
    
    try {
      const result = await this.getUserData(user.uid);
      if (result.type === 'success') return result.data;
      return { uid: user.uid, name: user.displayName || '', email: user.email || '', address: '' };
    } catch {
      return { uid: user.uid, name: user.displayName || '', email: user.email || '', address: '' };
    }
  }

  signOut(): Promise<void> {
    return auth().signOut();
  }

  async updateUserAddress(uid: string, newAddress: string): Promise<Resource<void>> {
    try {
      await this.usersCollection.doc(uid).update({ address: newAddress });
      return { type: 'success', data: undefined };
    } catch (error: any) {
      return { type: 'error', message: error.message || 'Failed to update address' };
    }
  }
}

// Export a singleton instance
export default new AuthRepository();