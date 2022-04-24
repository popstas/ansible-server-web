import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { HostType } from 'helpers/types';
import { useItems } from 'helpers/itemsContext';
import { useRouter } from 'next/router';
import api from 'helpers/api';
import { Remark } from 'react-remark';
import Projects from 'components/Projects';
import Sites from 'components/Sites';
import Roles from 'components/Roles';

type PageProps = { host: HostType };

const HostPage: NextPage<PageProps> = ({host}) => {
  const router = useRouter()
  const hostname = router.query.host;
  const items = useItems();
  const item = items.find(el => el.type === 'host' && el.name === hostname);

  const projects = item?.children?.filter((el) => el.type === 'project');
  const sites = item?.children?.filter((el) => el.type === 'site');

  if (!item) return (<div>404</div>);

  return (
    <div>
      <Head>
        <title>{ hostname } - ansible-server</title>
      </Head>

      <main>
        <h1>{ hostname }</h1>

        { item?.roles && <Roles host={item}/>}
        { projects && <Projects items={projects}/> }
        { sites && <Sites items={sites}/> }

        { item.readme && (
          <div className="mt-4"><Remark>{ item.readme }</Remark></div>
        )}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  req,
  query,
}) => {
  const config = { req, params: { host: query?.slug} };
  const result = await api.get<HostType>('host', config);
  return { props: { host: result.data } };
};

export default HostPage;
