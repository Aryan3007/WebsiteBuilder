import Signin from '@/components/Signin';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const SigninPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/');
  }
  return(<div className="flex items-center justify-center h-screen w-screen">
    <Signin />
  </div>) ;
};

export default SigninPage;