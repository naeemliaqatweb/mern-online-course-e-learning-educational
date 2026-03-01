import React, { useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url }) => {
    const [watchTime, setWatchTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    return (
        <div className="text-center w-full">
            <ReactPlayer
             width="100%" height="500px"
                url={url}
                controls
                onProgress={({ playedSeconds }) => setWatchTime(Math.floor(playedSeconds))}
                onDuration={setTotalDuration}
            />
            <p className="text-center">Watched: {watchTime} sec / {totalDuration} sec</p>
        </div>
    );
};

export default VideoPlayer;
