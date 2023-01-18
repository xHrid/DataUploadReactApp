import '../Form.css';
import { useState } from 'react';
import Spinner from "react-bootstrap/Spinner";

function Form() {
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const onSubmit=(e) => {
		e.preventDefault();
		const formData=new FormData();
		formData.append('file',file);
		setLoading(true);
		fetch("http://localhost:3000/upload", {
			method: 'POST',
			body: formData
		}).then(res => 
			{ setLoading(false);
				alert("Data updated")
			})
			.catch((err) => console.log(err));
	}
	const onChange=(e) => {
		setFile(e.target.files[0]);
	}
	return (
		<form onSubmit={onSubmit}>
			<h1>File Upload</h1>
			<input type="file" name="file" onChange={onChange} />
			<button type="submit">Upload</button>
			{ loading && <Spinner  animation='border'/>}
		</form>
	)
}
export default Form;