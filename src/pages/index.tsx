import AddTodo from "@/components/AddTodo";

import TodoList, { Todo } from "@/components/TodoList";

import { useState } from "react";

const demoTodolist: Todo[] = [
	{
		id: 1,
		content: "buy a macbook air",
		done: false,
	},
	{
		id: 2,
		content: "drink milk",
		done: true,
	},
	{
		id: 3,
		content: "hit the sack",
		done: false,
	},
];

function createTodo(content: string): Todo {
	return {
		id: Date.now(),
		content: content,
		done: false,
	};
}

export default function Home() {
	const [todoList, setTodoList] = useState(demoTodolist);

	function addTodo(content: string) {
		setTodoList((todos) => {
			return [createTodo(content), ...todos];
		});
	}

	function toggleFinish(id: number) {
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

	function deleteTodo(id: number) {
		setTodoList((todos) => {
			return todos.filter((todo) => todo.id !== id);
		});
	}
	return (
		<main className="mt-20 flex h-screen flex-col items-center">
			<div className="flex flex-col items-center ">
				<h1 className="mb-10 text-5xl text-blue-600">Todolist App</h1>
				<AddTodo addTodo={addTodo} />
				<TodoList todolist={todoList} toggleFinish={toggleFinish} deleteTodo={deleteTodo} />
			</div>
		</main>
	);
}
