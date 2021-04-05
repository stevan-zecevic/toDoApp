import { useEffect, useState } from "react";
import { Row, Col, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Tasks from "../tasks/Tasks.jsx";
import AddForm from "../addForm/AddForm.jsx";
import moment from "moment";
import "./mainBody.css";

const MainBody = (props) => {
	const [selectedDate, setSelectedDate] = useState();
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		props.loadTasks(selectedDate);
	}, [selectedDate]);

	useEffect(() => {
		console.log("Tasks change", props.tasks);
		setTasks(props.tasks);
	}, [props.tasks]);

	const handleDateChange = ({ target }) => {
		setSelectedDate(target.value);
	};

	const completeTask = async (task) => {
		let body = props.allTasks;
		const date = moment(selectedDate).format("MM.DD.YYYY");
		body[date] = body[date].map((t) => {
			if (t.id === task.id) {
				t.completed = true;
			}
			return t;
		});
		await fetch(`http://localhost:5000/tasks`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		props.loadTasks(selectedDate);
	};

	const uncompleteTask = async (task) => {
		let body = props.allTasks;
		const date = moment(selectedDate).format("MM.DD.YYYY");
		body[date] = body[date].map((t) => {
			if (t.id === task.id) {
				t.completed = false;
			}
			return t;
		});

		await fetch(`http://localhost:5000/tasks`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		props.loadTasks(selectedDate);
	};

	const addTask = async (name, priority) => {
		let tasks = props.allTasks;
		let date = `${moment(selectedDate).format("MM.DD.YYYY")}`;
		if (tasks[date] && tasks[date].length !== 0) {
			console.log("T", tasks[date]);
			tasks[date].push({
				id: tasks[date] && tasks[date].length > 0 ? tasks[date].length + 1 : 1,
				name,
				priority,
				completed: false,
			});
		} else {
			tasks[date] = [
				{
					id: tasks && tasks.length > 0 ? tasks.length + 1 : 1,
					name,
					priority,
					completed: false,
				},
			];
		}
		const status = await fetch(`http://localhost:5000/tasks`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(tasks),
		});
		console.log(status);
		props.loadTasks(selectedDate);
	};

	return (
		<div className="centerContent">
			<Row className="datePicker">
				<Col xs="12">
					<FormGroup>
						<FormLabel style={{ marginRight: 20 }}>Choose a date:</FormLabel>
						<FormControl type="date" value={selectedDate} onChange={handleDateChange} />
					</FormGroup>
				</Col>
			</Row>
			<Tasks
				tasks={tasks || []}
				selectedDate={selectedDate}
				completeTask={completeTask}
				uncompleteTask={uncompleteTask}
			/>
			<AddForm addTask={addTask} />
		</div>
	);
};

export default MainBody;
