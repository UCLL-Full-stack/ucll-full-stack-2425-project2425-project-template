import Head from 'next/head';
import ActiviteitenOverviewTable from '@/components/activiteiten/ActiviteitenOverviewTable';
import React, { useEffect, useState } from 'react';
import { Activiteit } from '@/types';
import ActiviteitService from '@/services/ActiviteitenService';
import { useRouter } from 'next/router';

const Activiteiten: React.FC = () => {
    const [activiteiten, setActiviteiten] = useState<Array<Activiteit>>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newActiviteit, setNewActiviteit] = useState({
        name: '',
        description: '',
        beginDate: new Date().toLocaleDateString(),
        endDate: new Date().toLocaleDateString()
    });

    const router = useRouter();
    const { groepNaam } = router.query;

    const getActiviteitenByGroupName = async () => {
        const [activiteitenResponse] = await Promise.all([ActiviteitService.getActiviteitenByGroupName(groepNaam as string)]);
        const [activiteiten] = await Promise.all([activiteitenResponse.json()]);

        activiteiten.sort((a: Activiteit, b: Activiteit) => {
            return new Date(a.begindatum).getTime() - new Date(b.begindatum).getTime();
        });

        setActiviteiten(activiteiten);
    };

    useEffect(() => {
        if (groepNaam) {
            getActiviteitenByGroupName();
        }
    }, [groepNaam]);

    const addActiviteit = async () => {
        await ActiviteitService.addActiviteit(
            groepNaam as string,
            newActiviteit.name,
            newActiviteit.description,
            new Date(newActiviteit.beginDate),
            new Date(newActiviteit.endDate)
        );
        setShowModal(false);
        setNewActiviteit({ name: '', description: '', beginDate: '', endDate: '' });
        getActiviteitenByGroupName();
    };

    return (
        <>
            <Head>
                <title>Activiteiten</title>
            </Head>
            <main>
                <h1 className="text-5xl font-extrabold text-center text-green-900 mt-4 mb-8">Activiteiten {groepNaam}</h1>

                <div className="flex justify-end mr-4">
                    <button className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-600"
                            onClick={() => setShowModal(true)}>Activiteit toevoegen
                    </button>
                </div>

                <section className="relative">
                    {activiteiten && (
                        <ActiviteitenOverviewTable activiteiten={activiteiten} />
                    )}
                </section>

                {showModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-gray-300 p-6 rounded-lg w-96 shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Activiteit toevoegen</h2>
                            <label className="block mb-3">
                                Naam:
                                <input
                                    type="text"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-200 shadow-md shadow-md"
                                    value={newActiviteit.name}
                                    onChange={(e) => setNewActiviteit({ ...newActiviteit, name: e.target.value })}
                                />
                            </label>
                            <label className="block mb-3">
                                Beschrijving:
                                <input
                                    type="text"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-200 shadow-md"
                                    value={newActiviteit.description}
                                    onChange={(e) => setNewActiviteit({
                                        ...newActiviteit,
                                        description: e.target.value
                                    })}
                                />
                            </label>
                            <label className="block mb-3">
                                Begindatum en uur:
                                <input
                                    type="datetime-local"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-200 shadow-md"
                                    value={newActiviteit.beginDate}
                                    onChange={(e) => setNewActiviteit({ ...newActiviteit, beginDate: e.target.value })}
                                />
                            </label>
                            <label className="block mb-3">
                                Einddatum en uur:
                                <input
                                    type="datetime-local"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-200 shadow-md"
                                    value={newActiviteit.endDate}
                                    onChange={(e) => setNewActiviteit({ ...newActiviteit, endDate: e.target.value })}
                                />
                            </label>
                            <div className="text-center">
                                <button className="bg-green-900 text-white px-4 py-2 rounded shadow-md hover:bg-green-950 mr-2"
                                        onClick={addActiviteit}>Toevoegen
                                </button>
                                <button className="bg-amber-800 text-white px-4 py-2 rounded shadow-md hover:bg-amber-900"
                                        onClick={() => setShowModal(false)}>Annuleren
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default Activiteiten;
