import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { Character } from "./types";

const FavoritesScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) {
          const favoriteIds: number[] = JSON.parse(storedFavorites);
          const characterPromises = favoriteIds.map((id) =>
            fetch(`https://rickandmortyapi.com/api/character/${id}`).then(
              (res) => res.json()
            )
          );
          const characters = await Promise.all(characterPromises);
          setFavorites(characters);
        }
      } catch (error) {
        console.error("Favori karakterler alınırken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (
    characterId: number,
    characterName: string
  ) => {
    Alert.alert(
      "Favorilerden Kaldır",
      `${characterName} isimli karakteri favorilerden kaldırmak istediğinize emin misiniz?`,
      [
        {
          text: "Hayır",
          style: "cancel",
        },
        {
          text: "Evet",
          onPress: async () => {
            const updatedFavorites = favorites.filter(
              (character) => character.id !== characterId
            );
            setFavorites(updatedFavorites);
            const updatedFavoriteIds = updatedFavorites.map((char) => char.id);
            await AsyncStorage.setItem(
              "favorites",
              JSON.stringify(updatedFavoriteIds)
            );
          },
        },
      ]
    );
  };
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Characters</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>
          You have no favorite characters yet.
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.favoriteItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.characterImage}
              />
              <View style={styles.characterDetails}>
                <Text style={styles.characterName}>{item.name}</Text>
                <Text style={styles.characterInfo}>
                  {item.species} - {item.status}
                </Text>
                <Text style={styles.characterInfo}>{item.gender}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleRemoveFavorite(item.id, item.name)}
              >
                <FontAwesome name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  characterDetails: {
    flex: 1,
    marginLeft: 10,
  },
  characterName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  characterInfo: {
    fontSize: 16,
    color: "#666",
  },
});

export default FavoritesScreen;
