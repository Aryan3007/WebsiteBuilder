import SignUp from '@/components/SignUp'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const SignUpPage = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user) {
      redirect('/');
    }
    return(
        <div className='flex items-center justify-center h-screen w-screen'>
            <SignUp />
        </div>
    );
}

export default SignUpPage;
