import { Outlet } from "react-router-dom";

const protectedAuth = () => {
  
	return (
		<>
			<div>	
				<div
					style={{
						backgroundColor: "#f3f4ff",
					}}
					className=" px-3 ">      
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default protectedAuth;
