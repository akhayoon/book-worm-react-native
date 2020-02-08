import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function BookCount(props) {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{props.title}</Text>
      <Text>{props.count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 20
  }
});
