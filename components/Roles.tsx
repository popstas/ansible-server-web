import { FunctionComponent } from "react";
import { ItemTypeShort } from "../helpers/types";
import Link from "next/link";

type PropsType = {
  host: ItemTypeShort;
};

const Projects: FunctionComponent<PropsType> = ({host}) => {
  const items = host.roles || [];

  return items.length > 0 && (
    <div>
      <h3>Roles:</h3>
      <ul>
        {items.map((item, i) => {
          const name = typeof item === "object" ? item?.role : item;
          return <li key={i}>
            <Link href={`/hosts/${host.host}/roles/${name}`}><a>{name}</a></Link>
          </li>;
        })}
      </ul>
    </div>
  ) || (<></>);
};

export default Projects;
