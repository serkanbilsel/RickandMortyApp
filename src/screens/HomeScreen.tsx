import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { getEpisodes } from "../services/api";
import { styles } from "./styles";
import Pagination from "../components/Pagination";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    fetchEpisodeData();
  }, [page]);

  const fetchEpisodeData = async () => {
    try {
      setLoading(true);
      const data = await getEpisodes(page);
      setEpisodes(data.results);
      setTotalPages(data.info.pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Bölümler getirilirken hata oluştu:", error);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleEpisodePress = (episodeId: number) => {
    navigation.navigate("EpisodeDetail", { episodeId });
  };

  const handleTitlePress = (item: any) => {
    handleEpisodePress(item.id);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      Keyboard.dismiss();
      fetchSearchResults();
    }
  };

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://rickandmortyapi.com/api/episode/?name=${encodeURIComponent(
          searchQuery
        )}`
      );
      setSearchResults(response.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Bölüm aranırken hata oluştu:", error);
    }
  };

  const clearSearchResults = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const displayedEpisodes = searchQuery !== "" ? searchResults : episodes;

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/banner.png")}
        style={styles.banner}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleKeyPress}
        />

        <TouchableOpacity onPress={fetchSearchResults}>
          <AntDesign
            style={styles.searchIcon}
            name="search1"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        {searchQuery !== "" && (
          <TouchableOpacity onPress={clearSearchResults}>
            <AntDesign
              style={styles.searchIcon}
              name="close"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={displayedEpisodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.episodeCard}
            onPress={() => handleTitlePress(item)}
          >
            <Text style={styles.episodeTitle}>{item.name}</Text>
            <Text style={styles.episodeInfo}>
              Episode: {item.episode} - Air Date: {item.air_date}
            </Text>
            <Text style={styles.charactersTitle}>Characters:</Text>
            <CharacterList characters={item.characters} />
          </TouchableOpacity>
        )}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </View>
  );
};

const CharacterList: React.FC<{ characters: string[] }> = ({ characters }) => {
  const [charactersData, setCharactersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchCharacters = async () => {
      try {
        const characterPromises = characters.map(async (characterUrl) => {
          const response = await axios.get(characterUrl);
          return response.data;
        });
        const charactersData = await Promise.all(characterPromises);
        setCharactersData(charactersData);
        setLoading(false);
      } catch (error) {
        console.error("Karakterler getirilirken hata oluştu:", error);
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [characters]);

  if (loading) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  return (
    <FlatList
      data={charactersData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <CharacterInfo character={item} />}
      horizontal
    />
  );
};

const CharacterInfo: React.FC<{ character: any }> = ({ character }) => {
  return (
    <View style={styles.characterCard}>
      <Text style={styles.characterName}>{character.name}</Text>
      <Text>Status: {character.status}</Text>
      <Text>Species: {character.species}</Text>
      <Image style={styles.characterImage} source={{ uri: character.image }} />
    </View>
  );
};

export default HomeScreen;
