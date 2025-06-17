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
    htmlContent: `
      <div class="program-instructions">
        <h2>Instruções de Usinagem - Peça A001</h2>
        <div class="step">
          <h3>1. Preparação</h3>
          <p>• Fixar peça no torno CNC</p>
          <p>• Verificar alinhamento e centragem</p>
          <p>• Confirmar material: Alumínio 6061</p>
        </div>
        <div class="step">
          <h3>2. Configuração de Ferramentas</h3>
          <p>• T01: Ferramenta de desbaste Ø12mm</p>
          <p>• T02: Ferramenta de acabamento Ø8mm</p>
          <p>• Verificar afiação das ferramentas</p>
        </div>
        <div class="step">
          <h3>3. Execução</h3>
          <p>• Executar ciclo de desbaste (Velocidade: 1200 RPM)</p>
          <p>• Trocar para ferramenta de acabamento</p>
          <p>• Executar ciclo de acabamento (Velocidade: 1800 RPM)</p>
        </div>
      </div>
    `,
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
    name: "Fresamento - Base Motor BM-001",
    description: "Fresamento da base do motor conforme desenho técnico BM-2024-001",
    htmlContent: `
      <div class="program-instructions">
        <h2>Processo de Fresamento - Base Motor</h2>
        <div class="step">
          <h3>1. Preparação do Material</h3>
          <p>• Material: Aço 1045</p>
          <p>• Dimensões: 200x150x50mm</p>
          <p>• Fixar na mesa da fresadora com morsa</p>
        </div>
        <div class="step">
          <h3>2. Configuração de Ferramentas</h3>
          <p>• Fresa de topo Ø12mm para desbaste</p>
          <p>• Fresa de acabamento Ø8mm</p>
          <p>• Verificar balanceamento das fresas</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    assignedOperatorId: "op-001",
    assignedOperatorName: "João Silva",
    status: "running",
    priority: "medium",
    estimatedTimeHours: 4.0,
    createdAt: new Date("2024-01-14T14:30:00"),
    startedAt: new Date("2024-01-15T08:00:00"),
    updatedAt: new Date("2024-01-15T08:00:00"),
  },
  {
    id: "prog-003",
    name: "Torneamento - Eixo Principal EP-345",
    description: "Torneamento do eixo principal conforme especificações técnicas",
    htmlContent: `
      <div class="program-instructions">
        <h2>Torneamento - Eixo Principal</h2>
        <div class="step">
          <h3>1. Setup da Máquina</h3>
          <p>• Torno CNC Mazak QuickTurn 200</p>
          <p>• Fixar peça entre pontas</p>
          <p>• Verificar concentricidade</p>
        </div>
        <div class="step">
          <h3>2. Operações</h3>
          <p>• Desbaste externo Ø50mm</p>
          <p>• Acabamento final Ra 0.8</p>
          <p>• Chanfro 45° nas extremidades</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    status: "pending",
    priority: "urgent",
    estimatedTimeHours: 3.0,
    createdAt: new Date("2024-01-15T10:00:00"),
    updatedAt: new Date("2024-01-15T10:00:00"),
  },
  {
    id: "prog-004",
    name: "Furação Múltipla - Flange FL-200",
    description: "Furação de 8 furos Ø10mm em flange de aço inox",
    htmlContent: `
      <div class="program-instructions">
        <h2>Furação Múltipla - Flange</h2>
        <div class="step">
          <h3>1. Preparação</h3>
          <p>• Material: Aço Inox 316L</p>
          <p>• Espessura: 20mm</p>
          <p>• Fixar com dispositivo especial</p>
        </div>
        <div class="step">
          <h3>2. Furação</h3>
          <p>• 8 furos Ø10mm em círculo Ø180mm</p>
          <p>• Broca HSS-Co 10mm</p>
          <p>• Velocidade: 300 RPM</p>
          <p>• Avanço: 0.1mm/rev</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    assignedOperatorId: "op-001",
    assignedOperatorName: "João Silva",
    status: "completed",
    priority: "medium",
    estimatedTimeHours: 1.5,
    createdAt: new Date("2024-01-12T09:00:00"),
    startedAt: new Date("2024-01-12T13:00:00"),
    completedAt: new Date("2024-01-12T14:30:00"),
    updatedAt: new Date("2024-01-12T14:30:00"),
  },
  {
    id: "prog-005",
    name: "Mandrilamento - Bucha BU-150",
    description: "Mandrilamento interno de bucha para tolerância H7",
    htmlContent: `
      <div class="program-instructions">
        <h2>Mandrilamento - Bucha BU-150</h2>
        <div class="step">
          <h3>1. Setup</h3>
          <p>• Mandriladora horizontal</p>
          <p>• Fixar peça na mesa</p>
          <p>• Verificar esquadro</p>
        </div>
        <div class="step">
          <h3>2. Operação</h3>
          <p>• Mandrilar furo Ø150mm H7</p>
          <p>• Profundidade: 80mm</p>
          <p>• Acabamento Ra 1.6</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    status: "cancelled",
    priority: "low",
    estimatedTimeHours: 2.0,
    createdAt: new Date("2024-01-11T15:00:00"),
    updatedAt: new Date("2024-01-11T16:00:00"),
  },
  {
    id: "prog-006",
    name: "Retificação - Eixo Comando EX-890",
    description: "Retificação cilíndrica externa do eixo comando",
    htmlContent: `
      <div class="program-instructions">
        <h2>Retificação - Eixo Comando</h2>
        <div class="step">
          <h3>1. Preparação</h3>
          <p>• Retificadora cilíndrica</p>
          <p>• Rebolo A60K5V</p>
          <p>• Balanceamento do rebolo</p>
        </div>
        <div class="step">
          <h3>2. Retificação</h3>
          <p>• Ø25mm ±0.005mm</p>
          <p>• Comprimento: 200mm</p>
          <p>• Ra 0.4 μm</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    assignedOperatorId: "op-001",
    assignedOperatorName: "João Silva",
    status: "running",
    priority: "high",
    estimatedTimeHours: 3.5,
    createdAt: new Date("2024-01-13T11:00:00"),
    startedAt: new Date("2024-01-15T07:00:00"),
    updatedAt: new Date("2024-01-15T07:00:00"),
  },
  {
    id: "prog-007",
    name: "Soldagem - Estrutura EST-456",
    description: "Soldagem MIG de estrutura metálica conforme norma AWS",
    htmlContent: `
      <div class="program-instructions">
        <h2>Soldagem - Estrutura Metálica</h2>
        <div class="step">
          <h3>1. Preparação</h3>
          <p>• Limpeza das superfícies</p>
          <p>• Chanfro 45° nas bordas</p>
          <p>• Posicionamento das peças</p>
        </div>
        <div class="step">
          <h3>2. Soldagem</h3>
          <p>• Processo MIG/MAG</p>
          <p>• Arame ER70S-6 Ø1.2mm</p>
          <p>• Gás CO2 15L/min</p>
          <p>• Corrente: 180A</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    status: "pending",
    priority: "medium",
    estimatedTimeHours: 5.0,
    createdAt: new Date("2024-01-15T14:00:00"),
    updatedAt: new Date("2024-01-15T14:00:00"),
  },
  {
    id: "prog-008",
    name: "Estampagem - Chapa CH-300",
    description: "Estampagem de chapa metálica para componente automotivo",
    htmlContent: `
      <div class="program-instructions">
        <h2>Estampagem - Chapa Metálica</h2>
        <div class="step">
          <h3>1. Setup da Prensa</h3>
          <p>• Prensa hidráulica 200T</p>
          <p>• Matriz de estampagem M-300</p>
          <p>• Verificar alinhamento</p>
        </div>
        <div class="step">
          <h3>2. Estampagem</h3>
          <p>• Material: Aço SAE 1010</p>
          <p>• Espessura: 2mm</p>
          <p>• Força: 150T</p>
          <p>• Velocidade: 10 golpes/min</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    assignedOperatorId: "op-001",
    assignedOperatorName: "João Silva",
    status: "completed",
    priority: "urgent",
    estimatedTimeHours: 2.0,
    createdAt: new Date("2024-01-09T10:00:00"),
    startedAt: new Date("2024-01-09T14:00:00"),
    completedAt: new Date("2024-01-09T16:00:00"),
    updatedAt: new Date("2024-01-09T16:00:00"),
  },
  {
    id: "prog-009",
    name: "Dobramento - Perfil PF-120",
    description: "Dobramento de perfil metálico em dobradeira CNC",
    htmlContent: `
      <div class="program-instructions">
        <h2>Dobramento - Perfil Metálico</h2>
        <div class="step">
          <h3>1. Configuração</h3>
          <p>• Dobradeira CNC Trumpf</p>
          <p>• Punção V40</p>
          <p>• Matriz V40</p>
        </div>
        <div class="step">
          <h3>2. Dobramento</h3>
          <p>• Ângulo: 90°</p>
          <p>• Raio interno: 3mm</p>
          <p>• Tolerância: ±1°</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    status: "pending",
    priority: "low",
    estimatedTimeHours: 1.0,
    createdAt: new Date("2024-01-15T16:00:00"),
    updatedAt: new Date("2024-01-15T16:00:00"),
  },
  {
    id: "prog-010",
    name: "Corte Plasma - Chapa CP-500",
    description: "Corte a plasma de chapa espessa para estrutura",
    htmlContent: `
      <div class="program-instructions">
        <h2>Corte a Plasma - Chapa Espessa</h2>
        <div class="step">
          <h3>1. Preparação</h3>
          <p>• Mesa de corte CNC</p>
          <p>• Chapa aço carbono 25mm</p>
          <p>• Verificar esquadro</p>
        </div>
        <div class="step">
          <h3>2. Corte</h3>
          <p>• Corrente: 130A</p>
          <p>• Velocidade: 800mm/min</p>
          <p>• Altura do bico: 3mm</p>
          <p>• Gás: Ar comprimido</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    assignedOperatorId: "op-001",
    assignedOperatorName: "João Silva",
    status: "running",
    priority: "medium",
    estimatedTimeHours: 2.5,
    createdAt: new Date("2024-01-14T08:00:00"),
    startedAt: new Date("2024-01-15T10:00:00"),
    updatedAt: new Date("2024-01-15T10:00:00"),
  },
  {
    id: "prog-011",
    name: "Usinagem 5 Eixos - Turbina TB-200",
    description: "Usinagem complexa de pá de turbina em centro 5 eixos",
    htmlContent: `
      <div class="program-instructions">
        <h2>Usinagem 5 Eixos - Pá de Turbina</h2>
        <div class="step">
          <h3>1. Setup Complexo</h3>
          <p>• Centro de usinagem 5 eixos DMG</p>
          <p>• Fixação especial TB-200</p>
          <p>• Calibração dos eixos A e B</p>
        </div>
        <div class="step">
          <h3>2. Usinagem</h3>
          <p>• Material: Titânio Ti-6Al-4V</p>
          <p>• Fresa ball nose Ø6mm</p>
          <p>• Velocidade: 8000 RPM</p>
          <p>• Avanço: 2000mm/min</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    status: "pending",
    priority: "urgent",
    estimatedTimeHours: 8.0,
    createdAt: new Date("2024-01-15T09:00:00"),
    updatedAt: new Date("2024-01-15T09:00:00"),
  },
  {
    id: "prog-012",
    name: "Eletroerosão - Molde MD-350",
    description: "Eletroerosão de cavidade de molde de injeção",
    htmlContent: `
      <div class="program-instructions">
        <h2>Eletroerosão - Molde de Injeção</h2>
        <div class="step">
          <h3>1. Preparação</h3>
          <p>• Máquina EDM Charmilles</p>
          <p>• Eletrodo de grafite</p>
          <p>• Óleo dielétrico</p>
        </div>
        <div class="step">
          <h3>2. Erosão</h3>
          <p>• Corrente: 15A</p>
          <p>• Tempo de impulso: 50μs</p>
          <p>• Acabamento Ra 0.8</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    assignedOperatorId: "op-001",
    assignedOperatorName: "João Silva",
    status: "completed",
    priority: "high",
    estimatedTimeHours: 6.0,
    createdAt: new Date("2024-01-08T09:00:00"),
    startedAt: new Date("2024-01-08T13:00:00"),
    completedAt: new Date("2024-01-08T19:00:00"),
    updatedAt: new Date("2024-01-08T19:00:00"),
  },
  {
    id: "prog-013",
    name: "Brunimento - Cilindro CI-400",
    description: "Brunimento interno de cilindro hidráulico",
    htmlContent: `
      <div class="program-instructions">
        <h2>Brunimento - Cilindro Hidráulico</h2>
        <div class="step">
          <h3>1. Setup</h3>
          <p>• Brunidora vertical Sunnen</p>
          <p>• Pedra abrasiva A220</p>
          <p>• Fluido de corte solúvel</p>
        </div>
        <div class="step">
          <h3>2. Brunimento</h3>
          <p>• Ø100mm H8</p>
          <p>• Comprimento: 400mm</p>
          <p>• Ra 0.2 μm</p>
          <p>• Ângulo de cruzamento: 60°</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    status: "cancelled",
    priority: "medium",
    estimatedTimeHours: 4.0,
    createdAt: new Date("2024-01-10T14:00:00"),
    updatedAt: new Date("2024-01-10T15:00:00"),
  },
  {
    id: "prog-014",
    name: "Lapidação - Válvula VL-80",
    description: "Lapidação de sede de válvula para vedação perfeita",
    htmlContent: `
      <div class="program-instructions">
        <h2>Lapidação - Sede de Válvula</h2>
        <div class="step">
          <h3>1. Preparação</h3>
          <p>• Máquina de lapidar Serdi</p>
          <p>• Pedra diamantada D126</p>
          <p>• Fixação pneumática</p>
        </div>
        <div class="step">
          <h3>2. Lapidação</h3>
          <p>• Ângulo: 45°</p>
          <p>• Largura da sede: 2mm</p>
          <p>• Ra 0.1 μm</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    assignedOperatorId: "op-001",
    assignedOperatorName: "João Silva",
    status: "running",
    priority: "high",
    estimatedTimeHours: 1.5,
    createdAt: new Date("2024-01-14T16:00:00"),
    startedAt: new Date("2024-01-15T08:30:00"),
    updatedAt: new Date("2024-01-15T08:30:00"),
  },
  {
    id: "prog-015",
    name: "Jateamento - Peça JP-600",
    description: "Jateamento com granalha para limpeza e acabamento",
    htmlContent: `
      <div class="program-instructions">
        <h2>Jateamento - Limpeza e Acabamento</h2>
        <div class="step">
          <h3>1. Preparação</h3>
          <p>• Cabine de jateamento</p>
          <p>• Granalha de aço S230</p>
          <p>• EPI completo obrigatório</p>
        </div>
        <div class="step">
          <h3>2. Jateamento</h3>
          <p>• Pressão: 6 bar</p>
          <p>• Distância: 200mm</p>
          <p>• Ângulo: 90°</p>
          <p>• Cobertura: 100%</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    status: "pending",
    priority: "low",
    estimatedTimeHours: 2.0,
    createdAt: new Date("2024-01-15T11:00:00"),
    updatedAt: new Date("2024-01-15T11:00:00"),
  },
  {
    id: "prog-016",
    name: "Tratamento Térmico - Engrenagem EN-250",
    description: "Tratamento térmico de cementação para engrenagem",
    htmlContent: `
      <div class="program-instructions">
        <h2>Tratamento Térmico - Cementação</h2>
        <div class="step">
          <h3>1. Preparação</h3>
          <p>• Forno de cementação</p>
          <p>• Atmosfera carburizante</p>
          <p>• Temperatura: 920°C</p>
        </div>
        <div class="step">
          <h3>2. Processo</h3>
          <p>• Tempo de cementação: 8h</p>
          <p>• Profundidade: 0.8mm</p>
          <p>• Têmpera em óleo</p>
          <p>• Revenimento: 180°C</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    assignedOperatorId: "op-001",
    assignedOperatorName: "João Silva",
    status: "completed",
    priority: "medium",
    estimatedTimeHours: 12.0,
    createdAt: new Date("2024-01-05T08:00:00"),
    startedAt: new Date("2024-01-05T09:00:00"),
    completedAt: new Date("2024-01-05T21:00:00"),
    updatedAt: new Date("2024-01-05T21:00:00"),
  },
  {
    id: "prog-017",
    name: "Montagem - Conjunto CJ-150",
    description: "Montagem de conjunto mecânico com torques especificados",
    htmlContent: `
      <div class="program-instructions">
        <h2>Montagem - Conjunto Mecânico</h2>
        <div class="step">
          <h3>1. Preparação</h3>
          <p>• Bancada de montagem</p>
          <p>• Torquímetro calibrado</p>
          <p>• Lubrificante especificado</p>
        </div>
        <div class="step">
          <h3>2. Montagem</h3>
          <p>• Parafusos M12: 85 Nm</p>
          <p>• Parafusos M8: 25 Nm</p>
          <p>• Sequência cruzada</p>
          <p>• Verificar folgas</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    status: "pending",
    priority: "medium",
    estimatedTimeHours: 3.0,
    createdAt: new Date("2024-01-15T13:00:00"),
    updatedAt: new Date("2024-01-15T13:00:00"),
  },
  {
    id: "prog-018",
    name: "Inspeção Dimensional - Bloco BL-800",
    description: "Inspeção dimensional completa com MMC",
    htmlContent: `
      <div class="program-instructions">
        <h2>Inspeção Dimensional - MMC</h2>
        <div class="step">
          <h3>1. Preparação</h3>
          <p>• Máquina de medir coordenadas</p>
          <p>• Programa de inspeção BL-800</p>
          <p>• Temperatura estável 20°C</p>
        </div>
        <div class="step">
          <h3>2. Medição</h3>
          <p>• 25 pontos de medição</p>
          <p>• Tolerâncias geométricas</p>
          <p>• Relatório automático</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    assignedOperatorId: "op-001",
    assignedOperatorName: "João Silva",
    status: "running",
    priority: "urgent",
    estimatedTimeHours: 2.0,
    createdAt: new Date("2024-01-14T10:00:00"),
    startedAt: new Date("2024-01-15T09:00:00"),
    updatedAt: new Date("2024-01-15T09:00:00"),
  },
  {
    id: "prog-019",
    name: "Pintura - Estrutura EST-900",
    description: "Pintura eletrostática com tinta epóxi",
    htmlContent: `
      <div class="program-instructions">
        <h2>Pintura Eletrostática</h2>
        <div class="step">
          <h3>1. Preparação</h3>
          <p>• Limpeza com solvente</p>
          <p>• Cabine de pintura</p>
          <p>• Tinta epóxi RAL 7035</p>
        </div>
        <div class="step">
          <h3>2. Aplicação</h3>
          <p>• Pressão: 2.5 bar</p>
          <p>• Distância: 250mm</p>
          <p>• 2 demãos</p>
          <p>• Secagem: 180°C/20min</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    status: "cancelled",
    priority: "low",
    estimatedTimeHours: 4.0,
    createdAt: new Date("2024-01-12T15:00:00"),
    updatedAt: new Date("2024-01-12T16:00:00"),
  },
  {
    id: "prog-020",
    name: "Balanceamento - Rotor RT-1200",
    description: "Balanceamento dinâmico de rotor de alta velocidade",
    htmlContent: `
      <div class="program-instructions">
        <h2>Balanceamento Dinâmico</h2>
        <div class="step">
          <h3>1. Setup</h3>
          <p>• Máquina de balancear Schenck</p>
          <p>• Rotação: 3600 RPM</p>
          <p>• Sensores calibrados</p>
        </div>
        <div class="step">
          <h3>2. Balanceamento</h3>
          <p>• Classe G2.5</p>
          <p>• 2 planos de correção</p>
          <p>• Tolerância: 0.1g</p>
          <p>• Verificação final</p>
        </div>
      </div>
    `,
    programmerId: "prog-001",
    programmerName: "Carlos Santos",
    assignedOperatorId: "op-001",
    assignedOperatorName: "João Silva",
    status: "completed",
    priority: "urgent",
    estimatedTimeHours: 3.0,
    createdAt: new Date("2024-01-07T10:00:00"),
    startedAt: new Date("2024-01-07T14:00:00"),
    completedAt: new Date("2024-01-07T17:00:00"),
    updatedAt: new Date("2024-01-07T17:00:00"),
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
