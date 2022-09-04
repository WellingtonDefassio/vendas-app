import Link from "next/link";
import React from "react";

export const Menu: React.FC = () => {
  return (
    <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
      <p className="menu-label is-hidden-touch">Minhas vendas</p>
      <ul className="menu-list">
        <MenuItem href="/" label="Home" />
        <MenuItem href="/cadastros/produtos" label="Produtos" />
        <MenuItem href="/" label="Config" />
        <MenuItem href="/" label="Config" />
      </ul>
    </aside>
  );
};

interface MenuItemProps {
  href: string;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  return (
    <li>
      <Link href={props.href}>
        <a>
          <span className="icon"></span> {props.label}
        </a>
      </Link>
    </li>
  );
};
