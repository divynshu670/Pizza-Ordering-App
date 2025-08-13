import { create } from 'zustand';
import AuthRepository, { User, Resource } from '../repository/AuthRepository';

type AuthState = {
  user: User | null;
  loginState: Resource<User> | null;
  signupState: Resource<User> | null;
  updateState: Resource<void> | null;
  refreshUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, address: string) => Promise<void>;
  logout: () => Promise<void>;
  updateAddress: (uid: string, newAddress: string) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loginState: null,
  signupState: null,
  updateState: null,

  refreshUser: async () => {
    const user = await AuthRepository.getCurrentUserWithAddress();
    set({ user });
  },

  login: async (email: string, password: string) => {
  // Step 1: Set loading state
  set({ loginState: { type: 'loading' } });

  try {
    // Step 2: Call the repository method
    const result = await AuthRepository.loginWithEmail(email, password);

    // Step 3: Check the type of result
    if (result.type === 'success') {
      set({ loginState: result, user: result.data });
    } else if (result.type === 'error') {
      // Custom error case from repository
      set({ loginState: { type: 'error', message: result.message } });
    }
  } catch (error: any) {
    // Step 4: Handle unexpected errors (e.g. network, crash)
    let errorMessage = 'Something went wrong';

    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email format.';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Invalid credentials provided.';
        break;
      default:
        if (error.message) errorMessage = error.message;
        break;
    }

    set({ loginState: { type: 'error', message: errorMessage } });
  }
},


  signup: async (name: string, email: string, password: string, address: string) => {
    set({ signupState: { type: 'loading' } });
    const result = await AuthRepository.signUpWithEmail(name, email, password, address);
    set({ signupState: result });
    
    if (result.type === 'success') {
      set({ user: result.data });
    }
  },

  logout: async () => {
    await AuthRepository.signOut();
    set({ user: null, loginState: null, signupState: null });
  },

  updateAddress: async (uid: string, newAddress: string) => {
    set({ updateState: { type: 'loading' } });
    const result = await AuthRepository.updateUserAddress(uid, newAddress);
    set({ updateState: result });
    
    if (result.type === 'success') {
      set(state => ({
        user: state.user ? { ...state.user, address: newAddress } : null
      }));
    }
  }
}));