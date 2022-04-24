import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { HostType } from '../../../../helpers/types';
import { useItems } from '../../../../helpers/itemsContext';
import { useRouter } from 'next/router';
import api from '../../../../helpers/api';
import Link from 'next/link';

type PageProps = { host: HostType };

const ProjectPage: NextPage<PageProps> = () => {
  const router = useRouter()
  const hostname = router.query.host;
  const roleName = router.query.role;
  const items = useItems();
  const host = items.find(el =>
    el.type === 'host' &&
    el.host === hostname);

  if (!host) return (<div>404</div>);

  return (
    <div>
      <Head>
        <title>{ roleName } - { hostname } - ansible-server</title>
      </Head>

      <main>
        <h1>{ roleName }</h1>
        <Link href={`/hosts/${host.host}`}><a>{ host.host }</a></Link>
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
