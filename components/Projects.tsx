import { FunctionComponent } from "react";
import { ItemTypeShort } from "../helpers/types";
import Link from "next/link";

type PropsType = {
  items: ItemTypeShort[];
};

const Projects: FunctionComponent<PropsType> = ({items}) => {
  items = items.filter((el) => el.type === 'project');

  return (
    <div>
      <ul>
        {items.map((item, i) => {
          return <li key={i}>
            <Link href={`/projects/${item.host}/${item.name}`}><a>{item.name}</a></Link>
          </li>;
        })}
      </ul>
    </div>
  );
};

export default Projects;
