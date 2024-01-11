import { useEffect } from "react";
import { View } from "react-native";
import { Button, Icon, Text } from "react-native-paper";
import { useAudioContext } from "../contexts/audioContext/use";
import { useSessionContext } from "../contexts/sessionContext/use";
import { Movie } from "client-api";

type AudioRecorderProps = {
  disabled?: boolean;
  movie?: Movie;
};

export function AudioRecorder({ disabled, movie }: AudioRecorderProps) {
  const { recordingStatus, recording, startRecording, stopRecording } =
    useAudioContext();
  const { session } = useSessionContext();

  useEffect(() => {
    if (recording && disabled) stopRecording(session, movie);
  }, [disabled]);

  useEffect(() => {
    return () => {
      if (recording) stopRecording(session, movie);
    };
  }, []);

  console.log(recordingStatus);

  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        disabled={disabled}
        onPressIn={() => {
          startRecording();
        }}
        onPressOut={() => {
          stopRecording(session, movie);
        }}
        icon="microphone-outline"
        style={{
          display: "flex",
          backgroundColor: "#6CD3AE",
          marginVertical: 18,
          zIndex: 999,
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
      {recording && (
        <View
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            padding: 20,
            gap: 20,
            zIndex: 99,
            backgroundColor: "rgba(18, 21, 61, 0.9)",
            top: -100,
            bottom: 0,
            left: 20,
            right: 20,
            borderRadius: 26,
          }}
        >
          <Text style={{ color: "white" }}>Keep Holding to Record</Text>
          {recordingStatus && (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Icon source="record" size={32} color="red" />
              <Text style={{ color: "white" }}>
                {(recordingStatus.durationMillis / 1000 / 60)
                  .toFixed(0)
                  .padStart(2, "0")}
                :
                {((recordingStatus.durationMillis / 1000) % 60)
                  .toFixed(0)
                  .padStart(2, "0")}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
1000 / 1000;
