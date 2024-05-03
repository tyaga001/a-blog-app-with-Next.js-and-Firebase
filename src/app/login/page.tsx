"use client";
import { useState } from "react";
import { handleSignIn } from "../utils";
import { googleProvider } from "../../../firebase";
import { GoogleAuthProvider } from "firebase/auth";

export default function Nav() {
	const [loading, setLoading] = useState<boolean>(false);

	const handleGoogleSignIn = () => {
		setLoading(true);
		handleSignIn(googleProvider, GoogleAuthProvider);
	};

	return (
		<div className='w-full min-h-screen flex flex-col items-center justify-center'>
			<h2 className='font-bold text-2xl mb-6'>Sign into Blog</h2>
			<button
				className='w-1/3 border-2 border-gray-600 mb-6 rounded-md hover:bg-black hover:text-white px-8 py-4'
				disabled={loading}
				onClick={handleGoogleSignIn}
			>
				{loading ? "Signing in..." : "Sign in with Google"}
			</button>
		</div>
	);
}
