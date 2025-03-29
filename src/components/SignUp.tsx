'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { signUp } from '@/actions/signup';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
        const response  = await signUp( email, password, name);
        console.log("Response", response);
        if(response.status === 409){
            toast.error('User already exists');
        } else if (response.user) {
            toast.success('User created successfully');
            router.push('/signin')  
        }
    } catch (error) {
        console.log(error);
        toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="w-sm max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

      <div className="mb-4">
        <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password Input */}
      <div className="mb-6">
        <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
          className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sign In Button */}
      <Button
        onClick={handleSubmit}
        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Sign Up
      </Button>
      {/* Sign In Link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign in
          </a>  
        </p>
      </div>
    </div>
  );
};

export default SignUp;
