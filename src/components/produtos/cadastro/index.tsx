import { Layout, Input } from "../../index";
import { Dispatch, SetStateAction, useState } from "react";
import { useProdutoService } from "app/services";
import { Produto } from "app/models/produtos";
import { converterEmBigDecimal } from "app/util/money";
import { Message } from "../../index";

export const CadastroProdutos: React.FC = () => {
  const service = useProdutoService();
  const [sku, setSku] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [id, setId] = useState<string>();
  const [cadastro, setCadastro] = useState<string>();

  const submit = () => {
    const produto: Produto = {
      id,
      sku,
      preco: converterEmBigDecimal(preco),
      nome,
      descricao,
    };
    if (id) {
      service
        .atualizar(produto)
        .then((res) => console.log("atualizado com sucesso"));
    } else {
      service.salvar(produto).then((resp) => {
        setId(resp.id), setCadastro(resp.cadastro);
        console.log(resp);
      });
    }
  };

  return (
    <Layout titulo="Produtos">
      <Message texto="Teste atualizado com sucess" tipo="success" />
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
          <button className="button is-link is-light">Voltar</button>
        </div>
      </div>
    </Layout>
  );
};
