import { FunctionComponent } from "react";
import { ItemTypeShort } from "../helpers/types";
import Link from "next/link";

type PropsType = {
  items: ItemTypeShort[];
};

const Projects: FunctionComponent<PropsType> = ({items}) => {
  items = items.filter((el) => el.type === 'project');

  return items.length > 0 && (
    <div>
      <h3>Projects:</h3>
      <ul>
        {items.map((item, i) => {
          return <li key={i}>
            <Link href={`/hosts/${item.host}/projects/${item.name}`}><a>{item.name}</a></Link>
          </li>;
        })}
      </ul>
    </div>
  ) || (<></>);
};

export default Projects;
