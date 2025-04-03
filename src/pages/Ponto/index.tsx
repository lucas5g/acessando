import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { MenuInterface } from "@/components/GenerateRoutes";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { Server } from "@/pages/Ponto/Server";

export const pontosMenus: MenuInterface[] = [
  {
    path: '/pontos',
    label: 'Ponto',
    component: Ponto
  },
  {
    path: '/pontos/servidores',
    label: 'Servidores',
    component: Server
  }
]

export function Ponto() {
  return (
    <Layout menus={pontosMenus}>
      <Card>
        <Header title="Buscar Pontos" />
        <form className="flex flex-col gap-2">
          <Input placeholder="Digite o Masp" />
          <footer className="flex justify-end">
            <Button>
              Buscar
            </Button>
          </footer>
        </form>
      </Card>
    </Layout>
  )
}