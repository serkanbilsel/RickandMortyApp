import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: { characters: number[] } = {
  characters: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<number>) => {
      if (state.characters.length < 10) {
        state.characters.push(action.payload);
        AsyncStorage.setItem('favorites', JSON.stringify(state.characters));
      } else {
        
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.characters = state.characters.filter(charId => charId !== action.payload);
      AsyncStorage.setItem('favorites', JSON.stringify(state.characters));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
