import { Todo } from "./TodoList";

type PropsTodo = {
	todo: Todo;
	toggleFinish: (id: string, done: boolean) => void;
	deleteTodo: (id: string) => void;
};

export default function Todo(props: PropsTodo) {
	const { todo, toggleFinish, deleteTodo } = props;

	return (
		<>
			<div className="mb-1 flex justify-between border border-blue-600 border-opacity-0 p-1 hover:border-opacity-50">
				<div className="flex">
					<input
						className="ml-2 mr-3 mt-1 h-6 w-6"
						type="checkbox"
						checked={todo.done}
						onChange={() => {
							toggleFinish(todo.id, todo.done);
						}}
					/>
					<p className={`${todo.done ? "text-neutral-600 line-through" : ""} text-xl`}>{todo.content}</p>
				</div>
				<button
					className="mr-2 inline-flex items-center p-1 text-red-600 hover:rounded-full hover:bg-red-600 hover:text-white"
					onClick={() => {
						deleteTodo(todo.id);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-6 w-6"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</>
	);
}
