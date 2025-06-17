"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Settings, User, Bell, Shield, Palette, Download, Upload, Save, Building, Eye, EyeOff } from "lucide-react"

interface CompanySettings {
  name: string
  address: string
  phone: string
  email: string
  website: string
  logo: string
}

interface UserPreferences {
  theme: "light" | "dark" | "system"
  language: "pt" | "en" | "es"
  timezone: string
  dateFormat: "dd/mm/yyyy" | "mm/dd/yyyy" | "yyyy-mm-dd"
  notifications: {
    email: boolean
    push: boolean
    programAssigned: boolean
    programCompleted: boolean
    systemUpdates: boolean
  }
}

interface SecuritySettings {
  twoFactorAuth: boolean
  sessionTimeout: number
  passwordExpiry: number
  loginAttempts: number
}

export default function SettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("company")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Estados para as configurações
  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    name: "Empresa Industrial LTDA",
    address: "Rua das Indústrias, 123 - Distrito Industrial",
    phone: "(11) 3456-7890",
    email: "contato@empresa.com.br",
    website: "www.empresa.com.br",
    logo: "",
  })

  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    theme: "system",
    language: "pt",
    timezone: "America/Sao_Paulo",
    dateFormat: "dd/mm/yyyy",
    notifications: {
      email: true,
      push: true,
      programAssigned: true,
      programCompleted: true,
      systemUpdates: false,
    },
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,
  })

  const [userProfile, setUserProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSave = async (section: string) => {
    setIsLoading(true)

    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Configurações salvas",
      description: `As configurações de ${section} foram atualizadas com sucesso.`,
    })

    setIsLoading(false)
  }

  const handleExportData = () => {
    const data = {
      company: companySettings,
      preferences: userPreferences,
      security: securitySettings,
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "paperless-settings.json"
    a.click()

    toast({
      title: "Dados exportados",
      description: "As configurações foram exportadas com sucesso.",
    })
  }

  const tabs = [
    { id: "company", label: "Empresa", icon: Building },
    { id: "profile", label: "Perfil", icon: User },
    { id: "preferences", label: "Preferências", icon: Palette },
    { id: "notifications", label: "Notificações", icon: Bell },
    { id: "security", label: "Segurança", icon: Shield },
    { id: "backup", label: "Backup", icon: Download },
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Configurações</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Menu lateral */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Seções</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </Button>
              )
            })}
          </CardContent>
        </Card>

        {/* Conteúdo principal */}
        <div className="lg:col-span-3 space-y-6">
          {/* Configurações da Empresa */}
          {activeTab === "company" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Configurações da Empresa
                </CardTitle>
                <CardDescription>Gerencie as informações básicas da sua empresa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Nome da Empresa</Label>
                    <Input
                      id="company-name"
                      value={companySettings.name}
                      onChange={(e) => setCompanySettings({ ...companySettings, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-email">E-mail</Label>
                    <Input
                      id="company-email"
                      type="email"
                      value={companySettings.email}
                      onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-address">Endereço</Label>
                  <Textarea
                    id="company-address"
                    value={companySettings.address}
                    onChange={(e) => setCompanySettings({ ...companySettings, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-phone">Telefone</Label>
                    <Input
                      id="company-phone"
                      value={companySettings.phone}
                      onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-website">Website</Label>
                    <Input
                      id="company-website"
                      value={companySettings.website}
                      onChange={(e) => setCompanySettings({ ...companySettings, website: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-logo">Logo da Empresa</Label>
                  <div className="flex items-center gap-4">
                    <Input id="company-logo" type="file" accept="image/*" />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>

                <Button onClick={() => handleSave("empresa")} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Salvando..." : "Salvar Configurações"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Perfil do Usuário */}
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Perfil do Usuário
                </CardTitle>
                <CardDescription>Atualize suas informações pessoais e senha</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold">{user?.name}</h3>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <Badge variant="secondary">{user?.role}</Badge>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-name">Nome Completo</Label>
                    <Input
                      id="user-name"
                      value={userProfile.name}
                      onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-email">E-mail</Label>
                    <Input
                      id="user-email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                    />
                  </div>
                </div>

                <Separator />

                <h4 className="font-semibold">Alterar Senha</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        value={userProfile.currentPassword}
                        onChange={(e) => setUserProfile({ ...userProfile, currentPassword: e.target.value })}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={userProfile.newPassword}
                        onChange={(e) => setUserProfile({ ...userProfile, newPassword: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Senha</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={userProfile.confirmPassword}
                        onChange={(e) => setUserProfile({ ...userProfile, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={() => handleSave("perfil")} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Salvando..." : "Salvar Perfil"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Preferências */}
          {activeTab === "preferences" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Preferências
                </CardTitle>
                <CardDescription>Personalize a aparência e comportamento do sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <Select
                      value={userPreferences.theme}
                      onValueChange={(value: "light" | "dark" | "system") =>
                        setUserPreferences({ ...userPreferences, theme: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Idioma</Label>
                    <Select
                      value={userPreferences.language}
                      onValueChange={(value: "pt" | "en" | "es") =>
                        setUserPreferences({ ...userPreferences, language: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt">Português</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Fuso Horário</Label>
                    <Select
                      value={userPreferences.timezone}
                      onValueChange={(value) => setUserPreferences({ ...userPreferences, timezone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                        <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Formato de Data</Label>
                    <Select
                      value={userPreferences.dateFormat}
                      onValueChange={(value: "dd/mm/yyyy" | "mm/dd/yyyy" | "yyyy-mm-dd") =>
                        setUserPreferences({ ...userPreferences, dateFormat: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/mm/yyyy">DD/MM/AAAA</SelectItem>
                        <SelectItem value="mm/dd/yyyy">MM/DD/AAAA</SelectItem>
                        <SelectItem value="yyyy-mm-dd">AAAA-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={() => handleSave("preferências")} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Salvando..." : "Salvar Preferências"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Notificações */}
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificações
                </CardTitle>
                <CardDescription>Configure como e quando você deseja receber notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações por E-mail</Label>
                      <p className="text-sm text-muted-foreground">Receber notificações importantes por e-mail</p>
                    </div>
                    <Switch
                      checked={userPreferences.notifications.email}
                      onCheckedChange={(checked) =>
                        setUserPreferences({
                          ...userPreferences,
                          notifications: { ...userPreferences.notifications, email: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações Push</Label>
                      <p className="text-sm text-muted-foreground">Receber notificações no navegador</p>
                    </div>
                    <Switch
                      checked={userPreferences.notifications.push}
                      onCheckedChange={(checked) =>
                        setUserPreferences({
                          ...userPreferences,
                          notifications: { ...userPreferences.notifications, push: checked },
                        })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Programa Atribuído</Label>
                      <p className="text-sm text-muted-foreground">Quando um programa for atribuído a você</p>
                    </div>
                    <Switch
                      checked={userPreferences.notifications.programAssigned}
                      onCheckedChange={(checked) =>
                        setUserPreferences({
                          ...userPreferences,
                          notifications: { ...userPreferences.notifications, programAssigned: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Programa Concluído</Label>
                      <p className="text-sm text-muted-foreground">Quando um programa for marcado como concluído</p>
                    </div>
                    <Switch
                      checked={userPreferences.notifications.programCompleted}
                      onCheckedChange={(checked) =>
                        setUserPreferences({
                          ...userPreferences,
                          notifications: { ...userPreferences.notifications, programCompleted: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Atualizações do Sistema</Label>
                      <p className="text-sm text-muted-foreground">Notificações sobre atualizações e manutenções</p>
                    </div>
                    <Switch
                      checked={userPreferences.notifications.systemUpdates}
                      onCheckedChange={(checked) =>
                        setUserPreferences({
                          ...userPreferences,
                          notifications: { ...userPreferences.notifications, systemUpdates: checked },
                        })
                      }
                    />
                  </div>
                </div>

                <Button onClick={() => handleSave("notificações")} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Salvando..." : "Salvar Notificações"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Segurança */}
          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Segurança
                </CardTitle>
                <CardDescription>Configure as opções de segurança do sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-muted-foreground">
                        Adicione uma camada extra de segurança à sua conta
                      </p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Timeout da Sessão (minutos)</Label>
                      <Input
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            sessionTimeout: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Expiração da Senha (dias)</Label>
                      <Input
                        type="number"
                        value={securitySettings.passwordExpiry}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            passwordExpiry: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tentativas de Login</Label>
                      <Input
                        type="number"
                        value={securitySettings.loginAttempts}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            loginAttempts: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={() => handleSave("segurança")} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Salvando..." : "Salvar Configurações"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Backup */}
          {activeTab === "backup" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Backup e Exportação
                </CardTitle>
                <CardDescription>Gerencie backups e exportação de dados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Exportar Configurações</CardTitle>
                      <CardDescription>Baixe todas as configurações do sistema</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button onClick={handleExportData} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Exportar Dados
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Importar Configurações</CardTitle>
                      <CardDescription>Restaure configurações de um backup</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Input type="file" accept=".json" />
                        <Button className="w-full" variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Importar Dados
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Backup Automático</CardTitle>
                    <CardDescription>Configure backups automáticos do sistema</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Backup Automático</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>Frequência</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Diário</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                          <SelectItem value="monthly">Mensal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Retenção (dias)</Label>
                      <Input type="number" defaultValue="30" />
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
