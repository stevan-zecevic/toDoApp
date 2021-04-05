import { useEffect, useState } from "react";
import { FormCheck } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import "./tasks.css";

const FinishedTasks = (props) => {
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		setChecked(false);
	}, [props.tasks]);

	useEffect(() => {
		if (checked) {
			props.hideTasks("finishedTasks");
		} else {
			props.showTasks("finishedTasks");
		}
	}, [checked]);

	return (
		<div className="finishedTasks">
			<h3>
				Completed
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
					<p>
						{task.name}
						<XCircle
							style={{
								cursor: "pointer",
								position: "absolute",
								right: 10,
							}}
							color="white"
							size="30px"
							onClick={(e) => props.uncompleteTask(task)}
						/>
					</p>
				))}
			</div>
		</div>
	);
};

export default FinishedTasks;
