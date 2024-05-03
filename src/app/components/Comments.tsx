"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCurrentDate } from "../utils";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import {  db } from "../../../firebase";

interface User {
	displayName: string;
	u_id: string;
}

export const generateCommentID = () =>
	Math.random().toString(36).substring(2, 10);

export default function Comments({
	comments,
	post_id,
}: {
	comments: Comment[] | undefined;
	post_id: string | undefined;
}) {
	const [user, setUser] = useState<User>({ displayName: "", u_id: "" });
	const [newComment, setNewComment] = useState<string>("");
	const [postingComment, setPostingComment] = useState<boolean>(false);

	useEffect(() => {
		if (localStorage.getItem("user")) {
			const user = JSON.parse(localStorage.getItem("user") || "");
			setUser(user);
		}
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		postComment();
	};

	const postComment = async () => {
		//👇🏻 Add a comment to the post
		setPostingComment(true);
		try {
			const postRef = doc(db, "posts", post_id!);
			await updateDoc(postRef, {
				comments: arrayUnion({
					id: generateCommentID(),
					content: newComment,
					author_name: user.displayName,
					pub_date: getCurrentDate(),
				}),
			});
			alert("Comment posted successfully");
			setPostingComment(false);
			setNewComment("")
		} catch (err) {
			console.log(err);
			alert("An error occurred while posting your comment. Please try again.");
		}
	};

	if (!user.displayName)
		return (
			<main className='p-8 mt-8'>
				<h3 className=' font-semibold'>
					You need to{" "}
					<Link href='/login' className='text-blue-500 underline'>
						sign in
					</Link>{" "}
					before you can comment on this post
				</h3>
			</main>
		);

	return (
		<main className='p-8 mt-8'>
			<h3 className='font-semibold text-xl mb-4 text-blue-500'>Comments</h3>
			<form onSubmit={handleSubmit} className='mb-8'>
				<textarea
					className='w-full p-4 border border-gray-300 rounded-md mb-2'
					placeholder='Leave a comment'
					value={newComment}
					required
					onChange={(e) => setNewComment(e.target.value)}
				/>
				<button
					className='bg-blue-500 text-white px-4 py-2 rounded-md'
					disabled={postingComment}
				>
					{postingComment ? "Posting..." : "Post Comment"}
				</button>
			</form>

			{comments && comments.length > 0 && (
				<h3 className='font-semibold text-xl mb-4 text-blue-500'>
					Recent comments
				</h3>
			)}

			<div className='w-full flex items-start md:flex-row flex-col justify-center gap-4 flex-wrap'>
				{comments?.map((comment) => (
					<div
						className='bg-white p-4 rounded-lg md:w-1/4 w-full  shadow-lg'
						key={comment.id}
					>
						<p className='mb-4'>{comment.content}</p>
						<div>
							<h4 className='font-semibold text-sm'>{comment.author_name}</h4>
							<p className='text-gray-500 text-sm'>{comment.pub_date}</p>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
