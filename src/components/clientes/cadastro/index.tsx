import { Cliente } from "app/models/clientes";
import { Layout } from "components/layout";
import { useState } from "react";
import { ClienteForm } from "./form";

export const CadastroCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({});

  const handleSubmit = (cliente: Cliente) => {
    console.log(cliente);
  };

  return (
    <Layout titulo="Clientes">
      <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
    </Layout>
  );
};
