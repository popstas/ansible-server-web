import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { HostType } from 'helpers/types';
import { useItems } from 'helpers/itemsContext';
import { useRouter } from 'next/router';
import api from 'helpers/api';
import { Remark } from 'react-remark';
import Link from 'next/link';

type PageProps = { host: HostType };

const SitePage: NextPage<PageProps> = ({host}) => {
  const router = useRouter()
  const hostname = router.query.host;
  const siteName = router.query.site;
  const items = useItems();
  const item = items.find(el =>
    el.type === 'site' &&
    el.host === hostname &&
    el.name === siteName);

  if (!item) return (<div>404</div>);

  return (
    <div>
      <Head>
        <title>{ siteName } - { hostname } - ansible-server</title>
      </Head>

      <main>
        <h1>{ siteName }</h1>
        <Link href={`/hosts/${item.host}`}><a>{ item.host }</a></Link>

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

export default SitePage;
