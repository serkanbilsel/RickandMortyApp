import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 26,
    backgroundColor: "#dcdcdc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchIcon: {
    padding: 10,
  },
  episodeCard: {
    borderWidth: 1,
    borderColor: "#dddd",
    borderRadius: 11,
    padding: 22,
    marginBottom: 22,
    backgroundColor: "#f0f0f0",
    elevation: 10,
  },
  episodeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  episodeInfo: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  charactersTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  characterCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    elevation: 6,
  },
  characterName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  header: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "blue",
  },
  paginationWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    elevation: 10,
  },
  banner: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
