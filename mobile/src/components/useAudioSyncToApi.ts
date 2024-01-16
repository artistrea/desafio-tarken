import {
  useLibraryQuery,
  useRemoveAudioFromMovieMutation,
  type Movie,
  api,
} from "client-api";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import { useSessionContext } from "../contexts/sessionContext/use";

export function useAudioSyncToApi(
  apiMovies: Movie[] | undefined,
  localRecordings: Record<string, string> | undefined
) {
  const [syncedIds, setSyncedIds] = useState<string[]>([]);

  const { mutateAsync: remove } = useRemoveAudioFromMovieMutation();
  const { refetch } = useLibraryQuery();

  const { session } = useSessionContext();

  async function uploadFile(fileUri: string, movieId: string) {
    FileSystem.uploadAsync(
      `${api.defaults.baseURL}/library-movies/${movieId}/recording`,
      fileUri,
      {
        fieldName: "file",
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        headers: {
          Authorization: session?.access_token || "",
        },
      }
    )
      .then((a) => {
        console.log(a);
        refetch();
      })
      .catch((e) => {
        console.log(e);
      });

    console.log("opa");
  }

  useEffect(() => {
    apiMovies &&
      localRecordings &&
      setSyncedIds(
        apiMovies
          .filter((m) => !localRecordings[m.id] || m.audio?.url)
          .map(({ id }) => id)
      );
  }, [localRecordings, apiMovies]);

  useEffect(() => {
    if (localRecordings)
      apiMovies?.forEach((m) => {
        if (m.audio?.url && !localRecordings[m.id]) {
          // remove(m.id)
        }
        if (!m.audio?.url && localRecordings[m.id]) {
          uploadFile(localRecordings[m.id], m.id);
        }
      });
  }, [localRecordings]);

  return { syncedIds };
}
