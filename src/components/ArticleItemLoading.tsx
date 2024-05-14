import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";

export default function ArticleItemLoading() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false, // `backgroundColor` no soporta `useNativeDriver`
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    );

    pulse.start();

    return () => pulse.stop();
  }, [fadeAnim]);

  const backgroundColor = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#e0e0e0", "#c0c0c0"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.leftSideContainer}>
        <Animated.View
          style={[
            styles.skeleton,
            styles.titlePlaceholder,
            { backgroundColor },
          ]}
        />
        <Animated.View
          style={[
            styles.skeleton,
            styles.descriptionPlaceholder,
            { backgroundColor },
          ]}
        />
        <View style={styles.bottomSection}>
          <Animated.View
            style={[
              styles.skeleton,
              styles.authorPlaceholder,
              { backgroundColor },
            ]}
          />
          <Animated.View
            style={[
              styles.skeleton,
              styles.datePlaceholder,
              { backgroundColor },
            ]}
          />
        </View>
      </View>

      <Animated.View
        style={[styles.skeleton, styles.avatarPlaceholder, { backgroundColor }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    borderRadius: 4,
  },
  avatarPlaceholder: {
    height: 100,
    width: 100,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: 16,
  },
  leftSideContainer: {
    flex: 1,
    paddingRight: 10,
  },
  titlePlaceholder: {
    height: 80,
    marginBottom: 4,
  },
  descriptionPlaceholder: {
    height: 40,
    marginBottom: 4,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  authorPlaceholder: {
    height: 20,
    flex: 1,
  },
  datePlaceholder: {
    height: 20,
    flex: 1,
    marginLeft: 10,
  },
  image: {
    borderRadius: 8,
  },
});
