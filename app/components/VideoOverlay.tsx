"use client"
import { useEffect, useState } from "react"

type Props = {
  videoUrl: string
  onClose: () => void
}

export default function VideoLock({ videoUrl, onClose }: Props) {
  const [ended, setEnded] = useState(false)

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black z-50 flex flex-col items-center justify-center">
      <video
        src={videoUrl}
        controls={false}
        autoPlay
        disablePictureInPicture
        onEnded={() => setEnded(true)}
        style={{ width: "100%", maxWidth: "800px" }}
      />

      {!ended && (
        <p className="text-white mt-4">NÃO SAIA DESTA TELA <br></br>Assista o Vídeo Completo Para Validar o Cadastro</p>

      )}

      {ended && (
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Fechar vídeo
        </button>
      )}
    </div>
  )
}