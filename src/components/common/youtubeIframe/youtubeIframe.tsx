import React, { useEffect, useState } from 'react';

const YoutubeIframe = () => {
  const [player, setPlayer] = useState<any>(null);

  const onPlayerReady = (event: any) => {
    // setLoading(false);
  };

  const onPlayerStateChange = (event: any) => {
    // console.log('player state change:' + event.target.getPlayerState());
    if (event.data === (window as any).YT.PlayerState.PLAYING) {
      // Youtube 영상 재생 시
    } else if (event.data === (window as any).YT.PlayerState.ENDED) {
      // Youtube 영상 종료 시
    }
  };

  const handleYoutubePlayer = (videoId: string) => {
    const player = new (window as any).YT.Player(videoId, {
      height: '360',
      width: '640',
      videoId: 'M7lc1UVf-VE',
      playerVars: { controls: 0, origin: window.location.href },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
    setPlayer(player);
  };

  // youtube iframe API 인스턴스를 리엑트 상태 변수에 저장
  useEffect(() => {
    if (!(window as any).onYTReady) {
      console.log('onYouTubeIframeAPIReady');
      (window as any).onYouTubeIframeAPIReady = () => {
        handleYoutubePlayer('ytplayer');
      };
    } else {
      handleYoutubePlayer('ytplayer');
    }

    return () => setPlayer(null);
  }, []);

  return <h1>youtube iframe</h1>;
};

export default YoutubeIframe;
