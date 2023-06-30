import { Todo } from "@/components/TodoList";
import { nanoid } from "nanoid";

export const demoTodolist: Todo[] = [
	{
		id: "1",
		content: "buy a macbook air",
		done: false,
		user_id: "",
	},
	{
		id: "2",
		content: "drink milk",
		done: true,
		user_id: "",
	},
	{
		id: "3",
		content: "hit the sack",
		done: false,
		user_id: "",
	},
];

export function createTodo(content: string, user_id: string): Todo {
	return {
		id: nanoid(),
		content: content,
		done: false,
		user_id
	};
}
