import { useState } from "react";

export default function AddTodo(props: { addTodo: (content: string) => void }) {
	const [inputValue, setInputValue] = useState("");
	const { addTodo } = props;

	return (
		<>
			<form
				className="flex w-96"
				onSubmit={(e) => {
					e.preventDefault();
					addTodo(inputValue);
					setInputValue("");
				}}
			>
				<input
					className="mr-0.5 flex-grow border-2 border-blue-600 p-2 pl-3 text-2xl text-blue-600 outline-0"
					type="text"
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
				/>
				<button className="bg-blue-600 p-0.5 px-5 text-white disabled:bg-blue-800" disabled={!inputValue}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-5 w-5"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
				</button>
			</form>
		</>
	);
}
