import { Button, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedIcon } from "@/components/animated-icon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { usePostSmthngMutation } from "@/redux/api";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [postSomething] = usePostSmthngMutation();
  const [request, setRequest] = useState("");
  const formData = new FormData();
  formData.set("hello", "world");
  useEffect(() => {
    if (request) {
      const timer = setTimeout(() => {
        setRequest("");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [request]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Welcome to&nbsp;Expo
          </ThemedText>
        </ThemedView>
        {request ? <ThemedText>{JSON.stringify(request)}</ThemedText> : null}
        <ThemedText style={styles.title}>
          Where: https://httpbin.org/post
        </ThemedText>
        <Button
          title="Make a rtkq post request"
          onPress={() => {
            postSomething(formData)
              .unwrap()
              .then((response) => setRequest(response))
              .catch((error) => console.log(JSON.stringify(error, null, 2)));
          }}
        />
        <Button
          title="Make a post request with fetch"
          onPress={async () => {
            const res = await fetch("https://httpbin.org/post", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
            const json = await res.json();
            setRequest(json);
          }}
        />
        {Platform.OS === "web" && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
