import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminTable from '@/components/AdminTable';
import UserTable from '@/components/UserTable';

const Page: React.FC = () => {
  const [user, setUser] = useState<any>(null); // Use 'any' type for simplicity
  const router = useRouter();

  useEffect(() => {
    const userToken = localStorage.getItem('loggedInUser');
    if (userToken) {
      try {
        const user = JSON.parse(userToken);
        if (user.token) {
          setUser(user);
        }
      } catch (e) {
        console.error('Failed to parse LoggedInUser:', e);
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <div>
      {user.role === 'admin' && <AdminTable />}
      {user.role === 'user' && <UserTable userId={user.id} />}
    </div>
  );
};

export default Page;