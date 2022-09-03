import { Layout, Input } from "../../index";
import { Dispatch, SetStateAction, useState } from "react";

export const CadastroProdutos: React.FC = () => {
  const [sku, setSku] = useState("");
  const [preco, setPreco] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const submit = () => {
    const produto = {
      sku,
      preco,
      nome,
      descricao,
    };
    console.log(produto);
  };

  return (
    <Layout titulo="Produtos">
      <div className="columns">
        <Input
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
                onChange={(event) => event.target.value}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button onClick={submit} className="button is-link">
            Salvar
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Voltar</button>
        </div>
      </div>
    </Layout>
  );
};
