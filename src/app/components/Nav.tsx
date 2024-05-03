"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { handleSignOut } from "../utils";
import { usePathname } from "next/navigation";

export default function Nav() {
	const [displayName, setDisplayName] = useState<string>("");
	const pathname = usePathname();

	useEffect(() => {
		const userJson = localStorage.getItem("user");
		if (userJson) {
			const user = JSON.parse(userJson);
			setDisplayName(user.displayName);
		}
	}, []);

	return (
		<nav className="w-full py-4 border-b-2 px-8 text-center flex items-center justify-between sticky top-0 bg-[#f5f7ff]">
			<Link href="/" className="text-2xl font-bold">
				Blog
			</Link>
			{displayName ? (
				<div className="flex items-center gap-5">
					<p className="text-sm font-semibold">{displayName}</p>
					{pathname !== "/posts/create" && (
						<Link href="/posts/create" className="underline text-blue-500">
							Create Post
						</Link>
					)}
					<button
						className="bg-red-500 text-white px-6 py-3 rounded-md"
						onClick={handleSignOut}
					>
						Log Out
					</button>
				</div>
			) : (
				<Link
					href="/login"
					className="bg-blue-500 text-white px-8 py-3 rounded-md"
				>
					Sign in
				</Link>
			)}
		</nav>
	);
}
