import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";
import { RootState } from "../redux/store"; // RootState import edilmeli
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

const BASE_URL = "https://rickandmortyapi.com/api";

interface CharacterDetailProps {
  route: any;
}

const CharacterDetailScreen: React.FC<CharacterDetailProps> = ({ route }) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false); // Favori durumu için state
  const dispatch = useDispatch(); // useDispatch hook'unu kullanarak dispatch fonksiyonunu alıyoruz
  const favorites: number[] = useSelector(
    (state: RootState) => state.favorites.characters
  ); // favorites dizisine number[] türü atanmış

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/character/${characterId}`
        );
        setCharacter(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Karakter detayı getirilirken hata oluştu:", err);
        setError(
          "Karakter detayı getirilirken hata oluştu. Lütfen tekrar deneyin."
        );
      }
    };

    fetchCharacterDetail();
  }, [characterId]);

  useEffect(() => {
    // Karakterin favorilerde olup olmadığını kontrol et
    const checkFavoriteStatus = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) {
          const favoriteIds: number[] = JSON.parse(storedFavorites); // favoriteIds number[] türüne atanmış
          setIsFavorite(favoriteIds.includes(characterId));
        }
      } catch (error) {
        console.error("Favori durumu kontrol edilirken hata oluştu:", error);
      }
    };

    checkFavoriteStatus();
  }, [characterId]);

  // Favori ekleme işlemi
  const handleAddFavorite = async () => {
    if (favorites.length >= 10) {
      Alert.alert(
        "Favori Ekleme Limiti",
        "Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız."
      );
      return;
    }
    dispatch(addFavorite(characterId));
    setIsFavorite(true); // Favori durumunu true yap
    await AsyncStorage.setItem(
      "favorites",
      JSON.stringify([...favorites, characterId])
    );
  };

  // Favori kaldırma işlemi
  const handleRemoveFavorite = async (id: number) => {
    dispatch(removeFavorite(id));
    setIsFavorite(false);
    const updatedFavorites = favorites.filter((favId) => favId !== id);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!character) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.characterImage}
            source={{ uri: character.image }}
          />
        </View>
        <Text style={styles.characterName}>
          {character.name}

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={
              isFavorite
                ? () => handleRemoveFavorite(characterId)
                : handleAddFavorite
            }
          >
            <FontAwesome
              name={isFavorite ? "heart" : "heart-o"}
              size={29}
              color={isFavorite ? "red" : "#333"}
            />
          </TouchableOpacity>
        </Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Species:</Text>
            <Text style={styles.infoValue}>{character.species}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={styles.infoValue}>{character.status}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Type:</Text>
            <Text style={styles.infoValue}>{character.type || "Unknown"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gender:</Text>
            <Text style={styles.infoValue}>{character.gender}</Text>
          </View>
          <Text style={styles.infoLabel}>Origin:</Text>
          <TouchableOpacity>
            <Text style={styles.infoValue}>{character.origin.name}</Text>
          </TouchableOpacity>
          <Text style={styles.infoLabel}>Location:</Text>
          <TouchableOpacity>
            <Text style={styles.infoValue}>{character.location.name}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.episodeTitle}>Episodes:</Text>
        <ScrollView
          horizontal
          contentContainerStyle={styles.episodeContainer}
          showsHorizontalScrollIndicator={false}
        >
          {character.episode.map((episode: string, index: number) => (
            <View key={index} style={styles.episodeLink}>
              <Text style={styles.episodeText}>{`Episode ${index + 1}`}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  characterImage: {
    resizeMode: "contain",
    flex: 1,
    aspectRatio: 1, // Your aspect ratio
  },
  characterName: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  infoContainer: {
    width: "80%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 22,
    backgroundColor: "#fff",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  episodeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  episodeContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  episodeLink: {
    marginHorizontal: 5,
    backgroundColor: "#0066cc",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  episodeText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  favoriteButton: {
    position: "absolute",
    top: "50%", // Karakter isminin altında olacak şekilde düzenlendi
    right: 20, // Sağ tarafta kalacak şekilde ayarlandı

    zIndex: 1, // Resmin üzerine gelecek şekilde ayarlandı
    paddingHorizontal: 20,
  },
});

export default CharacterDetailScreen;
