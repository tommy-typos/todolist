import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import { createTodo, demoTodolist } from "@/utils/todoRelated";
import { UserButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { useState } from "react";

export default function TodosNoDB() {
	const { isSignedIn, user, isLoaded } = useUser();
	const router = useRouter();
	if (user) {
		router.replace("/todos");
	}
	const [todoList, setTodoList] = useState(demoTodolist);

	function addTodo(content: string) {
		setTodoList((todos) => {
			return [createTodo(content, ""), ...todos];
		});
	}

	function toggleFinish(id: string) {
		setTodoList((todos) => {
			return todos.map((todo) => {
				if (todo.id !== id) return todo;
				else
					return {
						...todo,
						done: !todo.done,
					};
			});
		});
	}

	function deleteTodo(id: string) {
		setTodoList((todos) => {
			return todos.filter((todo) => todo.id !== id);
		});
	}
	return (
		<>
			<Head>
				<title>Todolist | Todos</title>
				<meta name="description" content="Todolist App" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</Head>
			<main className="flex h-screen flex-col items-center">
				<div className="mt-20 flex flex-col items-center ">
					<div className="mb-10 flex items-center">
						<Link href="/" className="mr-8 cursor-pointer text-5xl text-blue-600">
							Todolist App
						</Link>
						<UserButton afterSignOutUrl="/" />
					</div>
					{isLoaded && !user && (
						<>
							<p className="mb-4 ">
								In order to save your todos, &#160;
								<Link href="/" className="text-blue-600 underline">
									Login or Sign Up Now
								</Link>
							</p>
							<AddTodo addTodo={addTodo} />
							<TodoList todolist={todoList} toggleFinish={toggleFinish} deleteTodo={deleteTodo} />
						</>
					)}
				</div>
			</main>
		</>
	);
}
