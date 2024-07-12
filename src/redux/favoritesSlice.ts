import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesState {
  characters: string[];
}

const initialState: FavoritesState = {
  characters: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (state.characters.length < 10) {
        state.characters.push(action.payload);
        AsyncStorage.setItem('favorites', JSON.stringify(state.characters));
      } else {
        // Handle maximum favorites reached notification
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.characters = state.characters.filter(char => char !== action.payload);
      AsyncStorage.setItem('favorites', JSON.stringify(state.characters));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
