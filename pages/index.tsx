import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Hosts from 'components/Hosts';
import { getItems } from 'helpers/getItems';
import { ItemTypeShort } from 'helpers/types';
import styles from 'styles/Home.module.css';

type PropsType = {
  items: ItemTypeShort[];
};

const Home: NextPage<PropsType> = ({ items }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ansible-server</title>
      </Head>

      <main className={styles.main}>
        <Hosts items={items} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      items: getItems().filter((el) => el.type === 'host'),
    },
  };
}

export default Home;
