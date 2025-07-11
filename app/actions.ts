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

// 🔁 URL do seu webhook do n8n (mantenha privado e seguro)
const WEBHOOK_URL = "https://rohemjorge.app.n8n.cloud/webhook-test/f9ec7c5f-d24f-412c-b159-b9236b62c690"

export async function getWhatsAppCode(formData: FormData): Promise<ApiResponse> {
  console.log("🚩 [DEBUG] getWhatsAppCode chamado")

  try {
    const phone = formData.get("phone") as string
    console.log("📱 [DEBUG] Telefone recebido:", phone)

    const result = phoneSchema.safeParse({ phone })
    if (!result.success) {
      return {
        success: false,
        error: "Número de telefone inválido. Digite pelo menos 10 dígitos incluindo o DDD.",
      }
    }

    const cleanPhone = phone.replace(/\D/g, "")
    const formattedPhone = `55${cleanPhone}`
    console.log("📞 [DEBUG] Telefone formatado:", formattedPhone)

    // 🧠 1. BUSCA DADOS DA INSTÂNCIA PELO WEBHOOK DO N8N
    const instanciaResponse = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ solicitante: "getWhatsAppCode" }), // pode customizar
    })

    if (!instanciaResponse.ok) {
      throw new Error("Erro ao buscar instância via webhook")
    }

    const instancia = await instanciaResponse.json()
    const instanceId = instancia.id
    const instanceToken = instancia.token
    const clientToken = instancia["client-token"]

    console.log("🧠 [DEBUG] Instância recebida:", instancia)

    if (!instanceId || !instanceToken || !clientToken) {
      return {
        success: false,
        error: "Webhook não retornou dados válidos da instância",
      }
    }

    // 🟢 2. CHAMA API DA Z-API COM OS DADOS DA INSTÂNCIA
    const apiUrl = `https://api.z-api.io/instances/${instanceId}/token/${instanceToken}/phone-code/${formattedPhone}`
    console.log("🔗 [DEBUG] URL da Z-API:", apiUrl)

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Client-Token": clientToken,
      },
    })

    const text = await response.text()
    console.log("📩 [DEBUG] Resposta bruta da API:", text)

    if (!response.ok) {
      throw new Error(`Erro da Z-API: ${response.status}`)
    }

    let data
    try {
      data = JSON.parse(text)
    } catch (err) {
      return {
        success: false,
        error: "Resposta da API inválida",
      }
    }

    if (data?.code) {
      console.log("✅ [DEBUG] Código recebido:", data.code)
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
      error: "Código não encontrado na resposta da API",
    }

  } catch (error) {
    console.error("❌ [DEBUG] Erro geral:", error)
    return {
      success: false,
      error: "Erro ao processar a solicitação do código",
    }
  }
}
