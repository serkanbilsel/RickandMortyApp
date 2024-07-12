import { EvilIcons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { PaginationProps } from "./types";

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onNextPage,
  onPrevPage,
}) => {
  return (
    <View style={styles.pagination}>
      <TouchableOpacity onPress={onPrevPage} disabled={page === 1}>
        <EvilIcons
          name="chevron-left"
          size={50}
          color={page === 1 ? "gray" : "black"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNextPage} disabled={page === totalPages}>
        <EvilIcons
          name="chevron-right"
          size={50}
          color={page === totalPages ? "gray" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 29,
    width: "100%",
    backgroundColor: "fff",
  },
});

export default Pagination;
