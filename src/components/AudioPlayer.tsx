
import { ArrowFatLeft, ArrowFatRight, Minus, Pause, Play, Plus } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  phraseId: number;
}

export function AudioPlayer({
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

      <Button onClick={togglePlayPause}>
        {isPlaying ? <Pause className='text-red-200' size={20} /> : <Play size={20} />}
      </Button>

    </>
  );
}

interface Props extends React.HTMLAttributes<HTMLButtonElement> { }

function Button(props: Props) {
  return (
    <button
      className='bg-gray-950 p-3 rounded-4xl border border-gray-600 hover:border-red-100 hover:cursor-pointer'
      {...props}
    />
  )
}