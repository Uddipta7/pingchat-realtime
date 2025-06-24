import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp.webp"
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import { serverUrl } from '../main';
import axios from 'axios';
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function SideBar() {
    const { userData, otherUsers, selectedUser, onlineUsers, searchData } = useSelector(state => state.user);
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
            dispatch(setUserData(null));
            dispatch(setOtherUsers(null));
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/search?query=${input}`, { withCredentials: true });
            dispatch(setSearchData(result.data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (input) handleSearch();
    }, [input]);

    return (
        <div className={`lg:w-[30%] w-full h-full overflow-hidden lg:block bg-slate-200 relative ${!selectedUser ? "block" : "hidden"}`}>
            <div className='fixed bottom-[20px] left-[10px] cursor-pointer'>
                <div className='w-[60px] h-[60px] rounded-full bg-[#20c7ff] flex justify-center items-center shadow-lg shadow-gray-500 text-gray-700' onClick={handleLogOut}>
                    <BiLogOutCircle className='w-[25px] h-[25px]' />
                </div>
            </div>

            {input.length > 0 && (
                <div className='absolute top-[250px] z-[150] bg-white w-full h-[500px] overflow-y-auto flex flex-col items-center pt-[20px] gap-[10px] shadow-lg'>
                    {searchData?.map((user) => (
                        <div
                            key={user._id}
                            className='w-[95%] h-[70px] flex items-center gap-[20px] px-[10px] hover:bg-[#78cae5] border-b-2 border-gray-400 cursor-pointer'
                            onClick={() => {
                                dispatch(setSelectedUser(user));
                                setInput("");
                            }}
                        >
                            <div className='relative'>
                                <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center'>
                                    <img src={user.image || dp} alt="" className='h-full' />
                                </div>
                                {onlineUsers?.includes(user._id) && (
                                    <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-md'></span>
                                )}
                            </div>
                            <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
                        </div>
                    ))}
                </div>
            )}

            <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-lg shadow-gray-400 flex flex-col justify-center px-[20px]'>
                <h1 className='text-white font-bold text-[25px]'>chatly</h1>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='text-gray-800 font-bold text-[25px]'>Hii , {userData.name || "user"}</h1>
                    <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-lg' onClick={() => navigate("/profile")}>
                        <img src={userData.image || dp} alt="" className='h-full' />
                    </div>
                </div>

                <form className='w-full h-[60px] bg-white shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full px-[20px]'>
                    <IoIosSearch className='w-[25px] h-[25px]' />
                    <input
                        type="text"
                        placeholder='search users...'
                        className='w-full h-full p-[10px] text-[17px] outline-none border-0'
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    {input && <RxCross2 className='w-[25px] h-[25px] cursor-pointer' onClick={() => setInput("")} />}
                </form>
            </div>

            <div className='w-full h-[50%] overflow-auto flex flex-col gap-[20px] items-center mt-[20px]'>
                {otherUsers?.map((user) => (
                    <div
                        key={user._id}
                        className='w-[95%] h-[60px] flex items-center gap-[20px] bg-white shadow-lg shadow-gray-500 rounded-full hover:bg-[#78cae5] cursor-pointer'
                        onClick={() => dispatch(setSelectedUser(user))}
                    >
                        <div className='relative'>
                            <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center'>
                                <img src={user.image || dp} alt="" className='h-full' />
                            </div>
                            {onlineUsers?.includes(user._id) && (
                                <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-md'></span>
                            )}
                        </div>
                        <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SideBar;
