import { Provider } from "react-redux";
import "./App.css";
import ToDoList from "./component/ToDoList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./redux/store";
import Login from "./component/Login";
import Auth from "./component/Auth";
import VerifiedUser from "./component/VerifiedUser";

function App() {
	return (
		<div>
			<Provider store={store}>
				<VerifiedUser />
				<ToastContainer theme="colored" />
			</Provider>
		</div>
	);
}

export default App;
