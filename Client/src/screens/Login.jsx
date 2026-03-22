export function Login() {
    const userDetails = {
        gymId: "",
        password: ""
    }
    return(
        <div>
            <form
                action=""
                method="post"
            >
                <div
                    className="flex  items-center w-full mb-[25px] md:mb-[30px] text-primary "
                >
                   <p
                       className="w-[25%] md:w-[10%] text-white" 
                    >
                        GymID
                    </p> 
                    <input
                        type="text"
                        name="gymId"
                        id="gymId"
                    />
                </div>
                <div
                    className="flex  items-center w-full mb-[25px] md:mb-[30px] text-primary "
                >
                   <p
                       className="w-[25%] md:w-[10%] text-white" 
                    >
                        Password
                    </p> 
                    <input
                        type="password"
                        name="password"
                        id="password"
                    />
                </div>
            </form>
        </div>
    )
}