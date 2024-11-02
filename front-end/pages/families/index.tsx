import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import FamilyService from '@/services/FamilyService';
import UserService from '@/services/UserService';
import FamiliesOverview from '@components/families/FamiliesOverview';
import SingleFamilyOverview from '@components/families/SingleFamilyOverview';

const Families: React.FC = () => {
    const [families, setFamilies] = useState<Array<any>>([]);
    const [selectedFamily, setSelectedFamily] = useState<any | null>(null);
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [newFamilyName, setNewFamilyName] = useState("");
    const [useremail, setUserEmail] = useState("");

    // Error states
    const [familyNameError, setFamilyNameError] = useState('');
    const [userEmailError, setUserEmailError] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const getAllFamilies = async () => {
        const families = await FamilyService.getAllFamlies();
        setFamilies(families);
    };

    const handleCreateFamilyClick = () => {
        setIsInputVisible(!isInputVisible);
    };

    const errorClear = () => {
        setFamilyNameError('');
        setUserEmailError('');
        setStatusMessage('');
    };

    const validation = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let result = true;

        if (newFamilyName.trim() === '') {
            setFamilyNameError('Family name is required.');
            result = false;
        }
        if (useremail.trim() === '' || !emailRegex.test(useremail)) {
            setUserEmailError('Email should be a valid email.');
            result = false;
        }

        return result;
    };

    const handleAddFamily = async (event: any) => {
        event.preventDefault();
        
        errorClear();
        if (!validation()) {
            return;
        }

        const user = await UserService.getUserByEmail(useremail);
        if (!user || user.email !== useremail) {
            setUserEmailError("No user with that email exists!");
            return;
        }

        const newFamily = await FamilyService.createFamily(newFamilyName, user);
        if (newFamily) {
            setFamilies([...families, newFamily]);
            setNewFamilyName("");
            setUserEmail("");
            setIsInputVisible(false);
            setStatusMessage('Family created successfully');
        } else {
            setStatusMessage('Failed to create family');
        }
    };

    useEffect(() => {
        getAllFamilies();
    }, []);

    return (
        <>
            <Head>
                <title>Families</title>
            </Head>
            <main>
                <Header />
                <div className="familybutton">
                    <h1>All Families</h1>
                    <button id="createFamilyButton" onClick={handleCreateFamilyClick}>Create New Family</button>
                    {isInputVisible && (
                        <div>
                            <form className="newfamily" onSubmit={handleAddFamily}>
                                <div>
                                    <label id="familyname">Please enter new family name.</label>
                                    <input
                                        type="text"
                                        value={newFamilyName}
                                        onChange={(event) => setNewFamilyName(event.target.value)}
                                        placeholder="Enter family name"
                                    />
                                    {familyNameError && <p className="error">{familyNameError}</p>}
                                </div>
                                <div>
                                    <label id="useremail">Please enter your user email.</label>
                                    <input
                                        type="text"
                                        value={useremail}
                                        onChange={(event) => setUserEmail(event.target.value)}
                                        placeholder="Enter your user email"
                                    />
                                    {userEmailError && <p className="error">{userEmailError}</p>}
                                </div>
                                <button type="submit">Add Family</button>
                            </form>
                            {statusMessage && <p className="success">{statusMessage}</p>}
                        </div>
                    )}
                </div>
                <FamiliesOverview families={families} selectedFamily={setSelectedFamily} />
                {selectedFamily && (
                    <>
                        <h2>Members of the "{selectedFamily.name}" family</h2>
                        <SingleFamilyOverview family={selectedFamily} />
                    </>
                )}
            </main>
        </>
    );
};

export default Families;