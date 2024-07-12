import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import EpisodeDetailScreen from "../screens/EpisodeDetailScreen";
import CharacterDetailScreen from "../screens/CharacterDetailScreen";
import FavoritesScreen from "../components/Favorites";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import FavoritesButton from "../components/FavoritesButton";

const Stack = createStackNavigator();

const MainNavigation: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: "Rick and Morty App",
              headerRight: () => <FavoritesButton />, // Özel düğme bileşenini kullanın
            }}
          />
          <Stack.Screen
            name="EpisodeDetail"
            component={EpisodeDetailScreen}
            options={{
              headerTitle: "Episode Detail",
              headerRight: () => <FavoritesButton />,
            }}
          />
          <Stack.Screen
            name="CharacterDetail"
            component={CharacterDetailScreen}
            options={{
              headerTitle: "Character Detail",
              headerRight: () => <FavoritesButton />,
            }}
          />
          <Stack.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{
              headerTitle: "Favorites",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default MainNavigation;
