import { getVideoMovieApi } from "@/services/TMDBApi";
import { Videos } from "@/types";
import { Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Player = lazy(() => import("react-player"));

const Movie = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<Videos[]>([]);

  useEffect(() => {
    const fetchMovieVideo = async () => {
      try {
        const data = await getVideoMovieApi(Number(id));
        setVideo(data.results);
        console.log(data, "data video");
      } catch (err) {
        throw err;
      } 
    };
    fetchMovieVideo();
  }, [id]);

  const videoUrl = video[1]?.key
    ? `https://www.youtube.com/watch?v=${video[1]?.key}&modestbranding=1`
    : null;

  return (
    <div className="w-full h-screen">
      {videoUrl ? (
        <Suspense fallback={<p>Loading player...</p>}>
          <Player
            url={videoUrl}
            controls={true}
            playing={true}
            width={"100%"}
            height={"100%"}
          />
        </Suspense>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default Movie;
