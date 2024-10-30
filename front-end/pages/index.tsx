import { Inter } from "next/font/google";
import Head from "next/head"
import Header from "@components/header"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Demo Project</title>
        <meta name="description" content="Exam app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae laborum amet voluptate aspernatur quia, dolores natus, ratione reprehenderit quaerat quasi earum ipsa omnis aliquam? Tempora praesentium facere distinctio ducimus delectus quis nobis, assumenda, esse aperiam dignissimos pariatur odit maxime, quo vitae officia modi minima id! Id, quas. Mollitia nisi ex, earum repellendus pariatur recusandae deserunt eligendi, qui asperiores consequuntur architecto. Exercitationem ex, magnam corporis suscipit sunt facere eum quos non ipsa vel possimus ut, tempora quasi unde. Aut, fugiat aliquam illo tempora cumque id aspernatur laboriosam repellendus quae rem magnam incidunt vero asperiores et praesentium dolores optio distinctio, eum commodi!</p>
      </main>
    </>
  );
}
