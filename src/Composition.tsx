import {
  Composition,
  type CalculateMetadataFunction,
} from "remotion";
import { parseMedia } from "@remotion/media-parser";
import { staticFile } from "remotion";
import { AudioVisualizer } from "./AudioVisualizer";

type Props = {
  audioFile: string;
};

const calculateMetadata: CalculateMetadataFunction<Props> = async ({
  props,
}) => {
  const metadata = await parseMedia({
    src: staticFile(props.audioFile),
    fields: {
      durationInSeconds: true,
    },
  });

  if (metadata.durationInSeconds === null) {
    throw new Error(
      `Could not determine duration of ${props.audioFile}`,
    );
  }

  return {
    durationInFrames: Math.ceil(
      metadata.durationInSeconds * 30,
    ),
  };
};

export const RemotionRoot = () => {
  return (
    <Composition
      id="AudioVisualizer"
      component={AudioVisualizer}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={1}
      defaultProps={{
        audioFile: "foo.wav",
      }}
      calculateMetadata={calculateMetadata}
    />
  );
};