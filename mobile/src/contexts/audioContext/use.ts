import type { Movie, Session } from "client-api";
import type { AVPlaybackStatus, Audio } from "expo-av";
import type { AudioSample } from "expo-av/build/Audio";
import { createContext, useContext } from "react";

type OnRecordingStatusUpdate =
  | ((setter: (status: AudioSample) => void | null) => void)
  | null;

export const audioContext = createContext<
  | undefined
  | {
      startRecording: () => Promise<void>;
      stopRecording: (session?: Session, movie?: Movie) => Promise<void>;
      recording: Audio.Recording | undefined;
      recordingStatus: Audio.RecordingStatus | undefined;
      audio: Audio.Sound | undefined;
      playAudio: (
        session: Session,
        movie: Movie
      ) => Promise<OnRecordingStatusUpdate>;
      stopAudio: () => Promise<AVPlaybackStatus> | undefined;
      deleteRecording: (session: Session, movie: Movie) => Promise<boolean>;
      loadLocalRecordingsUris: (session: Session) => void;
      localRecordingsUris: undefined | Record<string, string>;
    }
>(undefined);

export function useAudioContext() {
  const ctx = useContext(audioContext);

  if (!ctx) {
    throw new Error("useAudioContext must be called inside its provider");
  }

  return ctx;
}
