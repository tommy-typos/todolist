import Todo from "./Todo";

export interface Todo {
	id: string;
	content: string;
	done: boolean;
	user_id: string;
};

type PropsTodoList = {
	todolist: Todo[];
	toggleFinish: (id: string, done: boolean) => void;
	deleteTodo: (id: string) => void;
};

export default function TodoList({ todolist, toggleFinish, deleteTodo }: PropsTodoList) {
	return (
		<>
			<div className="mt-4 w-full">
				{todolist.map((item) => {
					return <Todo key={item.id} todo={item} toggleFinish={toggleFinish} deleteTodo={deleteTodo} />;
				})}
			</div>
		</>
	);
}
