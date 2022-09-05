import { Produto } from "app/models/produtos";
import { Layout } from "components/layout";
import Link from "next/link";
import { TabelaProdutos } from "./tabela";
import useSWR from "swr";
import { httpClient } from "app/http";
import { AxiosResponse } from "axios";

export const ListagemProdutos: React.FC = () => {
  const produtos: Produto[] = [];
  const { data: result, error } = useSWR<AxiosResponse<Produto[]>>(
    "/api/produtos",
    (url) => httpClient.get(url)
  );

  if (!result) {
    return <div>Carregando</div>;
  }

  return (
    <Layout titulo="Produtos">
      <Link href="/cadastros/produtos">
        <button className="button is-link ">Novo</button>
      </Link>
      <br />
      <TabelaProdutos produtos={result?.data} />
    </Layout>
  );
};
