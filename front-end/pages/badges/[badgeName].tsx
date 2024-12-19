import Header from "@components/header";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serversideTranslations';

const namedBadge: React.FC = () => {
    const router = useRouter();
    const { badgeName} = router.query;

    const { t } = useTranslation();
    
    return(
    <>
        <Header/>
        <main>
            <p>{badgeName}</p>
        </main>
    </>
)
}

export const getServerSideProps = async (context: { locale: any; }) => {
  const {locale} = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"]))
      },
  };
};

export default namedBadge;