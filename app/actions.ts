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
  console.log("🚀 Função getWhatsAppCode chamada.")

  const phone = formData.get("phone") as string
  console.log("📲 Telefone recebido:", phone)

  const result = phoneSchema.safeParse({ phone })
  if (!result.success) {
    console.log("⚠️ Telefone inválido:", phone)
    return {
      success: false,
      error: "Número de telefone inválido. Digite pelo menos 10 dígitos incluindo o DDD.",
    }
  }

  const cleanPhone = phone.replace(/\D/g, "")
  const formattedPhone = `55${cleanPhone}`
  console.log("📞 Telefone formatado:", formattedPhone)

  const webhookUrl = process.env.N8N_WEBHOOK_URL!
  const baseUrl = process.env.Z_API_BASE_URL!

  try {
    console.log("📡 Chamando webhook do N8N:", webhookUrl)
    const instanciaRes = await fetch(webhookUrl, { method: "POST" })
    const instancia = await instanciaRes.json()
    console.log("📦 Instância recebida:", instancia)

    const { id: instanceId, token: instanceToken, clientToken } = instancia

    if (!instanceId || !instanceToken || !clientToken) {
      console.log("❌ Instância inválida")
      return {
        success: false,
        error: "Não foi possível obter uma instância disponível",
      }
    }

    const apiUrl = `${baseUrl}/instances/${instanceId}/token/${instanceToken}/phone-code/${formattedPhone}`
    console.log("🔗 URL da Z-API:", apiUrl)

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Client-Token": clientToken,
      },
    })

    const rawText = await response.text()
    console.log("📨 Resposta da Z-API:", rawText)

    if (!response.ok) {
      console.log("🛑 Erro na chamada da Z-API:", response.status)
      return { success: false, error: "Erro ao chamar a API da Z-API" }
    }

    const data = JSON.parse(rawText)

    if (data?.code) {
      console.log("✅ Código recebido:", data.code)
      return {
        success: true,
        code: data.code,
        instanceId,
        instanceToken,
        clientToken,
      }
    }

    console.log("⚠️ Código não encontrado na resposta")
    return {
      success: false,
      error: "Código não encontrado na resposta",
    }
  } catch (err) {
    console.error("💥 Erro inesperado:", err)
    return {
      success: false,
      error: "Erro ao comunicar com a API",
    }
  }
}
