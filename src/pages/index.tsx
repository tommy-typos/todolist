import { useUser } from "@clerk/clerk-react";
import Head from "next/head";
import Link from "next/link";
export default function Home() {
	const { isSignedIn, user, isLoaded } = useUser();
	return (
		<>
			<Head>
				<title>Todolist</title>
				<meta name="description" content="Todolist App" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</Head>
			<main className="flex h-screen flex-col items-center">
				<div className="mt-20 flex flex-col items-center ">
					<h1 className="mb-10 text-5xl text-blue-600">Todolist App</h1>
					{isLoaded &&
						(isSignedIn ? (
							<div className="flex flex-col items-center">
								<p>Hello, {user.firstName}!</p>
								<Link href="/todos" className="mt-3 rounded-lg bg-blue-600 p-2 text-white">
									Go to your todos
								</Link>
							</div>
						) : (
							<div className="flex">
								<Link
									href="/sign-in"
									className="mr-4 mt-1 cursor-pointer rounded-lg border border-blue-600 p-2 text-blue-600 shadow-md shadow-blue-600 duration-100 hover:bg-blue-700 hover:text-white"
								>
									Sign In
								</Link>
								<Link
									href="/sign-up"
									className="mt-1 cursor-pointer rounded-lg bg-blue-600 p-2 text-white shadow-md shadow-blue-600 duration-100 hover:bg-blue-700"
								>
									Sign Up
								</Link>
							</div>
						))}
				</div>
			</main>
		</>
	);
}
