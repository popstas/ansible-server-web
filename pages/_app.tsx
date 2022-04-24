import '../styles/globals.css'
import App, { AppContext, AppProps } from 'next/app'
import { ItemTypeShort } from 'helpers/types';
import { ItemsProvider } from "helpers/itemsContext";
import api from 'helpers/api';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';

type PropsType = AppProps & { items: ItemTypeShort[] };

function MyApp({ Component, pageProps, items }: PropsType) {
  const router = useRouter();

  return (
    <ItemsProvider value={items}>
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </ItemsProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  if (typeof window !== "undefined") {
    const appProps = await App.getInitialProps(appContext);
    const items = await api.get<ItemTypeShort>("items");
    return { ...appProps, items };
  }

  // server context
  const req = appContext.ctx.req;
  if (!req) return { notFound: true };
  const appProps = await App.getInitialProps(appContext);

  const { data } = await api.get<ItemTypeShort[]>("items");
  const items = data;

  return  { ...appProps, items };
}

export default MyApp
