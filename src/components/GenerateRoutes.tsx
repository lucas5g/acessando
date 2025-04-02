import { Route } from 'react-router';

// Definição do tipo para os itens do menu
export interface MenuInterface {
  path: string;
  label: string;
  component: React.ComponentType;
}

// Função para gerar rotas dinamicamente
export const generateRoutes = (menus: MenuInterface[]) => {
  return (
    <>
      {menus.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </>
  );
};
