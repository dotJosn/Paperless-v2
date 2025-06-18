export interface Program {
  id: string
  name: string
  description: string
  htmlContent: string
  programmerId: string
  programmerName: string
  assignedOperatorId?: string
  assignedOperatorName?: string
  status: "pending" | "running" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "urgent"
  estimatedTimeHours?: number
  startedAt?: Date
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

// Dados mock de programas expandidos
const MOCK_PROGRAMS: Program[] = [
  {
    id: "prog-001",
    name: "Usinagem CNC - Peça A001",
    description: "Programa para usinagem da peça A001 em alumínio 6061",
    htmlContent: `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8" /><title>Instruções de Usinagem - Peça A001</title></head><body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;"><div style="max-width: 800px; margin: 0 auto; background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"><h1 style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 24px;">Instruções de Usinagem - Peça A001</h1><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">1. Preparação</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fixar peça no torno CNC</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Verificar alinhamento e centragem</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Confirmar material: Alumínio 6061</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">2. Configuração de Ferramentas</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T01: Ferramenta de desbaste Ø12mm</td><td style="padding: 8px; border: 1px solid #d1d5db;">Verificar afiação</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T02: Ferramenta de acabamento Ø8mm</td><td style="padding: 8px; border: 1px solid #d1d5db;">Verificar afiação</td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">3. Execução</h2><table style="width: 100%; border-collapse: collapse;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Executar ciclo de desbaste</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 1200 RPM</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Trocar para ferramenta de acabamento</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Executar ciclo de acabamento</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 1800 RPM</td></tr></tbody></table></div></body></html>`,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    assignedOperatorId: "op-001",
    assignedOperatorName: "João Silva",
    status: "completed",
    priority: "high",
    estimatedTimeHours: 2.5,
    createdAt: new Date("2024-01-10T08:00:00"),
    startedAt: new Date("2024-01-10T09:00:00"),
    completedAt: new Date("2024-01-10T11:30:00"),
    updatedAt: new Date("2024-01-10T11:30:00"),
  },
  {
    id: "prog-002",
    name: "Usinagem CNC - Suporte B002",
    description: "Programa para usinagem do suporte B002 em aço 1045",
    htmlContent: `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8" /><title>Instruções de Usinagem - Suporte B002</title></head><body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;"><div style="max-width: 800px; margin: 0 auto; background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"><h1 style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 24px;">Instruções de Usinagem - Suporte B002</h1><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">1. Preparação</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fixar peça na fresadora CNC</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Verificar zero peça</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Confirmar material: Aço 1045</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">2. Configuração de Ferramentas</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T01: Fresamento frontal Ø16mm</td><td style="padding: 8px; border: 1px solid #d1d5db;">Pastilha nova</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T02: Broca Ø6.8mm</td><td style="padding: 8px; border: 1px solid #d1d5db;">Verificar afiação</td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">3. Execução</h2><table style="width: 100%; border-collapse: collapse;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fresamento frontal</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 800 RPM</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Furar 4 furos Ø6.8mm</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 1200 RPM</td></tr></tbody></table></div></body></html>`,
    programmerId: "prog-002",
    programmerName: "Ana Oliveira",
    assignedOperatorId: "op-003",
    assignedOperatorName: "Pedro Costa",
    status: "running",
    priority: "medium",
    estimatedTimeHours: 3,
    createdAt: new Date("2024-01-11T09:15:00"),
    startedAt: new Date("2024-01-11T10:30:00"),
    completedAt: undefined,
    updatedAt: new Date("2024-01-11T12:45:00"),
  },
  {
    id: "prog-003",
    name: "Torneamento - Eixo C003",
    description: "Programa para torneamento do eixo C003 em aço inox 304",
    htmlContent: `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8" /><title>Instruções de Torneamento - Eixo C003</title></head><body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;"><div style="max-width: 800px; margin: 0 auto; background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"><h1 style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 24px;">Instruções de Torneamento - Eixo C003</h1><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">1. Preparação</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fixar barra no torno CNC</td><td style="padding: 8px; border: 1px solid #d1d5db;">Usar placa de 3 castanhas</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Verificar centragem</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Confirmar material: Aço Inox 304</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">2. Configuração de Ferramentas</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T01: Insertos para torneamento</td><td style="padding: 8px; border: 1px solid #d1d5db;">Pastilha CNMG</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T02: Ferramenta de roscar</td><td style="padding: 8px; border: 1px solid #d1d5db;">M10x1.5</td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">3. Execução</h2><table style="width: 100%; border-collapse: collapse;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Desbaste externo</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 600 RPM</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Acabamento externo</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 800 RPM</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Rosquear extremidade</td><td style="padding: 8px; border: 1px solid #d1d5db;">M10x1.5</td></tr></tbody></table></div></body></html>`,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    assignedOperatorId: "op-002",
    assignedOperatorName: "Marcos Oliveira",
    status: "pending",
    priority: "high",
    estimatedTimeHours: 4,
    createdAt: new Date("2024-01-12T14:00:00"),
    startedAt: undefined,
    completedAt: undefined,
    updatedAt: new Date("2024-01-12T14:00:00"),
  },
  {
    id: "prog-004",
    name: "Fresamento - Placa D004",
    description: "Programa para fresamento da placa D004 em alumínio 7075",
    htmlContent: `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8" /><title>Instruções de Fresamento - Placa D004</title></head><body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;"><div style="max-width: 800px; margin: 0 auto; background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"><h1 style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 24px;">Instruções de Fresamento - Placa D004</h1><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">1. Preparação</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fixar placa na mesa</td><td style="padding: 8px; border: 1px solid #d1d5db;">Usar grampos em T</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Verificar zero peça</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Confirmar material: Alumínio 7075</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">2. Configuração de Ferramentas</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T01: Fresamento de topo Ø10mm</td><td style="padding: 8px; border: 1px solid #d1d5db;">3 cortes</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T02: Fresamento de contorno Ø6mm</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">3. Execução</h2><table style="width: 100%; border-collapse: collapse;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fresamento de topo</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 2000 RPM</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fresamento de contorno</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 2500 RPM</td></tr></tbody></table></div></body></html>`,
    programmerId: "prog-003",
    programmerName: "Fernanda Lima",
    assignedOperatorId: "op-004",
    assignedOperatorName: "Ricardo Almeida",
    status: "completed",
    priority: "medium",
    estimatedTimeHours: 2,
    createdAt: new Date("2024-01-09T10:00:00"),
    startedAt: new Date("2024-01-09T11:15:00"),
    completedAt: new Date("2024-01-09T13:00:00"),
    updatedAt: new Date("2024-01-09T13:00:00"),
  },
  {
    id: "prog-005",
    name: "Furação - Bloco E005",
    description: "Programa para furação do bloco E005 em aço 1020",
    htmlContent: `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8" /><title>Instruções de Furação - Bloco E005</title></head><body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;"><div style="max-width: 800px; margin: 0 auto; background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"><h1 style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 24px;">Instruções de Furação - Bloco E005</h1><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">1. Preparação</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fixar bloco na mesa</td><td style="padding: 8px; border: 1px solid #d1d5db;">Usar morsa</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Verificar zero peça</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Confirmar material: Aço 1020</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">2. Configuração de Ferramentas</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T01: Broca centralizadora</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T02: Broca Ø5mm</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T03: Broca Ø8mm</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">3. Execução</h2><table style="width: 100%; border-collapse: collapse;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Centrar furos</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Furar 6x Ø5mm</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 1000 RPM</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Furar 2x Ø8mm</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 800 RPM</td></tr></tbody></table></div></body></html>`,
    programmerId: "prog-002",
    programmerName: "Ana Oliveira",
    assignedOperatorId: "op-005",
    assignedOperatorName: "Luiz Fernando",
    status: "completed",
    priority: "low",
    estimatedTimeHours: 1.5,
    createdAt: new Date("2024-01-08T08:30:00"),
    startedAt: new Date("2024-01-08T09:00:00"),
    completedAt: new Date("2024-01-08T10:15:00"),
    updatedAt: new Date("2024-01-08T10:15:00"),
  },
  // Continua com mais 15 objetos similares...
  {
    id: "prog-006",
    name: "Torneamento - Mancal F006",
    description: "Programa para torneamento do mancal F006 em bronze",
    htmlContent: `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8" /><title>Instruções de Torneamento - Mancal F006</title></head><body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;"><div style="max-width: 800px; margin: 0 auto; background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"><h1 style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 24px;">Instruções de Torneamento - Mancal F006</h1><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">1. Preparação</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fixar peça no torno</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Verificar centragem</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Confirmar material: Bronze</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">2. Configuração de Ferramentas</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T01: Ferramenta externa</td><td style="padding: 8px; border: 1px solid #d1d5db;">Insertos para bronze</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T02: Ferramenta interna</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">3. Execução</h2><table style="width: 100%; border-collapse: collapse;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Torneamento externo</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 500 RPM</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Torneamento interno</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 400 RPM</td></tr></tbody></table></div></body></html>`,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    assignedOperatorId: "op-001",
    assignedOperatorName: "João Silva",
    status: "running",
    priority: "medium",
    estimatedTimeHours: 2.5,
    createdAt: new Date("2024-01-15T07:30:00"),
    startedAt: new Date("2024-01-15T08:15:00"),
    completedAt: undefined,
    updatedAt: new Date("2024-01-15T10:30:00"),
  },
  {
    id: "prog-007",
    name: "Fresamento - Engrenagem G007",
    description: "Programa para fresamento da engrenagem G007 em aço 4340",
    htmlContent: `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8" /><title>Instruções de Fresamento - Engrenagem G007</title></head><body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;"><div style="max-width: 800px; margin: 0 auto; background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"><h1 style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 24px;">Instruções de Fresamento - Engrenagem G007</h1><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">1. Preparação</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fixar disco na divisora</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Verificar zero peça</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Confirmar material: Aço 4340</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">2. Configuração de Ferramentas</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T01: Fresa módulo 1.5</td><td style="padding: 8px; border: 1px solid #d1d5db;">18 dentes</td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">3. Execução</h2><table style="width: 100%; border-collapse: collapse;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fresar dentes</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 300 RPM</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fazer 24 divisões</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table></div></body></html>`,
    programmerId: "prog-003",
    programmerName: "Fernanda Lima",
    assignedOperatorId: "op-002",
    assignedOperatorName: "Marcos Oliveira",
    status: "pending",
    priority: "high",
    estimatedTimeHours: 5,
    createdAt: new Date("2024-01-14T13:00:00"),
    startedAt: undefined,
    completedAt: undefined,
    updatedAt: new Date("2024-01-14T13:00:00"),
  },
    {
    id: "prog-008",
    name: "Torneamento - Anel H008",
    description: "Programa para torneamento do anel H008 em aço inox 316",
    htmlContent: `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8" /><title>Instruções de Torneamento - Anel H008</title></head><body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;"><div style="max-width: 800px; margin: 0 auto; background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"><h1 style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 24px;">Instruções de Torneamento - Anel H008</h1><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">1. Preparação</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fixar peça no torno</td><td style="padding: 8px; border: 1px solid #d1d5db;">Usar contra-ponta</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Verificar centragem</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Confirmar material: Aço Inox 316</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">2. Configuração de Ferramentas</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T01: Insertos para inox</td><td style="padding: 8px; border: 1px solid #d1d5db;">Pastilha específica</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T02: Ferramenta de acabamento</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">3. Execução</h2><table style="width: 100%; border-collapse: collapse;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Desbaste externo</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 400 RPM</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Acabamento interno</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 500 RPM</td></tr></tbody></table></div></body></html>`,
    programmerId: "prog-002",
    programmerName: "Ana Oliveira",
    assignedOperatorId: "op-003",
    assignedOperatorName: "Pedro Costa",
    status: "completed",
    priority: "medium",
    estimatedTimeHours: 3.5,
    createdAt: new Date("2024-01-16T09:00:00"),
    startedAt: new Date("2024-01-16T10:30:00"),
    completedAt: new Date("2024-01-16T13:45:00"),
    updatedAt: new Date("2024-01-16T13:45:00"),
  },
  {
    id: "prog-009",
    name: "Fresamento - Base I009",
    description: "Programa para fresamento da base I009 em ferro fundido",
    htmlContent: `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8" /><title>Instruções de Fresamento - Base I009</title></head><body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;"><div style="max-width: 800px; margin: 0 auto; background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"><h1 style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 24px;">Instruções de Fresamento - Base I009</h1><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">1. Preparação</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fixar peça na mesa</td><td style="padding: 8px; border: 1px solid #d1d5db;">Usar calços</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Verificar nivelamento</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Confirmar material: Ferro Fundido</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">2. Configuração de Ferramentas</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T01: Fresamento de topo Ø20mm</td><td style="padding: 8px; border: 1px solid #d1d5db;">Pastilha para ferro</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T02: Fresamento de rasgo Ø10mm</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">3. Execução</h2><table style="width: 100%; border-collapse: collapse;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Planejar superfície</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 600 RPM</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fresar rasgos</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 800 RPM</td></tr></tbody></table></div></body></html>`,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    assignedOperatorId: "op-004",
    assignedOperatorName: "Ricardo Almeida",
    status: "running",
    priority: "high",
    estimatedTimeHours: 4.5,
    createdAt: new Date("2024-01-17T08:00:00"),
    startedAt: new Date("2024-01-17T09:30:00"),
    completedAt: undefined,
    updatedAt: new Date("2024-01-17T13:00:00"),
  },
  {
    id: "prog-010",
    name: "Furação - Chapa J010",
    description: "Programa para furação da chapa J010 em alumínio 5052",
    htmlContent: `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8" /><title>Instruções de Furação - Chapa J010</title></head><body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;"><div style="max-width: 800px; margin: 0 auto; background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"><h1 style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 24px;">Instruções de Furação - Chapa J010</h1><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">1. Preparação</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fixar chapa na mesa</td><td style="padding: 8px; border: 1px solid #d1d5db;">Usar parafusos de fixação</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Verificar zero peça</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Confirmar material: Alumínio 5052</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">2. Configuração de Ferramentas</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T01: Broca Ø3mm</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T02: Broca Ø5mm</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T03: Broca Ø8mm</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">3. Execução</h2><table style="width: 100%; border-collapse: collapse;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Furar 12x Ø3mm</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 2000 RPM</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Furar 4x Ø5mm</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 1800 RPM</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Furar 2x Ø8mm</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 1500 RPM</td></tr></tbody></table></div></body></html>`,
    programmerId: "prog-003",
    programmerName: "Fernanda Lima",
    assignedOperatorId: "op-005",
    assignedOperatorName: "Luiz Fernando",
    status: "pending",
    priority: "low",
    estimatedTimeHours: 2,
    createdAt: new Date("2024-01-18T10:00:00"),
    startedAt: undefined,
    completedAt: undefined,
    updatedAt: new Date("2024-01-18T10:00:00"),
  },
  {
    id: "prog-011",
    name: "Torneamento - Cone K011",
    description: "Programa para torneamento do cone K011 em aço 4140",
    htmlContent: `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8" /><title>Instruções de Torneamento - Cone K011</title></head><body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;"><div style="max-width: 800px; margin: 0 auto; background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"><h1 style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 24px;">Instruções de Torneamento - Cone K011</h1><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">1. Preparação</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fixar barra no torno</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Verificar centragem</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Confirmar material: Aço 4140</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">2. Configuração de Ferramentas</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T01: Ferramenta externa</td><td style="padding: 8px; border: 1px solid #d1d5db;">Insertos para aço</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T02: Ferramenta de roscar</td><td style="padding: 8px; border: 1px solid #d1d5db;">M12x1.75</td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">3. Execução</h2><table style="width: 100%; border-collapse: collapse;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Torneamento cônico</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 700 RPM</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Rosquear extremidade</td><td style="padding: 8px; border: 1px solid #d1d5db;">M12x1.75</td></tr></tbody></table></div></body></html>`,
    programmerId: "prog-002",
    programmerName: "Ana Oliveira",
    assignedOperatorId: "op-001",
    assignedOperatorName: "João Silva",
    status: "completed",
    priority: "high",
    estimatedTimeHours: 3,
    createdAt: new Date("2024-01-19T07:00:00"),
    startedAt: new Date("2024-01-19T08:30:00"),
    completedAt: new Date("2024-01-19T11:15:00"),
    updatedAt: new Date("2024-01-19T11:15:00"),
  },
  {
    id: "prog-012",
    name: "Fresamento - Guia L012",
    description: "Programa para fresamento da guia L012 em aço 1045",
    htmlContent: `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8" /><title>Instruções de Fresamento - Guia L012</title></head><body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;"><div style="max-width: 800px; margin: 0 auto; background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"><h1 style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 24px;">Instruções de Fresamento - Guia L012</h1><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">1. Preparação</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fixar peça na mesa</td><td style="padding: 8px; border: 1px solid #d1d5db;">Usar grampos</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Verificar zero peça</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Confirmar material: Aço 1045</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">2. Configuração de Ferramentas</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T01: Fresa de topo Ø16mm</td><td style="padding: 8px; border: 1px solid #d1d5db;">4 cortes</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T02: Fresa de rasgo Ø8mm</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">3. Execução</h2><table style="width: 100%; border-collapse: collapse;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fresar superfícies</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 900 RPM</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fresar rasgos</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 1200 RPM</td></tr></tbody></table></div></body></html>`,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    assignedOperatorId: "op-002",
    assignedOperatorName: "Marcos Oliveira",
    status: "running",
    priority: "medium",
    estimatedTimeHours: 3.5,
    createdAt: new Date("2024-01-20T09:00:00"),
    startedAt: new Date("2024-01-20T10:15:00"),
    completedAt: undefined,
    updatedAt: new Date("2024-01-20T13:30:00"),
  },
  {
    id: "prog-013",
    name: "Furação - Flange M013",
    description: "Programa para furação do flange M013 em aço 1020",
    htmlContent: `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8" /><title>Instruções de Furação - Flange M013</title></head><body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;"><div style="max-width: 800px; margin: 0 auto; background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"><h1 style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 24px;">Instruções de Furação - Flange M013</h1><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">1. Preparação</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fixar flange na mesa</td><td style="padding: 8px; border: 1px solid #d1d5db;">Usar parafusos</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Verificar centragem</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Confirmar material: Aço 1020</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">2. Configuração de Ferramentas</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T01: Broca centralizadora</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T02: Broca Ø6.5mm</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">T03: Broca Ø10mm</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr></tbody></table><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">3. Execução</h2><table style="width: 100%; border-collapse: collapse;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Centrar furos</td><td style="padding: 8px; border: 1px solid #d1d5db;"></td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Furar 8x Ø6.5mm</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 1000 RPM</td></tr><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Furar 1x Ø10mm</td><td style="padding: 8px; border: 1px solid #d1d5db;">Velocidade: 800 RPM</td></tr></tbody></table></div></body></html>`,
    programmerId: "prog-003",
    programmerName: "Fernanda Lima",
    assignedOperatorId: "op-003",
    assignedOperatorName: "Pedro Costa",
    status: "pending",
    priority: "low",
    estimatedTimeHours: 2,
    createdAt: new Date("2024-01-21T11:00:00"),
    startedAt: undefined,
    completedAt: undefined,
    updatedAt: new Date("2024-01-21T11:00:00"),
  },
  {
    id: "prog-014",
    name: "Torneamento - Bucha N014",
    description: "Programa para torneamento da bucha N014 em bronze",
    htmlContent: `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8" /><title>Instruções de Torneamento - Bucha N014</title></head><body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;"><div style="max-width: 800px; margin: 0 auto; background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"><h1 style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 24px;">Instruções de Torneamento - Bucha N014</h1><h2 style="font-size: 20px; color: #1e40af; margin-top: 24px; margin-bottom: 12px;">1. Preparação</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;"><thead><tr style="background-color: #e5e7eb;"><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Descrição</th><th style="text-align: left; padding: 8px; border: 1px solid #d1d5db;">Observações</th></tr></thead><tbody><tr><td style="padding: 8px; border: 1px solid #d1d5db;">Fixar peça no torno</td><td style="padding: 8px; border: 1px solid #d1d5db;">Verificar alinhamento</td></tr></tbody></table></div></body></html>`,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    assignedOperatorId: "op-001",
    assignedOperatorName: "João Silva",
    status: "pending",
    priority: "medium",
    estimatedTimeHours: 2,
    createdAt: new Date("2024-01-22T09:00:00"),
    startedAt: undefined,
    completedAt: undefined,
    updatedAt: new Date("2024-01-22T09:00:00"),
  },
]

export class ProgramService {
  static async getAllPrograms(): Promise<Program[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...MOCK_PROGRAMS]
  }

  static async getOperators(): Promise<Array<{ id: string; name: string }>> {
    return [
      { id: "1", name: "Operador 1" },
      { id: "2", name: "Operador 2" },
    ]
  }

  static async getProgramById(id: string): Promise<Program | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return MOCK_PROGRAMS.find((program) => program.id === id) || null
  }

  static async getProgramsByProgrammer(programmerId: string): Promise<Program[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return MOCK_PROGRAMS.filter((program) => program.programmerId === programmerId)
  }

  static async getProgramsByOperator(operatorId: string): Promise<Program[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return MOCK_PROGRAMS.filter((program) => program.assignedOperatorId === operatorId)
  }

  static async getProgramsByStatus(status: string): Promise<Program[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return MOCK_PROGRAMS.filter((program) => program.status === status)
  }

  static async createProgram(programData: Omit<Program, "id" | "createdAt" | "updatedAt">): Promise<Program> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newProgram: Program = {
      ...programData,
      id: `prog-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    MOCK_PROGRAMS.push(newProgram)
    return newProgram
  }

  static async updateProgram(id: string, updates: Partial<Program>): Promise<Program | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const programIndex = MOCK_PROGRAMS.findIndex((program) => program.id === id)
    if (programIndex === -1) return null

    MOCK_PROGRAMS[programIndex] = {
      ...MOCK_PROGRAMS[programIndex],
      ...updates,
      updatedAt: new Date(),
    }

    return MOCK_PROGRAMS[programIndex]
  }

  static async deleteProgram(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const programIndex = MOCK_PROGRAMS.findIndex((program) => program.id === id)
    if (programIndex === -1) return false

    MOCK_PROGRAMS.splice(programIndex, 1)
    return true
  }

  static async assignOperator(programId: string, operatorId: string, operatorName: string): Promise<Program | null> {
    return this.updateProgram(programId, {
      assignedOperatorId: operatorId,
      assignedOperatorName: operatorName,
    })
  }

  static async startProgram(programId: string): Promise<Program | null> {
    return this.updateProgram(programId, {
      status: "running",
      startedAt: new Date(),
    })
  }

  static async completeProgram(programId: string): Promise<Program | null> {
    return this.updateProgram(programId, {
      status: "completed",
      completedAt: new Date(),
    })
  }

  // Métodos para estatísticas
  static async getStatistics() {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const total = MOCK_PROGRAMS.length
    const pending = MOCK_PROGRAMS.filter((p) => p.status === "pending").length
    const running = MOCK_PROGRAMS.filter((p) => p.status === "running").length
    const completed = MOCK_PROGRAMS.filter((p) => p.status === "completed").length
    const cancelled = MOCK_PROGRAMS.filter((p) => p.status === "cancelled").length

    const totalHours = MOCK_PROGRAMS.reduce((sum, p) => sum + (p.estimatedTimeHours || 0), 0)
    const completedHours = MOCK_PROGRAMS.filter((p) => p.status === "completed").reduce(
      (sum, p) => sum + (p.estimatedTimeHours || 0),
      0,
    )

    return {
      total,
      pending,
      running,
      completed,
      cancelled,
      totalHours,
      completedHours,
      efficiency: total > 0 ? Math.round((completed / total) * 100) : 0,
    }
  }
}
