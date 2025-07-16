"use server"

import { z } from "zod"

// Esquema de validação para o telefone (apenas dígitos, mínimo 10)
const phoneSchema = z.string()
  .min(10, "Telefone deve ter pelo menos 10 dígitos")
  .regex(/^[0-9]+$/, "Telefone deve conter apenas números")

type ApiResponse = {
  success: boolean
  code?: string
  error?: string
}

// URL do webhook do n8n definida em variável de ambiente
const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL!

export async function getWhatsAppCode(formData: FormData): Promise<ApiResponse> {
  // 1) Extrai e valida o campo "phone"
  const raw = formData.get("phone")
  if (typeof raw !== "string") {
    return { success: false, error: "Telefone não informado." }
  }

  const clean = raw.replace(/\D/g, "")
  const parse = phoneSchema.safeParse(clean)
  if (!parse.success) {
    return { success: false, error: parse.error.errors[0].message }
  }
  const formattedPhone = `55${clean}`

  try {
    // 2) Chama o webhook do n8n para gerar o código
    const resp = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        solicitante: "getWhatsAppCode",
        phone: formattedPhone,
      }),
    })

    if (!resp.ok) {
      return { success: false, error: `Webhook retornou status ${resp.status}` }
    }

    // 3) Transforma a resposta JSON
    const json = await resp.json() as any
    if (json.code) {
      return {
        success: true,
        code: json.code,
      }
    }

    return {
      success: false,
      error: json.error || "Código não encontrado na resposta",
    }

  } catch (err: any) {
    console.error("❌ Erro em getWhatsAppCode:", err)
    return { success: false, error: err.message || "Erro inesperado" }
  }
}
