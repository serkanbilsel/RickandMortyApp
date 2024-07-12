import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getEpisodeDetails, getCharacterDetails } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import Pagination from "../components/Pagination";

const EpisodeDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { episodeId } = route.params;
  const [episodeDetail, setEpisodeDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [charactersData, setCharactersData] = useState<any[]>([]);
  const [page, setPage] = useState(1); // State to track current page
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEpisodeDetail = async () => {
      try {
        setLoading(true);
        const episodeData = await getEpisodeDetails(episodeId);
        setEpisodeDetail(episodeData);

        const characters = await getCharacterDetails(episodeData.characters);
        setCharactersData(characters);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Bölüm detayı getirilirken hata oluştu:", err);
        setError(
          "Bölüm detayı getirilirken hata oluştu. Lütfen tekrar deneyin."
        );
      }
    };

    fetchEpisodeDetail();
  }, [episodeId]);

  const handleCharacterPress = (characterId: number) => {
    navigation.navigate("CharacterDetail", { characterId });
  };

  const onNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const onPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Calculate total pages based on charactersData length and desired items per page
  const itemsPerPage = 10; // Adjust according to your pagination needs
  const totalPages = Math.ceil(charactersData.length / itemsPerPage);

  // Slice charactersData based on current page and items per page
  const slicedCharacters = charactersData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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

  return (
    <ScrollView style={styles.container}>
      <Image source={require("../../assets/icon.png")} style={styles.icon} />
      <View style={styles.card}>
        <Text style={styles.title}>Episode: {episodeDetail.name}</Text>
        <Text style={styles.info}>Air Date: {episodeDetail.air_date}</Text>
        <Text style={styles.info}>Episode: {episodeDetail.episode}</Text>
      </View>
      <Text style={styles.charactersTitle}>Characters</Text>
      <FlatList
        data={slicedCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.characterCard}
            onPress={() => handleCharacterPress(item.id)}
          >
            <Image style={styles.characterImage} source={{ uri: item.image }} />
            <Text style={styles.characterName}>{item.name}</Text>
            <Text style={styles.characterInfo}>{item.species}</Text>
            <Text style={styles.characterInfo}>{item.status}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0", // Light grey background for contrast
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 16,
  },
  charactersTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 36,
    marginBottom: 8,
    textAlign: "center",
  },
  characterCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: "center",
    width: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  characterImage: {
    width: 280,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  characterName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
    textAlign: "center",
  },
  characterInfo: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  icon: {
    marginBottom: 50,
    width: 200,
    height: 200,
    marginTop: 10,
    left: 120,
    alignContent: "center",
  },
});

export default EpisodeDetailScreen;
