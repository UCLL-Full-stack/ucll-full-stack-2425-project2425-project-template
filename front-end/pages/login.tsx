import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/Login.module.css';
import logo from '../components/logo.png';
import Logincomp from '../components/login/login';
import UserTable from '@components/login/usertable';

const Login = () => {
    return (
        <div className={styles.container}>
            <Logincomp />
            <UserTable />
        </div>
    );
};

export default Login;
