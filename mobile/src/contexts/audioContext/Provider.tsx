import * as FileSystem from "expo-file-system";
import { PropsWithChildren, useEffect } from "react";
import { Audio } from "expo-av";
import {
  AndroidAudioEncoder,
  AndroidOutputFormat,
  AudioSample,
  IOSAudioQuality,
  IOSOutputFormat,
} from "expo-av/build/Audio";
import { useState } from "react";
import { Movie, Session } from "client-api";
import { audioContext } from "./use";

const audiosDir = (userEmail: string) =>
  FileSystem.cacheDirectory + "desafio-tarken-recordings/" + `${userEmail}/`;
const audioFileUri = (userEmail: string, movieId: string) =>
  audiosDir(userEmail) + `${movieId}.mp3`;
// const gifUrl = (movieId: string) =>
//   `https://media1.giphy.com/media/${movieId}/200.gif`;

export function AudioContextProvider({ children }: PropsWithChildren) {
  const [recording, setRecording] = useState<undefined | Audio.Recording>();
  const [recordingStatus, setRecordingStatus] = useState<
    undefined | Audio.RecordingStatus
  >();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const [sound, setSound] = useState<Audio.Sound>();
  const [localRecordingsUris, setLocalRecordingUris] = useState<
    Record<string, string>
  >({});

  async function loadLocalRecordingsUris(session: Session) {
    await ensureDirExists(session.email);

    FileSystem.readDirectoryAsync(audiosDir(session.email)).then((files) => {
      const ids = files.map((f) => f.replace(".mp3", ""));
      setLocalRecordingUris(
        ids.reduce(
          (pr, id) => ({ ...pr, [id]: audioFileUri(session.email, id) }),
          {}
        )
      );
    });
  }

  function stopAudio() {
    if (sound) {
      setSound(undefined);
      return sound?.unloadAsync();
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          stopAudio();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    recording && sound && sound.unloadAsync();
  }, [recording]);

  async function startRecording() {
    if (recording) return;
    console.log("starting Recording");
    try {
      if (permissionResponse?.status !== "granted") {
        console.log("Requesting permission..");
        const { granted } = await requestPermission();
        if (!granted) return;
      }
      await stopAudio();

      // ios needs this:
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      setRecording(recording);
      await recording.prepareToRecordAsync({
        android: {
          extension: ".mp3",
          outputFormat: AndroidOutputFormat.DEFAULT,
          audioEncoder: AndroidAudioEncoder.DEFAULT,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: ".mp3",
          outputFormat: IOSOutputFormat.MPEGLAYER3,
          audioQuality: IOSAudioQuality.LOW,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {},
      });

      recording.setOnRecordingStatusUpdate((s) => {
        setRecordingStatus(s);
      });

      recording.startAsync();
    } catch (e) {
      console.log("error when recording: " + e);
    }
  }

  async function ensureDirExists(email: string) {
    const dirInfo = await FileSystem.getInfoAsync(audiosDir(email));
    if (!dirInfo.exists) {
      console.log("Audios directory doesn't exist, creating…");
      await FileSystem.makeDirectoryAsync(audiosDir(email), {
        intermediates: true,
      });
    }
  }

  async function stopRecording(
    session: Session | undefined,
    movie: Movie | undefined
  ) {
    try {
      if (recording) {
        if (!session?.email) throw new Error("Tem que estar logado!");

        console.log("Stopping Recording");
        await recording.stopAndUnloadAsync();
        if (!movie) return;
        const tempUri = recording.getURI();

        if (!tempUri) throw new Error("áudio não tem uri temporária");

        await ensureDirExists(session.email);
        await FileSystem.moveAsync({
          from: tempUri,
          to: audioFileUri(session.email, movie.id),
        });

        setLocalRecordingUris((prv) => ({
          ...prv,
          [movie.id]: audioFileUri(session.email, movie.id),
        }));
      }
    } catch (error) {
      console.error("Failed to stop recording1", error);
    }

    setRecording(undefined);
    setRecordingStatus(undefined);
  }

  async function deleteRecording(session: Session, movie: Movie) {
    if (!session?.email) throw new Error("Tem que estar logado!");
    await stopAudio();

    if (!(await hasRecording(session, movie))) return false;

    await FileSystem.deleteAsync(audioFileUri(session.email, movie.id)).catch(
      console.error
    );

    setLocalRecordingUris((prv) => {
      delete prv[movie.id];
      return { ...prv };
    });

    return true;
  }

  const hasRecording = async (session: Session, movie: Movie) => {
    const dirInfo = await FileSystem.getInfoAsync(
      audioFileUri(session.email, movie.id)
    );
    return dirInfo.exists;
  };

  async function playAudio(session: Session, movie: Movie) {
    if (!(await hasRecording(session, movie))) return null;
    await stopAudio();

    console.log("starting to play audio");
    const playbackObject = new Audio.Sound();
    await playbackObject.loadAsync({
      uri: audioFileUri(session.email, movie.id),
    });

    playbackObject.setOnAudioSampleReceived(({}) => {});

    setSound(playbackObject);

    playbackObject.playAsync();

    return (setter: null | ((callback: AudioSample) => void)) =>
      playbackObject.setOnAudioSampleReceived(setter);
  }

  return (
    <audioContext.Provider
      value={{
        audio: sound,
        recording,
        recordingStatus,
        startRecording,
        stopRecording,
        playAudio,
        stopAudio,
        loadLocalRecordingsUris,
        localRecordingsUris,
        deleteRecording,
      }}
    >
      {children}
    </audioContext.Provider>
  );
}
