import {
  Composition,
  staticFile,
  type CalculateMetadataFunction,
} from "remotion";
import { parseMedia } from "@remotion/media-parser";
import { Audio2VJ } from "./audio2vj/Audio2VJ";

import type { Metadata, Props, Theme } from "./types";
import { getStaticData } from "./utils/getter";

const calculateMetadata: CalculateMetadataFunction<Props> = async ({
  props,
}) => {
  const metadata = await getStaticData(`${props.path}/metadata.json`) as Metadata;
  const theme = await getStaticData(`${props.path}/${metadata.theme}`) as Theme;
  const audioSrc = staticFile(`${props.path}/${metadata.audio}`,);

  const media = await parseMedia({
    src: audioSrc,
    fields: {
      durationInSeconds: true,
    },
    acknowledgeRemotionLicense: true
  });

  if (media.durationInSeconds === null) {
    throw new Error(
      `Could not determine duration of ${audioSrc}`,
    );
  }

  const durationInSeconds = media.durationInSeconds

  return {
    durationInFrames: Math.ceil(
      durationInSeconds * 30,
    ),

    props: {
      ...props,
      metadata,
      theme,
      audioSrc,
      durationInSeconds,
    },
  };
};

export const RemotionRoot = () => (
  <Composition
    id="audio2vj"
    component={Audio2VJ}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={1}
    defaultProps={{
      path: "",
      audioSrc: "",
      durationInSeconds: 0,
    }}
    calculateMetadata={calculateMetadata}
  />
);