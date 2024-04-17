import Image from "next/image";
import ThemeDropDown from "../theme-dropdown";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logout as setLogout } from '@/redux/features/authSlice';

import { FiLogOut } from "react-icons/fi";
import { Button } from "../ui/button";


const AuthNavBar = () => {
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();
	const { isAuthenticated } = useAppSelector(state => state.auth);

	const handleLogout = () => {
        dispatch(setLogout());
		logout(undefined)
			.unwrap()
			.then(() => {
				console.log("Successful Backend Logout")
			});
	};

    return ( 
        <div className="w-full h-auto flex items-center justify-between px-20 py-5 backdrop-blur-sm bg-background/50 cursor-pointer shadow">
            <span>
                <Image
                    src="/assets/image/logo.png"
                    width={80}
                    height={80}
                    alt="AlgoWay Logo"
                    style={{objectFit: "contain"}}
                    />
            </span> 

            <span className="flex items-center justify-center space-x-2">
                <ThemeDropDown />
                <Button variant="outline" size="icon" onClick={handleLogout}>
                    <FiLogOut />
                </Button>
            </span>
        </div>
     );
}
 
export default AuthNavBar;