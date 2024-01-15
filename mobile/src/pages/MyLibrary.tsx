import { View, useWindowDimensions, Image } from "react-native";
import { Appbar, Button, Icon, Text } from "react-native-paper";
import { useSessionContext } from "../contexts/sessionContext/use";
import { useEffect, useState } from "react";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLibraryQuery } from "client-api";
import Carousel from "react-native-reanimated-carousel";
import { ScrollView } from "react-native-gesture-handler";
import { AudioRecorder } from "../components/AudioRecorder";
import { useAudioContext } from "../contexts/audioContext/use";

export function MyLibraryPage({
  navigation,
}: NativeStackScreenProps<any, "MyLibrary">) {
  const { logout, session } = useSessionContext();
  const [scrolling, setScrolling] = useState(false);

  const { data: library } = useLibraryQuery();

  useEffect(() => {
    if (!session) navigation.replace("Login");
  }, [session, navigation]);

  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMovie = library?.[currentIndex];

  const {
    playAudio,
    loadLocalRecordingsUris,
    localRecordingsUris,
    deleteRecording,
    stopAudio,
    audio,
  } = useAudioContext();

  useEffect(() => {
    if (session) loadLocalRecordingsUris(session);
  }, []);

  const hasRecordingForCurrentMovie =
    currentMovie &&
    (currentMovie.audio ||
      (localRecordingsUris && localRecordingsUris[currentMovie?.id]));

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="My Library" />
        <Appbar.Action icon="magnify" onPress={() => {}} />

        <Appbar.Action
          icon="logout"
          color="red"
          onPress={() => {
            logout();
          }}
        />
      </Appbar.Header>
      <ScrollView
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#eee",
          height: "100%",
        }}
      >
        <View style={{ flex: 1 }}>
          <Carousel
            loop
            onScrollBegin={() => {
              stopAudio();
              setScrolling(true);
            }}
            onScrollEnd={() => setScrolling(false)}
            width={width}
            mode="parallax"
            snapEnabled
            height={550}
            pagingEnabled={false}
            data={library || []}
            scrollAnimationDuration={1000}
            onSnapToItem={setCurrentIndex}
            renderItem={({ item: { poster } }) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: poster }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 16,
                    display: "flex",
                    margin: "auto",
                  }}
                />
              </View>
            )}
          />

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              gap: 4,
            }}
          >
            <Text
              variant="titleLarge"
              style={{ fontWeight: "bold", paddingHorizontal: 8 }}
            >
              {scrolling ? "..." : currentMovie?.title}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Icon source="star" size={24} color="#FCC419" />
              <Text>{scrolling ? "..." : currentMovie?.rating}</Text>
            </View>
            {hasRecordingForCurrentMovie ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  position: "relative",
                  width: "100%",
                }}
              >
                <Button
                  onPress={() =>
                    session &&
                    currentMovie &&
                    deleteRecording(session, currentMovie)
                  }
                  icon="trash-can-outline"
                  style={{
                    display: "flex",
                    marginVertical: 18,
                    backgroundColor: "rgba(254, 109, 142, 1)",
                    marginStart: 10,
                    zIndex: 999,
                    position: "absolute",
                    left: 10,
                    minWidth: 0,
                    borderRadius: 9999,
                  }}
                  labelStyle={{
                    marginHorizontal: 0,
                    paddingVertical: 7,
                    paddingHorizontal: 10,
                    marginVertical: 0,
                    fontSize: 26,
                    color: "black",
                  }}
                >
                  {""}
                </Button>
                <Button
                  onPress={() => {
                    if (audio) {
                      stopAudio();
                      return;
                    }
                    if (session && currentMovie) {
                      playAudio(session, currentMovie);
                    }
                  }}
                  icon={audio ? "stop" : "play"}
                  style={{
                    display: "flex",
                    marginVertical: 18,
                    zIndex: 999,
                    backgroundColor: "rgba(100,100,100,0.1)",
                    minWidth: 0,
                  }}
                  labelStyle={{
                    marginHorizontal: 0,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginVertical: 0,
                    color: "black",
                    fontSize: 32,
                  }}
                >
                  {""}
                </Button>
              </View>
            ) : (
              <AudioRecorder movie={currentMovie} disabled={scrolling} />
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
