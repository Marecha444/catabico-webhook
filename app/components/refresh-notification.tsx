"use client"

import { CheckCircle } from "lucide-react"
import { useEffect } from "react"

interface RefreshNotificationProps {
  show: boolean
  onClose: () => void
}

export default function RefreshNotification({ show, onClose }: RefreshNotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed bottom-4 right-4 bg-green-50 border border-green-200 rounded-lg shadow-lg p-3 flex items-center gap-2 animate-fade-in">
      <CheckCircle className="h-5 w-5 text-green-600" />
      <span className="text-green-800 font-medium">Novo código gerado com sucesso!</span>
    </div>
  )
}
