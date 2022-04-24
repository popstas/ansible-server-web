import { FunctionComponent } from "react";
import { ItemTypeShort } from "../helpers/types";
import Link from "next/link";

type PropsType = {
  items: ItemTypeShort[];
};

const Sites: FunctionComponent<PropsType> = ({items}) => {
  items = items.filter((el) => el.type === 'site');

  return (
    <div>
      <ul>
        {items.map((item, i) => {
          return <li key={i}>
            <Link href={`/sites/${item.host}/${item.name}`}><a>{item.name}</a></Link>
          </li>;
        })}
      </ul>
    </div>
  );
};

export default Sites;