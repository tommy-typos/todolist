import Head from "next/head";
import Link from "next/link";

import { createClient } from "@supabase/supabase-js";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import AddTodo from "@/components/AddTodo";
import TodoList, { Todo } from "@/components/TodoList";
import { createTodo } from "@/utils/todoRelated";
import { UserButton } from "@clerk/nextjs";

import { useAuth } from "@clerk/nextjs";
import { supabaseClient } from "@/utils/supabaseClient";

export const debounce = (cb: Function, delay = 600, timeoutRef: MutableRefObject<any>) => {
	return () => {
		clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			cb();
		}, delay);
	};
};

export default function Supabase() {
	const timeoutRef = useRef(null);

	const { getToken } = useAuth();
	const { isSignedIn, user, isLoaded } = useUser();
	const [pending, setPending] = useState(false);
	const [todoList, setTodoList] = useState<Todo[]>([]);

	async function fetchData() {
		setPending(true);
		const token = await getToken({ template: "supabase" });
		const supabase = await supabaseClient(token!);

		if (user) {
			const { data, error } = await supabase
				.from("todos")
				.select()
				.eq("user_id", user!.id)
				.order("created_at", { ascending: false });
			setTodoList(data as Todo[]);
		}
	}

	const fetchDateDebounce = debounce(
		() => {
			fetchData();
		},
		undefined,
		timeoutRef
	);

	useEffect(() => {
		fetchData();
	}, [user]);

	async function addTodo(content: string) {
		const tempTodo = createTodo(content, user!.id);
		setTodoList((todos) => {
			return [tempTodo, ...todos];
		});
		const token = await getToken({ template: "supabase" });
		const supabase = await supabaseClient(token!);

		supabase
			.from("todos")
			.insert({ ...tempTodo, user_fullname: user?.fullName })
			.then(() => {
				fetchDateDebounce();
			});
	}

	async function toggleFinish(id: string, done: boolean) {
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

		const token = await getToken({ template: "supabase" });
		const supabase = await supabaseClient(token!);

		supabase
			.from("todos")
			.update({ done: !done })
			.eq("id", id)
			.then(() => {
				fetchDateDebounce();
			});
	}

	async function deleteTodo(id: string) {
		setTodoList((todos) => {
			return todos.filter((todo) => todo.id !== id);
		});

		const token = await getToken({ template: "supabase" });
		const supabase = await supabaseClient(token!);

		supabase
			.from("todos")
			.delete()
			.eq("id", id)
			.then(() => {
				fetchDateDebounce();
			});
	}

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
					<div className="mb-10 flex items-center">
						<Link href="/" className="mr-8 cursor-pointer text-5xl text-blue-600">
							Todolist App
						</Link>
						<UserButton afterSignOutUrl="/" />
					</div>
					<AddTodo addTodo={addTodo} />
					<TodoList todolist={todoList} toggleFinish={toggleFinish} deleteTodo={deleteTodo} />
				</div>
			</main>
		</>
	);
}
