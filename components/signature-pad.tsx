"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { SignatureService } from "@/services/signature-service"
import { ProgramService } from "@/services/program-service"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CheckCircle } from "lucide-react"

interface SignaturePadProps {
  programId: string
  onSignature: (signature: string) => void
  disabled?: boolean
}

export function SignaturePad({ programId, onSignature, disabled = false }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [existingSignature, setExistingSignature] = useState<string | null>(null)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar canvas
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Verificar se já existe assinatura
    checkExistingSignature()
  }, [programId])

  const checkExistingSignature = async () => {
    if (!user) return

    try {
      const signatures = await SignatureService.getSignaturesByProgram(programId)
      const userSignature = signatures.find((sig) => sig.operatorId === user.id)

      if (userSignature) {
        setExistingSignature(userSignature.signatureData)
        setHasSignature(true)
      }
    } catch (error) {
      console.error("Erro ao verificar assinatura existente:", error)
    }
  }

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (disabled || existingSignature) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    setIsDrawing(true)
    const pos = getMousePos(e)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled || existingSignature) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const pos = getMousePos(e)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    setHasSignature(true)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearSignature = () => {
    if (existingSignature) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
  }

  const saveSignature = async () => {
    if (!user || !hasSignature || existingSignature) return

    const canvas = canvasRef.current
    if (!canvas) return

    setIsSaving(true)

    try {
      const dataURL = canvas.toDataURL("image/png")

      await SignatureService.saveSignature({
        programId,
        operatorId: user.id,
        operatorName: user.name,
        signatureData: dataURL,
        userAgent: navigator.userAgent,
      })

      // Marcar programa como concluído
      await ProgramService.completeProgram(programId)

      setExistingSignature(dataURL)
      onSignature(dataURL)

      toast({
        title: "Programa Concluído!",
        description: "Sua assinatura foi registrada e o programa foi marcado como concluído.",
      })
    } catch (error) {
      console.error("Erro ao salvar assinatura:", error)
      toast({
        title: "Erro",
        description: "Não foi possível salvar a assinatura. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (existingSignature) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            Programa Assinado e Concluído
          </CardTitle>
          <CardDescription>Este programa foi assinado e concluído por você.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Sua assinatura:</p>
              <img
                src={existingSignature || "/placeholder.svg"}
                alt="Assinatura do operador"
                className="border border-gray-200 rounded max-w-full h-32 object-contain bg-white"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Operador: {user?.name}</p>
              <p>Status: Concluído ✓</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assinatura Digital</CardTitle>
        <CardDescription>
          {disabled
            ? "Você não tem permissão para assinar este programa"
            : "Assine abaixo para confirmar a conclusão do programa"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
          <canvas
            ref={canvasRef}
            className={`w-full h-32 border border-gray-200 rounded bg-white ${
              disabled ? "cursor-not-allowed opacity-50" : "cursor-crosshair"
            }`}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          <p className="text-xs text-gray-500 mt-2 text-center">Use o mouse para desenhar sua assinatura acima</p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={clearSignature}
            variant="outline"
            disabled={!hasSignature || disabled || isSaving || !!existingSignature}
          >
            Limpar
          </Button>
          <Button
            onClick={saveSignature}
            disabled={!hasSignature || disabled || isSaving || !!existingSignature}
            className="flex-1"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Confirmar Assinatura e Concluir"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
