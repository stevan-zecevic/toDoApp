import { useEffect, useState } from "react";
// import { Row, Col, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import UnfinishedTasks from "./UnfinishedTasks";
import FinishedTasks from "./FinishedTasks";
import "./tasks.css";

const Tasks = (props) => {
	const [finishedTasks, setFinishedTasks] = useState([]);
	const [unfinishedTasks, setUnfinishedTasks] = useState([]);

	useEffect(() => {
		const finishedTasks = props.tasks.filter((task) => task.completed);
		const unfinishedTasks = props.tasks.filter((task) => !task.completed);
		console.log("finishedTasks", finishedTasks);
		console.log("unfinishedTasks", unfinishedTasks);
		console.log("!", props);
		setFinishedTasks(finishedTasks);
		setUnfinishedTasks(unfinishedTasks);
	}, [props.tasks]);

	const hideTasks = (className) => {
		const tasksToHide = document.querySelector(`.${className} .tasks`);
		tasksToHide.style.height = "0px";
		tasksToHide.style.overflow = "hidden";
	};

	const showTasks = (className) => {
		const tasksToHide = document.querySelector(`.${className} .tasks`);
		tasksToHide.style.height =
			className === "finishedTasks"
				? `${finishedTasks.length * 60}px`
				: `${unfinishedTasks.length * 60}px`;
		tasksToHide.style.overflow = "none";
	};

	return (
		<div className="tasksList">
			<UnfinishedTasks
				tasks={unfinishedTasks}
				hideTasks={hideTasks}
				showTasks={showTasks}
				// selectedDate={selectedDate}
				completeTask={props.completeTask}
			/>
			<FinishedTasks
				tasks={finishedTasks}
				hideTasks={hideTasks}
				showTasks={showTasks}
				// selectedDate={selectedDate}
				uncompleteTask={props.uncompleteTask}
			/>
		</div>
	);
};

export default Tasks;
