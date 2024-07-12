// src/components/FavoritesButton.tsx
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const FavoritesButton: React.FC = () => {
  const navigation = useNavigation();

  const navigateToFavorites = () => {
    navigation.navigate("Favorites");
  };

  return (
    <TouchableOpacity style={styles.headerButton} onPress={navigateToFavorites}>
      <FontAwesome name="star" size={24} color="red" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 20,
  },
});

export default FavoritesButton;
