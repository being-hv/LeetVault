import React, { use, useEffect } from 'react'
import { authModalState } from '@/atoms/authModalAtom';
import { useSetRecoilState } from 'recoil';
import { useState } from 'react';
import { auth } from '@/firebase/firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const handleClick = () => {
        setAuthModalState((prev) => ({ ...prev, type: "login" }));
    };
    const [inputs, setInputs] = useState({ email: "", displayName: "", password: "" });
    const router = useRouter();
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) {
            alert("Leetvault says please fill in all the fields");
            return;
        }
        console.log(inputs);
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;
            router.push('/');
        } catch (error: any) {
            alert(error.message);
        }
    };
    console.log(inputs);
    return <form onSubmit={handleRegister} className='space-y-6 px-6 px-4'>
        <h3 className='text-xl font-semibold text-center'>Register to LeetVault</h3>
        <div>
            <label htmlFor='email' className='text-sm font-semibold'>
                Your Email
            </label>
            <input
            onChange={handleChangeInput}
                type='email'
                name='email'
                id='email'
                placeholder='name@leetvault.com'
                className='border-2 outline border-gray-300 rounded-md w-full px-2 py-1.5 focus:outline-none focus:ring focus:border-brand-orange placeholder text-gray-400
                placeholder-opacity-75 transition-colors duration-300 ease-in-out focus:placeholder-opacity-0 hover:placeholder-opacity-100 focus:placeholder-opacity-100 
                hover:border-brand-orange placeholder=text-gray-400 placeholder-opacity-75 transition-colors duration-300 ease-in-out focus:placeholder-opacity-0
                hover:placeholder-opacity-100 focus:placeholder-opacity-100'
            />
        </div>
        <div>
            <label htmlFor='username' className='text-sm font-semibold'>
                Your Vaultname
            </label>
            <input
            onChange={handleChangeInput}
                type='text'
                name='username'
                id='username'
                placeholder='Mr. Leetvault'
                className='border-2 outline border-gray-300 rounded-md w-full px-2 py-1.5 focus:outline-none focus:ring focus:border-brand-orange placeholder text-gray-400
                placeholder-opacity-75 transition-colors duration-300 ease-in-out focus:placeholder-opacity-0 hover:placeholder-opacity-100 focus:placeholder-opacity-100 
                hover:border-brand-orange placeholder=text-gray-400 placeholder-opacity-75 transition-colors duration-300 ease-in-out focus:placeholder-opacity-0
                hover:placeholder-opacity-100 focus:placeholder-opacity-100 hover:border-brand-orange placeholder=text-gray-400 placeholder-opacity-75 transition-colors duration-300 ease-in-out focus:placeholder-opacity-0
                hover:placeholder-opacity-100 focus:placeholder-opacity-100 hover:border-brand-orange placeholder=text-gray-400 placeholder-opacity-75 transition-colors duration-300 ease-in-out focus:placeholder-opacity-0 
                '/>
        </div>
        <div>
            <label htmlFor='password' className='text-sm font-semibold'>
                Your Password
            </label>
            <input
            onChange={handleChangeInput}
                type='password'
                name='password'
                id='password'
                placeholder='*** (leetvault stores passwords in its vault) ***'
                className='border-2 outline border-gray-300 rounded-md w-full px-2 py-1.5 focus:outline-none focus:ring focus:border-brand-orange placeholder text-gray-400
                placeholder-opacity-75 transition-colors duration-300 ease-in-out focus:placeholder-opacity-0 hover:placeholder-opacity-100 focus:placeholder-opacity-100 
                hover:border-brand-orange placeholder=text-gray-400 placeholder-opacity-75 transition-colors duration-300 ease-in-out focus:placeholder-opacity-0
                hover:placeholder-opacity-100 focus:placeholder-opacity-100'
            />
        </div>
        <button
            type='submit'
            className='bg-brand-orange text-white 
            font-semibold rounded-md w-full py-2 transition-colors duration-300 ease-in-out hover:bg-slate-900 hover:text-brand-orange
            focus:outline-none focus:ring focus:ring-brand-orange focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-slate-900'>
            Make me into LeetVault
        </button>
        <div>
        </div>
        <div>
            <p className='text-center text-sm font-semibold'>
                Already have an account? <a
                    href='#'
                    className='text-brand-orange hover:underline focus:underline font-semibold text-sm transition-colors duration-300 ease-in-out
                    hover:text-slate-900 focus:text-slate-900 focus:underline hover:underline text-right text-xs font-semibold hover:text-brand-orange
                    focus:text-brand-orange focus:underline hover:underline text-right text-xs font-semibold hover:text-brand-orange focus:text-brand-orange
                    focus:underline hover:underline text-right text-xs font-semibold hover:text-brand-orange focus:text-brand-orange focus:underline'
                    onClick={handleClick}>
                    go into the Vault</a>
            </p>
            <div>
            </div>
            <div>
                <p className='text-center text-xs font-semibold text-gray-400'>
                    By signing in, you agree to LeetVault's Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    </form>
}

export default Signup;