import Header from "@components/header";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serversideTranslations';
import { useEffect, useState } from "react";
import { Badge, Trainer } from "@types";
import TrainerService from "@services/trainer.service";

const namedBadge: React.FC = () => {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loggedInEmail, setLoggedInEmail] = useState<string>('');
    const [role, setRole] = useState<string>("guest");
    const [badge, setBadge] = useState<Badge>()
    const router = useRouter();
    const { badgeName, owned} = router.query;

    const allBadges = [
          {name:"Boulder badge", difficulty:1, location: "Pewter City"},
          {name:"Cascade badge", difficulty:1, location: "Cerulean City"},
          {name:"Thunder badge", difficulty:2, location: "Vermilion City"},
          {name:"Rainbow badge", difficulty:2, location: "Celadon City"},
          {name:"Soul badge", difficulty:3, location: "Fuchsia City"},
          {name:"Marsh badge", difficulty:4, location: "Saffron City"},
          {name:"Volcano badge", difficulty:5, location: "Seafoam Islands"},
          {name:"Earth badge", difficulty:5, location: "Viridian City"},
        ]
    
        useEffect(() => {
          const allBadgesFilterd = allBadges.filter((badgeToFilter)=>badgeToFilter.name==badgeName);
          console.log(allBadgesFilterd[0])
          setBadge(allBadgesFilterd[0])
          console.log(badge)
          }, []);

    const { t } = useTranslation();

    const handleAddBadge = async (newBadge: Badge) => {
        try {
          if (selectedTrainer && selectedTrainer.id) {
            const updatedTrainer = await TrainerService.addBadgeToTrainerById(
              selectedTrainer.id,
              newBadge
            );
            setSelectedTrainer(updatedTrainer);
            setTrainers((prevTrainers) =>
              prevTrainers.map((trainer) =>
                trainer.id === updatedTrainer.id ? updatedTrainer : trainer
              )
            );
          }
        } catch (error) {
          console.error(error);
        }
      };
    

    return(
    <>
        <Header/>
        <main>
            <p>{badgeName}</p>
            <p>{owned}</p>
            {!owned && badge && (
                <button onClick={()=>handleAddBadge(badge)}>
                    add
                </button>
            )}
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