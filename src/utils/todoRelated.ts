import { Todo } from "@/components/TodoList";

export const demoTodolist: Todo[] = [
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

export function createTodo(content: string): Todo {
	return {
		id: Date.now(),
		content: content,
		done: false,
	};
}
