import { Produto } from "app/models/produtos";
import { Layout } from "components/layout";
import Link from "next/link";
import { TabelaProdutos } from "./tabela";
import useSWR from "swr";
import { httpClient } from "app/http";
import { AxiosResponse } from "axios";
import { Loader } from "components/common/loader";
import Router from "next/router";
import { useProdutoService } from "app/services";
import { useEffect, useState } from "react";
import { Alert } from "components/common/message";

export const ListagemProdutos: React.FC = () => {
  const produtos: Produto[] = [];
  const service = useProdutoService();
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const [lista, setLista] = useState<Produto[]>([]);
  const { data: result, error } = useSWR<AxiosResponse<Produto[]>>(
    "/api/produtos",
    (url) => httpClient.get(url)
  );

  useEffect(() => {
    setLista(result?.data || []);
  }, [result]);

  const editar = (produto: Produto) => {
    const url = `/cadastros/produtos?id=${produto.id}`;
    Router.push(url);
  };

  const deletar = (produto: Produto) => {
    service.deletar(produto.id).then((response) => {
      setMessages([
        { tipo: "success", texto: "Produto excluido com sucesso!" },
      ]);
      const listaAlterada = lista?.filter((p) => p.id !== produto.id);
      setLista(listaAlterada);
    });
  };

  return (
    <Layout titulo="Produtos" mensagens={messages}>
      <Link href="/cadastros/produtos">
        <button className="button is-link ">Novo</button>
      </Link>
      <br />
      <br />
      <Loader show={!result} />
      <TabelaProdutos onEdit={editar} onDelete={deletar} produtos={lista} />
    </Layout>
  );
};
