import {
  Composition,
  staticFile,
  type CalculateMetadataFunction,
} from "remotion";
import { parseMedia } from "@remotion/media-parser";

import { Deepdark } from "./deepdark/Deepdark";
import { Vividlight } from "./vividlight/Vividlight";

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
      durationInSeconds,
    },
  };
};

export const RemotionRoot = () => (
  <>
    <Composition
      id="deepdark"
      component={Deepdark}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={1}
      defaultProps={{
        path: "",
        durationInSeconds: 0,
      }}
      calculateMetadata={calculateMetadata}
    />
  </>
);