// import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./ErrorPage";

import ProtectedAuth from "./components/ProtectedAuth";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./Redux-store/store";
import { Provider } from "react-redux";
import App from "./App";
import Home from "./screens/Home"
import Auth from "./screens/Auth"



const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <ErrorPage />,
		element: <App />,
		children: [
			{
				path: "",
				errorElement: <ErrorPage />,
				element: <Home/>
			},
			{
				path: "auth",
				errorElement: <ErrorPage />,
				element: <ProtectedAuth />,
        children : [
          {
          path: "",
          errorElement: <ErrorPage/>,
          element: <Auth/>
          }
        ]
				
			},	
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<RouterProvider router={router} />
		</PersistGate>
	</Provider>
	// </React.StrictMode>
);
