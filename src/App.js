import "./App.css";
import { useState, useEffect } from "react";
import moment from "moment";
import MainBody from "./components/mainBody/MainBody";

function App() {
	const [allTasks, setTasks] = useState({});
	const [selectedDateTasks, setSelectedDateTasks] = useState([]);

	useEffect(() => {
		loadTasks();
	}, []);

	const loadTasks = async (date) => {
		let selectedDate;
		if (!date) {
			selectedDate = moment().format("MM.DD.YYYY");
		} else {
			selectedDate = moment(date).format("MM.DD.YYYY");
		}
		const data = await fetch(`http://localhost:5000/tasks`);
		const tasks = await data.json();
		console.log("------------------------------------", tasks[selectedDate]);
		if (tasks) {
			setTasks(tasks);
			setSelectedDateTasks(tasks[selectedDate]);
		}
	};

	return <MainBody tasks={selectedDateTasks} allTasks={allTasks} loadTasks={loadTasks} />;
}

export default App;
