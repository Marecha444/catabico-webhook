"use server"

import { z } from "zod"

const phoneSchema = z.object({
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
})

type ApiResponse = {
  success: boolean
  code?: string
  error?: string
  instanceId?: string
  instanceToken?: string
  clientToken?: string
}

export async function getWhatsAppCode(formData: FormData): Promise<ApiResponse> {
  const phone = formData.get("phone") as string

  const result = phoneSchema.safeParse({ phone })
  if (!result.success) {
    return {
      success: false,
      error: "Número de telefone inválido. Digite pelo menos 10 dígitos incluindo o DDD.",
    }
  }

  const cleanPhone = phone.replace(/\D/g, "")
  const formattedPhone = `55${cleanPhone}`

  const webhookUrl = process.env.N8N_WEBHOOK_URL!
  const baseUrl = process.env.Z_API_BASE_URL!

  try {
    const instanciaRes = await fetch(webhookUrl, { method: "POST" })
    const instancia = await instanciaRes.json()

    const { id: instanceId, token: instanceToken, clientToken } = instancia

    if (!instanceId || !instanceToken || !clientToken) {
      return {
        success: false,
        error: "Não foi possível obter uma instância disponível",
      }
    }

    const apiUrl = `${baseUrl}/instances/${instanceId}/token/${instanceToken}/phone-code/${formattedPhone}`
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Client-Token": clientToken,
      },
    })

    const text = await response.text()

    if (!response.ok) {
      return { success: false, error: "Erro ao chamar a API da Z-API" }
    }

    const data = JSON.parse(text)

    if (data?.code) {
      return {
        success: true,
        code: data.code,
        instanceId,
        instanceToken,
        clientToken,
      }
    }

    return {
      success: false,
      error: "Código não encontrado na resposta",
    }
  } catch (err) {
    return {
      success: false,
      error: "Erro ao comunicar com a API",
    }
  }
}
