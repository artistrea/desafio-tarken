import { Movie, Session } from "client-api";
import { Audio } from "expo-av";
import { createContext, useContext } from "react";

export const audioContext = createContext<
  | undefined
  | {
      startRecording: () => Promise<void>;
      stopRecording: (session?: Session, movie?: Movie) => Promise<void>;
      recording: Audio.Recording | undefined;
      recordingStatus: Audio.RecordingStatus | undefined;
      playRecording: (session: Session, movie: Movie) => Promise<boolean>;
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
