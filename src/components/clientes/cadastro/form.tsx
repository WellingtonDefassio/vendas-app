import { Cliente } from "app/models/clientes";
import { useFormik } from "formik";
import { Input } from "components";

interface ClienteFormProps {
  cliente: Cliente;
  onSubmit: (cliente: Cliente) => void;
}

const formSchema: Cliente = {
  cadastro: "",
  cpf: "",
  dataNascimento: "",
  email: "",
  endereco: "",
  id: "",
  nome: "",
  telefone: "",
};

export const ClienteForm: React.FC<ClienteFormProps> = ({
  cliente,
  onSubmit,
}) => {
  const formik = useFormik<Cliente>({
    initialValues: { ...formSchema, ...cliente },
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.values.id && (
        <div className="columns">
          <Input
            label="Código: "
            id="id"
            name="id"
            autoComplete="off"
            disabled={true}
            value={formik.values.id}
            typeDiv="input"
          />
          <Input
            label="Data de Cadastro: "
            id="cadastro"
            name="cadastro"
            autoComplete="off"
            disabled={true}
            value={formik.values.cadastro}
            typeDiv="input"
          />
        </div>
      )}

      <div className="columns">
        <Input
          label="Nome: *"
          id="nome"
          name="nome"
          autoComplete="off"
          onChange={formik.handleChange}
          value={formik.values.nome}
          typeDiv="input"
        />
      </div>
      <div className="columns">
        <Input
          label="CPF: *"
          id="cpf"
          name="cpf"
          autoComplete="off"
          onChange={formik.handleChange}
          value={formik.values.cpf}
          typeDiv="input"
        />
        <Input
          label="Data Nascimento: *"
          id="dataNascimento"
          name="dataNascimento"
          autoComplete="off"
          onChange={formik.handleChange}
          value={formik.values.dataNascimento}
          typeDiv="input"
        />
      </div>
      <div className="columns">
        <Input
          label="Endereço: *"
          id="endereco"
          name="endereco"
          autoComplete="off"
          onChange={formik.handleChange}
          value={formik.values.endereco}
          typeDiv="input"
        />
      </div>
      <div className="columns">
        <Input
          label="Email: *"
          id="email"
          name="email"
          autoComplete="off"
          onChange={formik.handleChange}
          value={formik.values.email}
          typeDiv="input"
        />
        <Input
          label="Telefone: *"
          id="telefone"
          name="telefone"
          autoComplete="off"
          onChange={formik.handleChange}
          value={formik.values.telefone}
          typeDiv="input"
        />
      </div>
      <div className="field is-grouped">
        <div className="control is-link">
          <button type="submit" className="button">
            {formik.values.id ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </div>
    </form>
  );
};
