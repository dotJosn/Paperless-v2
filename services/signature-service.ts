export interface Signature {
  id: string
  programId: string
  operatorId: string
  operatorName: string
  signatureData: string // Base64 da assinatura
  signedAt: Date
  ipAddress?: string
  userAgent?: string
}

// Dados mock de assinaturas
const MOCK_SIGNATURES: Signature[] = []

export class SignatureService {
  static async saveSignature(signatureData: {
    programId: string
    operatorId: string
    operatorName: string
    signatureData: string
    ipAddress?: string
    userAgent?: string
  }): Promise<Signature> {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500))

    const signature: Signature = {
      id: `sig-${Date.now()}`,
      ...signatureData,
      signedAt: new Date(),
    }

    MOCK_SIGNATURES.push(signature)
    return signature
  }

  static async getSignaturesByProgram(programId: string): Promise<Signature[]> {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 200))
    return MOCK_SIGNATURES.filter((sig) => sig.programId === programId)
  }

  static async getSignaturesByOperator(operatorId: string): Promise<Signature[]> {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 200))
    return MOCK_SIGNATURES.filter((sig) => sig.operatorId === operatorId)
  }

  static async getAllSignatures(): Promise<Signature[]> {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...MOCK_SIGNATURES]
  }
}
