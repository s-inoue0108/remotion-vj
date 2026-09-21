import {
  Composition,
  staticFile,
  type CalculateMetadataFunction,
} from "remotion";
import { parseMedia } from "@remotion/media-parser";

import { Wav2VJ } from "./Wav2VJ";
import type { Metadata, Props } from "./types";

const calculateMetadata: CalculateMetadataFunction<Props> = async ({
  props,
}) => {
  const metadataUrl = staticFile(
    `${props.path}/metadata.json`,
  );

  const response = await fetch(metadataUrl);

  if (!response.ok) {
    throw new Error(
      `Failed to load metadata: ${metadataUrl}`,
    );
  }

  const metadata = (await response.json()) as Metadata;

  const audioSrc = staticFile(
    `${props.path}/${metadata.audio}`,
  );

  const media = await parseMedia({
    src: audioSrc,
    fields: {
      durationInSeconds: true,
    },
  });

  if (media.durationInSeconds === null) {
    throw new Error(
      `Could not determine duration of ${audioSrc}`,
    );
  }

  return {
    durationInFrames: Math.ceil(
      media.durationInSeconds * 30,
    ),

    props: {
      ...props,
      metadata,
    },
  };
};

export const RemotionRoot = () => (
  <Composition
    id="wav2vj"
    component={Wav2VJ}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={1}
    defaultProps={{
      path: "",
    }}
    calculateMetadata={calculateMetadata}
  />
);