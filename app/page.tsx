"use client"

import React, { useState } from "react"
import { getWhatsAppCode } from "./actions"
// ... seus imports de UI

export default function Home() {
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState<string | null>(null)
  const [instanceId, setInstanceId] = useState("")
  const [instanceToken, setInstanceToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInitialClick = () => {
    setError(null)
    setCode(null)
  }

  const fetchCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length < 10) {
      setError("Por favor, insira um número válido")
      return
    }
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("phone", phone)
      const resp = await getWhatsAppCode(formData)

      if (resp.success && resp.code && resp.instanceId && resp.instanceToken) {
        setCode(resp.code)
        setInstanceId(resp.instanceId)
        setInstanceToken(resp.instanceToken)
      } else {
        setError(resp.error ?? "Erro ao obter o código")
      }
    } catch {
      setError("Falha ao comunicar com o servidor")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Conexão via QR */}
      {code && instanceId && instanceToken && (
        <ConnectionStatus
          isVisible
          onStatusChange={(connected) => {}}
          instanceId={instanceId}
          instanceToken={instanceToken}
        />
      )}

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {/* 1) Tela inicial (sem form e sem código) */}
        {!code && !isLoading && !error && (
          <div className="text-center space-y-8">
            {/* ... seu banner / botão */}
            <Button onClick={handleInitialClick}>Conectar WhatsApp</Button>
          </div>
        )}

        {/* 2) Formulário de telefone */}
        {!code && (isLoading || error !== null || phone) && (
          <form onSubmit={fetchCode} className="space-y-6 max-w-md w-full">
            {/* ... seu input de telefone */}
            {error && <AlertDescription>{error}</AlertDescription>}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processando..." : "Obter Código"}
            </Button>
          </form>
        )}

        {/* 3) Código gerado */}
        {code && (
          <div className="space-y-6 max-w-md w-full">
            <div className="p-6 bg-white rounded-xl border shadow">
              {isLoading ? (
                <div className="animate-spin h-12 w-12 border-b-2"></div>
              ) : (
                <>
                  <h3>Seu código:</h3>
                  <span className="font-mono text-2xl">
                    {code.slice(0, 4)}-{code.slice(4)}
                  </span>
                  {/* ... resto do tutorial */}
                </>
              )}
            </div>
            <Button onClick={() => setCode(null)}>Voltar</Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
