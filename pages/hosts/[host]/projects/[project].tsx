import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { HostType } from '../../../../helpers/types';
import { useItems } from '../../../../helpers/itemsContext';
import { useRouter } from 'next/router';
import api from 'helpers/api';
import { Remark } from 'react-remark';
import Link from 'next/link';

type PageProps = { host: HostType };

const ProjectPage: NextPage<PageProps> = ({host}) => {
  const router = useRouter()
  const hostname = router.query.host;
  const projectName = router.query.project;
  const items = useItems();
  const item = items.find(el =>
    el.type === 'project' &&
    el.host === hostname &&
    el.name === projectName);

  if (!item) return (<div>404</div>);

  return (
    <div>
      <Head>
        <title>{ projectName } - { hostname } - ansible-server</title>
      </Head>

      <main>
        <h1>{ projectName }</h1>
        <Link href={`/hosts/${item.host}`}><a>{ item.host }</a></Link>

        { item.readme && (
          <Remark>{ item.readme }</Remark>
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

export default ProjectPage;
