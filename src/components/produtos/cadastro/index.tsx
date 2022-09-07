import { Layout, Input } from "../../index";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useProdutoService } from "app/services";
import { Produto } from "app/models/produtos";
import { converterEmBigDecimal, formatReal } from "app/util/money";
import { Message } from "../../index";
import { Alert } from "components/common/message";
import * as yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";

const validationSchema = yup.object().shape({
  sku: yup.string().trim().required("Campo obrigatório"),
  nome: yup.string().trim().required("Campo obrigatório"),
  descricao: yup
    .string()
    .trim()
    .required("Campo obrigatório")
    .min(10, "deve possuir no minimo 10 caracters")
    .max(20, "deve possuir no maximo 20 caracters"),
  preco: yup
    .number()
    .required("Campo obrigatório")
    .moreThan(0, "Valor deve ser maior que 0,00 (Zero)"),
});

interface FormErros {
  sku?: string;
  nome?: string;
  preco?: string;
  descricao?: string;
}

export const CadastroProdutos: React.FC = () => {
  const service = useProdutoService();
  const [sku, setSku] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [id, setId] = useState<string>();
  const [cadastro, setCadastro] = useState<string>();
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const [errors, setErros] = useState<FormErros>({});
  const router = useRouter();
  const { id: queryId } = router.query;

  useEffect(() => {
    if (queryId) {
      service.carregarProduto(queryId).then((produtoEncontrado) => {
        console.log(produtoEncontrado);
        setId(produtoEncontrado.id);
        setSku(produtoEncontrado.sku as string);
        setNome(produtoEncontrado.nome as string);
        setDescricao(produtoEncontrado.descricao as string);
        setPreco(formatReal(produtoEncontrado.preco?.toString() + "00"));
        setDescricao(produtoEncontrado.cadastro || "");
      });
    }
  }, [queryId]);

  const submit = () => {
    const produto: Produto = {
      id,
      sku,
      preco: converterEmBigDecimal(preco),
      nome,
      descricao,
    };

    validationSchema
      .validate(produto)
      .then((obj) => {
        setErros({});
        if (id) {
          service
            .atualizar(produto)
            .then((res) =>
              setMessages([
                { tipo: "success", texto: "Produto atualizado com sucesso" },
              ])
            );
        } else {
          service.salvar(produto).then((resp) => {
            setId(resp.id), setCadastro(resp.cadastro);
            setMessages([
              { tipo: "success", texto: "Produto cadastrado com sucesso" },
            ]);
          });
        }
      })
      .catch((err) => {
        const field = err.path;
        const message = err.message;

        setErros({
          [field]: message,
        });
      });
  };

  return (
    <Layout titulo="Produtos" mensagens={messages}>
      {id && (
        <div className="columns">
          <Input
            label="ID: "
            id="inputId"
            disabled={true}
            initialValue={id}
            placeholder="ID será mostrado após cadastro"
            typeDiv="input"
          ></Input>
          <Input
            label="DATA CADASTRO: "
            id="inputDataCadastro"
            initialValue={cadastro}
            disabled={true}
            placeholder="data será mostrada apos cadastro"
            typeDiv="input"
          />
        </div>
      )}
      <div className="columns"></div>
      <div className="columns">
        <Input
          disabled={id ? true : false}
          label="SKU: *"
          id="inputSku"
          initialValue={sku}
          onChange={setSku}
          placeholder="digite o sku do produto"
          typeDiv="input"
          error={errors.sku}
        ></Input>

        <Input
          label="PREÇO: *"
          id="inputPreco"
          initialValue={preco}
          onChange={setPreco}
          placeholder="digite um preço"
          typeDiv="input"
          currency={true}
          maxLength={16}
          error={errors.preco}
        />
      </div>
      <div className="columns">
        <Input
          label="NOME: *"
          id="inputNome"
          initialValue={nome}
          onChange={setNome}
          placeholder="digite o nome do produto"
          typeDiv="input"
          error={errors.nome}
        />
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label" htmlFor="inputDescricao">
              DESCRICAO:
            </label>
            <div className="control">
              <textarea
                className="textarea"
                id="inputDescricao"
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
              />
              {errors.descricao && (
                <p className="help is-danger">{errors.descricao}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button onClick={submit} className="button is-link">
            {id ? "Atualizar" : "Salvar"}
          </button>
        </div>
        <div className="control">
          <Link href="/consultas/produtos">
            <button className="button is-link is-light">Voltar</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
