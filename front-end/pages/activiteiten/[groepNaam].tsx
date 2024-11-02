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
                <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-8">Activiteiten {groepNaam}</h1>
                <section>
                    {activiteiten && (
                        <ActiviteitenOverviewTable activiteiten={activiteiten} />
                    )}
                </section>
                <button className="bg-blue-500 text-white px-4 py-2 m-4 rounded hover:bg-blue-600"
                        onClick={() => setShowModal(true)}>Activiteit toevoegen
                </button>

                {showModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Activiteit toevoegen</h2>
                            <label className="block mb-3">
                                Naam:
                                <input
                                    type="text"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    value={newActiviteit.name}
                                    onChange={(e) => setNewActiviteit({ ...newActiviteit, name: e.target.value })}
                                />
                            </label>
                            <label className="block mb-3">
                                Beschrijving:
                                <input
                                    type="text"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
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
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    value={newActiviteit.beginDate}
                                    onChange={(e) => setNewActiviteit({ ...newActiviteit, beginDate: e.target.value })}
                                />
                            </label>
                            <label className="block mb-3">
                                Einddatum en uur:
                                <input
                                    type="datetime-local"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    value={newActiviteit.endDate}
                                    onChange={(e) => setNewActiviteit({ ...newActiviteit, endDate: e.target.value })}
                                />
                            </label>
                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                                    onClick={addActiviteit}>Save
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    onClick={() => setShowModal(false)}>Cancel
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default Activiteiten;