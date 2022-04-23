import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { HostType } from '../../helpers/types';
import { useItems } from '../../helpers/itemsContext';
import { useRouter } from 'next/router';
import api from '../../helpers/api';
import { Remark } from 'react-remark';

type PageProps = { host: HostType };

const HostPage: NextPage<PageProps> = ({host}) => {
  const router = useRouter()
  const hostname = router.query.host;
  const items = useItems();
  const item = items.find(el => el.type === 'host' && el.name === hostname);

  if (!item) return (<div>404</div>);

  return (
    <div>
      <Head>
        <title>{ hostname }</title>
      </Head>

      <main>
        <h1>{ hostname }</h1>

        { host.ip && (<div>ip: {host.ip}</div>)}

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

export default HostPage;
