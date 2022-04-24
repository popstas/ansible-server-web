import { FunctionComponent } from "react";
import { ItemTypeShort } from "../helpers/types";
import Link from "next/link";

type PropsType = {
  items: ItemTypeShort[];
};

const Hosts: FunctionComponent<PropsType> = ({items}) => {
  items = items.filter((el) => el.type === 'host');

  return (
    <div>
      <h3>Hosts:</h3>
      <ul>
        {items.map((item, i) => {
          return <li key={i}>
            <Link href={`/hosts/${item.name}`}><a>{item.name}</a></Link>
          </li>;
        })}
      </ul>
    </div>
  );
};

export default Hosts;
