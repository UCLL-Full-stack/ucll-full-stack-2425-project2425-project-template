import Header from "@/components/header";
import Head from "next/head";
import styles from "../styles/home.module.css";
import Image from 'next/image'

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Courses</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <section className={styles.products}>
          <article >
            <Image
              src="/images/bread.png"
              width={150}
              height={150}
              alt="Bread"
            />
            <div>
              <p>Bread</p>
              <p>55 $</p>
            </div>
          </article>

          <article>
            <Image
                src="/images/bread.png"
                width={150}
                height={150}
                alt="Bread"
              />
            <div>
              <p>Bread</p>
              <p>55 $</p>
            </div>
          </article>

          <article>
            <Image
                src="/images/bread.png"
                width={150}
                height={150}
                alt="Bread"
              />
            <div>
              <p>Bread</p>
              <p>55 $</p>
            </div>
          </article>

          <article>
            <Image
                src="/images/bread.png"
                width={150}
                height={150}
                alt="Bread"
              />
            <div>
              <p>Bread</p>
              <p>55 $</p>
            </div>
          </article>

        </section>
      </main>
    </>
  );
};

export default Home;
