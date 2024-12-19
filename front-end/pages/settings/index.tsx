import Header from '@components/header';
import SettingsForm from '@components/settings/SettingsForm';
import Head from 'next/head';

const Settings = () => {
    return (
        <>
            <Head>
                <title>Settings</title>
                <meta name="description" content="Login page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <SettingsForm />
        </>
    );
};

export default Settings;
