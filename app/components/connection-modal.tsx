"use client"

import { useEffect } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ConnectionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ConnectionModal({ isOpen, onClose }: ConnectionModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">WhatsApp Conectado!</h2>
          <p className="text-gray-600 mb-6">
            Seu WhatsApp foi conectado com sucesso. Agora você pode fechar esta página.
          </p>
          <Button onClick={onClose} className="bg-[#ff0030] hover:bg-[#cc0026] text-white px-6 py-2">
            Entendi
          </Button>
        </div>
      </div>
    </div>
  )
}
