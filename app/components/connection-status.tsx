"use client"

import { useEffect, useState } from "react"
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { checkInstanceStatus } from "../actions"

interface ConnectionStatusProps {
  isVisible: boolean
  onStatusChange?: (connected: boolean) => void
  instanceId: string
  instanceToken: string
}

export default function ConnectionStatus({ isVisible, onStatusChange, instanceId, instanceToken }: ConnectionStatusProps) {
  const [status, setStatus] = useState<{
    success: boolean
    connected: boolean
    smartphoneConnected: boolean
    error?: string
    message?: string
  } | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    const checkStatus = async () => {
      setIsChecking(true)
      try {
        const result = await checkInstanceStatus(instanceId, instanceToken)
        console.log("Verificando status inicial da instância...")
        setStatus(result)
        if (result.connected && onStatusChange) {
          onStatusChange(true)
        }
      } catch (error) {
        console.error("Erro ao verificar status:", error)
      } finally {
        setIsChecking(false)
      }
    }

    checkStatus()
  }, [isVisible, onStatusChange, instanceId, instanceToken])

  const handleRefresh = async () => {
    setIsChecking(true)
    try {
      console.log("Requisição de verificação de status iniciada...")
      const result = await checkInstanceStatus(instanceId, instanceToken)
      console.log("Resposta de verificação:", result)
      setStatus(result)
      if (result.connected && onStatusChange) {
        onStatusChange(true)
      }
    } catch (error) {
      console.error("Erro ao verificar status:", error)
    } finally {
      setIsChecking(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-lg text-gray-800 mb-2">Status da Conexão:</h3>

      {isChecking ? (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#ff0030]"></div>
          <span className="ml-2 text-gray-600">Verificando status...</span>
        </div>
      ) : status ? (
        <>
          {status.success ? (
            <Alert
              variant={status.connected ? "default" : "destructive"}
              className={status.connected ? "bg-green-50 border-green-200 text-green-800" : ""}
            >
              {status.connected ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4" />}
              <AlertTitle>{status.connected ? "Conectado" : "Não Conectado"}</AlertTitle>
              <AlertDescription>
                {status.message || (status.connected ? "WhatsApp conectado com sucesso!" : "WhatsApp não conectado.")}
                {status.error && <div className="mt-1 text-sm opacity-80">{status.error}</div>}
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{status.error || "Erro ao verificar o status da conexão"}</AlertDescription>
            </Alert>
          )}

          <div className="mt-4 flex justify-center">
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-[#ff0030] border-[#ff0030]"
              disabled={isChecking}
            >
              <RefreshCw className="h-4 w-4" />
              <span>Verificar novamente</span>
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center p-4 text-gray-500">Nenhuma informação de status disponível</div>
      )}
    </div>
  )
}