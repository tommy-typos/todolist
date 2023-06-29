import Todo from "./Todo";

export type Todo = {
	id: number;
	content: string;
	done: boolean;
};

type PropsTodoList = {
	todolist: Todo[];
	toggleFinish: (id: number) => void;
	deleteTodo: (id: number) => void;
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
