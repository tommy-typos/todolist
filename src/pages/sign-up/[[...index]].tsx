import { SignUp } from "@clerk/nextjs";
import Head from "next/head";

export default function Page() {
	return (
		<>
			<Head>
				<title>Todolist | Sign Up</title>
				<meta name="description" content="Todolist App" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</Head>
			<main className="flex h-screen flex-col items-center">
				<div className="mt-20 flex flex-col items-center ">
					<h1 className="mb-10 text-5xl text-blue-600">Todolist App</h1>
					<SignUp />
				</div>
			</main>
		</>
	);
}
