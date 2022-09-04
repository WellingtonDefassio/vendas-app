interface MessageProps {
  tipo: string;
  texto: string;
  field?: string;
}

export interface Alert {
  tipo: string;
  texto: string;
  field?: string;
}

export const Message: React.FC<MessageProps> = (props) => {
  return (
    <article className={`message is-${props.tipo}`}>
      <div className="message-body">
        {props.field && `${props.field} :`}
        {props.texto}
      </div>
    </article>
  );
};
