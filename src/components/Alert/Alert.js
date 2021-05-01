import {Alert} from 'react-bootstrap';
import {useState} from 'react'

const CustomAlert = ({varient, classname, message, heading, dismissible}) => {
	const [show, setShow] = useState(true);

	if(show){
		return(
			<Alert className={classname} variant={varient} onClose={() => setShow(false)} dismissible={dismissible}>
				{heading ? <Alert.Heading>{heading}</Alert.Heading> : ''}
	      {heading ? <p>{message}</p> : message}
	    </Alert>
		)
	}else{
		return(
		''
		)
	}
}

export default CustomAlert;