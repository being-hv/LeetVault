import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const handleClick = (type: "login" | "register" | "forgotPassword") => {
        setAuthModalState((prev) => ({ ...prev, type }));
    };
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) return alert("Please fill all fields");
        try {
            const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;
            router.push("/");
        } catch (error: any) {
            alert(error.message);
        }
    };
    console.log(inputs);
    return <form className='space-y-6 px-6 px-4' onSubmit={handleLogin}>
        <h3 className='text-xl font-semibold text-center'>Sign-in to LeetVault</h3>
        <div>
            <label htmlFor='email' className='text-sm font-semibold'>
                Your Email
            </label>
            <input
            onChange={handleInputChange}
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
            <label htmlFor='password' className='text-sm font-semibold'>
                Your Password
            </label>
            <input
            onChange={handleInputChange}
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
            focus:outline-none focus:ring focus:ring-brand-orange focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-slate-900'
        >
            Make me in LeetVault
        </button>
        <button
            type='submit'
            className='text-brand-orange text-sm font-semibold w-full py-2 transition-colors duration-300 ease-in-out hover:text-slate-900
            focus:outline-none focus:ring focus:ring-brand-orange focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-slate-900
            hover:text-brand-orange focus:text-brand-orange hover:underline focus:underline text-right text-xs font-semibold'
            onClick={() => handleClick("forgotPassword")}>
            Forgot your Vault's Password?
        </button>
        <div>

        </div>
        <div>
            <p className='text-center text-sm font-semibold'>
                Don't have an account? <a
                    href='#'
                    className='text-brand-orange hover:underline focus:underline font-semibold text-sm transition-colors duration-300 ease-in-out
                    hover:text-slate-900 focus:text-slate-900 focus:underline hover:underline text-right text-xs font-semibold hover:text-brand-orange
                    focus:text-brand-orange focus:underline hover:underline text-right text-xs font-semibold hover:text-brand-orange focus:text-brand-orange
                    focus:underline hover:underline text-right text-xs font-semibold hover:text-brand-orange focus:text-brand-orange focus:underline'
                    onClick={() => handleClick("register")}>
                    make me into the Vault</a>
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

export default Login;