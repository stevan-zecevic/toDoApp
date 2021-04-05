import { useEffect, useState } from "react";
import { FormCheck } from "react-bootstrap";
import { Check } from "react-bootstrap-icons";
import "./tasks.css";

const UnfinishedTasks = (props) => {
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		setChecked(false);
	}, [props.tasks]);

	useEffect(() => {
		if (checked) {
			props.hideTasks("unfinishedTasks");
		} else {
			props.showTasks("unfinishedTasks");
		}
	}, [checked]);

	return (
		<div className="unfinishedTasks">
			<h3>
				Pending
				<FormCheck
					id="switchEnabled"
					type="switch"
					checked={checked}
					onChange={(e) => {
						setChecked(!checked);
					}}
					label="Hide"
				/>
			</h3>
			<div className="tasks" style={{ height: 60 * props.tasks.length }}>
				{props.tasks.map((task) => (
					<p className={task.priority == 1 ? "red" : "orange"}>
						{task.name}
						<Check
							style={{
								cursor: "pointer",
								position: "absolute",
								right: 10,
							}}
							color="white"
							size="30px"
							onClick={(e) => props.completeTask(task)}
						/>
					</p>
				))}
			</div>
		</div>
	);
};

export default UnfinishedTasks;
