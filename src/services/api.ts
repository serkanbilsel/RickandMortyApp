import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  // Diğer özellikler
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  // Diğer özellikler
}

export interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export const getEpisodes = async (page: number = 1): Promise<ApiResponse<Episode>> => {
  try {
    const response = await axios.get(`${BASE_URL}/episode?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error();
  }
};

export const getEpisodeDetails = async (id: number): Promise<Episode> => {
  try {
    const response = await axios.get(`${BASE_URL}/episode/${id}`);
    return response.data;
  } catch (error) {
    throw new Error();
  }
};

// export const getCharacterDetails = async (characterUrls: string[]): Promise<Character[]> => {
//   const characterPromises = characterUrls.map(async (url) => {
//     const response = await axios.get(url);
//     return response.data;
//   });
//   return await Promise.all(characterPromises);
// };

export const getCharacterDetails = async (characterUrls: string[]): Promise<Character[]> => {
  try {
    const characterPromises = characterUrls.map(async (url) => {
      const response = await axios.get(url);
      return response.data;
    });
    const charactersData = await Promise.all(characterPromises);
    return charactersData;
  } catch (error) {
    throw new Error(`Error fetching character details: ${error}`);
  }
};
