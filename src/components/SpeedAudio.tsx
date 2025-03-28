import { Minus, Plus } from "@phosphor-icons/react";
import { useRef, useState } from "react";


export function SpeedAudio() {

  const changeSpeed = (amount: number) => {
    const audios = document.querySelectorAll("audio"); // Pega qualquer <audio> no site
    for (const audio of audios) {
      const newSpeed = Math.min(Math.max(audio.playbackRate + amount, 0.5), 3); // Limita entre 0.5x e 3x 
      audio.playbackRate = newSpeed;
      console.log(`Nova velocidade: ${newSpeed.toFixed(1)}x`);
    }
  };

  return (

    <div className="fixed flex flex-col gap-1 bottom-6 right-6">
      <button
        className="bg-gray-900 p-2 rounded-4xl cursor-pointer"
        onClick={() => changeSpeed(0.1)}
      >
        <Plus size={15} />
      </button>
      <button
        className="bg-gray-900 p-2 rounded-4xl cursor-pointer"
        onClick={() => changeSpeed(-0.1)}
      >
        <Minus size={15} />
      </button>
    </div>
  )
}