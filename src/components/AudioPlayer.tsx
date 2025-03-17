
import { Button } from '@/components/Button';
import { Pause, Play } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  phraseId: number;
}

export default function AudioPlayer({
  phraseId,
}: Readonly<AudioPlayerProps>) {

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);


  function togglePlayPause() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  }


  return (
    <>
      <audio
        controls
        src={`/audios/${phraseId}.mp3`}
        ref={audioRef}
        className='hidden'
        onEnded={() => setIsPlaying(false)}
      ></audio>
      <button
        onClick={togglePlayPause}
        className='bg-gray-950 p-5 rounded-4xl border border-gray-600 hover:border-red-100 hover:cursor-pointer'
      >
        {isPlaying ? <Pause className='text-red-200' size={20} /> : <Play size={20} />}
      </button>
    </>
  );
}
