import { useState } from "react";
import { Row, Col, FormGroup, FormControl } from "react-bootstrap";
import { PlusSquareFill } from "react-bootstrap-icons";
import { propTypes } from "react-bootstrap/esm/Image";
import "./addForm.css";

const AddForm = (props) => {
	const [name, setName] = useState("");
	const [priority, setPriority] = useState(0);

	const handleChange = (e) => {
		if (e.target.name == "name") {
			setName(e.target.value);
		} else {
			setPriority(e.target.value);
		}
	};

	return (
		<Row className="newTask">
			<Col xs={6}>
				<FormGroup>
					<FormControl
						name="name"
						value={name}
						onChange={handleChange}
						placeholder="Enter task description..."
					/>
				</FormGroup>
			</Col>
			<Col xs={2}>
				<FormGroup>
					<FormControl
						name="priority"
						value={priority}
						onChange={handleChange}
						as="select"
						placeholder="Priority..."
					>
						<option value={0}>Priority...</option>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
					</FormControl>
				</FormGroup>
			</Col>
			<Col xs={2} style={{ display: "flex", alignItems: "center" }}>
				<PlusSquareFill
					style={{ cursor: "pointer" }}
					color="#2a9df4"
					size="40px"
					onClick={(e) => props.addTask(name, priority)}
				/>
			</Col>
		</Row>
	);
};

export default AddForm;
