import { useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/auth/SignIn";
import NoPage from "./pages/NotFound";

import SubApp from "./SubApp";

import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/index.scss";
import Tokens from "./pages/Tokens";
import Wallets from "./pages/Wallets";
import useStore from './useStore'
import ManageAdmins from "./pages/ManageAdmins";
import Loading from "./components/Loading";

interface Props {
	component: React.ComponentType;
	path?: string;
}

const PrivateRoute: React.FC<Props> = ({ component: RouteComponent }) => {
	const { account } = useStore();
	const location = useLocation();
	const navigate = useNavigate();

	if (!account) {
		navigate("/login");
	}

	useEffect(() => {
		// if (location.pathname === "/")
		//     dispatch({ type: "pageIndex", payload: 0 });
		// if (location.pathname.includes("/allnft"))
		//     dispatch({ type: "pageIndex", payload: 1 });
		// if (location.pathname.includes("/allcollection"))
		//     dispatch({ type: "pageIndex", payload: 2 });
		// if (location.pathname.includes("/alluser"))
		//     dispatch({ type: "pageIndex", payload: 3 });
		// if (location.pathname.includes("/admin-manage"))
		//     dispatch({ type: "pageIndex", payload: 4 });
	}, [location.pathname]);

	return <RouteComponent />;
};

// const FilterRoute: React.FC<Props> = ({ component: RouteComponent }) => {
//     return <RouteComponent />;
// };

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				{/* <Route
					path="/register"
					element={<FilterRoute component={Register} />}
				/> */}
				<Route path="/" element={<SubApp />}>
					<Route
						path="/"
						element={<PrivateRoute component={Tokens} />}
					/>
					<Route
						path="/tokens"
						element={<PrivateRoute component={Tokens} />}
					/>
					<Route
						path="/download-wallet"
						element={<PrivateRoute component={Wallets} />}
					/>
					<Route
						path="/manage-admins"
						element={<PrivateRoute component={ManageAdmins} />}
					/>
				</Route>
				<Route path="*" element={<NoPage />} />
			</Routes>
			<ToastContainer />
			<Loading />
		</Router>
	);
}
