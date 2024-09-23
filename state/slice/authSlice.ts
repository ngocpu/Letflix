// src/features/auth/authSlice.ts
import { auth, db } from '@/firebase';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {  signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
interface AuthState {
  user: { uid: string; email: string | null } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

interface AuthCredentials {
  email: string;
  password: string;
}

const serializeUser = (user: User) => ({
  uid: user.uid,
  email: user.email,
});

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      // Thêm kiểm tra người dùng đã xác thực
      if (userCredential.user) {
        await setDoc(doc(db, "users", userCredential.user.uid), {  // Sử dụng UID của người dùng
          listMovies: []
        });
      }
      return serializeUser(userCredential.user);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: AuthCredentials, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return serializeUser(userCredential.user);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuthState = createAsyncThunk(
  'auth/checkAuthState',
  () => {
    return new Promise<{ uid: string; email: string | null } | null>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(serializeUser(user));
        } else {
          resolve(null);
        }
      });
    });
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<{ uid: string; email: string | null }>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to sign up';
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ uid: string; email: string | null }>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to logout';
      })
      .addCase(checkAuthState.fulfilled, (state, action: PayloadAction<{ uid: string; email: string | null } | null>) => {
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
