import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotifications, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export function Header(props) {
    const {openSidebar, setOpenSidebar, setOpenAuthenticatePanel, openAuthenticatePanel} = props;

    return(
        <div
            className="bg-primary w-full h-[70px] sm:h-[60px] mb-[10px] flex items-center px-[20px] sm:px-[20px] rounded-lg"
        >
            <GiHamburgerMenu 
                className="block sm:hidden mr-[15px] text-lg"
                onClick={() => setOpenSidebar(!openSidebar)}
            />
            <img 
                src="logo.png"
                alt="Logo"
                className="w-[70px] block sm:hidden"
            />
            <input 
                type="search" 
                name="search-bar" 
                id="search-bar"
                placeholder="Find something here ..."
                className="sm:w-[70%] px-[10px] py-[6px] rounded-lg text-primary text-sm outline-none"
            />
            <IoIosNotifications 
                color="white"
                size={24}
                className="ml-[10px] sm:ml-[30px] md:ml-[140px] sm:mr-[10px] md:mr-[20px]"
            />
            <div
                className="flex text-xs items-center"
            >
                <img
                    src="profile.webp"
                    alt="profile picture"
                    className="w-[40px] md:w-[50px] h-[40px] md:h-[50px] rounded-full"
                />
                <p
                    className="ml-[5px] text-white"
                >
                    Admin
                </p>
            </div>
            {
                openAuthenticatePanel ?
                <IoMdArrowDropup
                    color="white"
                    size={25}
                    className="ml-[10px] hidden sm:block md:hidden"
                    onClick={() => setOpenAuthenticatePanel(!openAuthenticatePanel)}
                />:
                <IoMdArrowDropdown
                color="white"
                size={25}
                className="ml-[10px] hidden sm:block md:hidden"
                onClick={() => setOpenAuthenticatePanel(!openAuthenticatePanel)}
            />
            }
            <button
                className="bg-secondary p-[6px] ml-[30px] rounded-xl text-white hidden md:block"
            >
                Logout
            </button>
            
        </div>
        
    )
}