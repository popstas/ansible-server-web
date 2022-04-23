import '../styles/globals.css'
import App, { AppContext, AppProps } from 'next/app'
import { ItemTypeShort } from '../helpers/types';
import api from '../helpers/api';

type PropsType = AppProps & { items: ItemTypeShort };

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  if (typeof window !== "undefined") {
    const appProps = await App.getInitialProps(appContext);
    const items = await api.get<ItemTypeShort>("items");
    console.log('items: ', items);
    return { ...appProps, items };
  }

  // server context
  const req = appContext.ctx.req;
  if (!req) return { notFound: true };
  const appProps = await App.getInitialProps(appContext);
  const items = [] as ItemTypeShort[];//getItems();

  return  { ...appProps, items };
}

export default MyApp
