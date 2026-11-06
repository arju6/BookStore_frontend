
import React, { useContext, useEffect, useState } from "react";
import {
    faFacebook,
    faInstagram,
    faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
    faBars,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { routerContext } from "../../context/RouterGuardContext";
import ProfileImage from "../../components/ProfileImage";

function UserHeader() {
    const [listStatus, setListStatus] = useState(false);
    const [token, setToken] = useState("");
    const [userDp, setUserDp] = useState("");
    const [userId, setUserId] = useState("");
    const [dropdown, setDropDown] = useState(false);
    const {setAuthorizedUser}=useContext(routerContext)
    const navigate = useNavigate();

    // Load logged-in user details
    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        const storedUser = sessionStorage.getItem("user");

        if (storedToken && storedUser) {
            try {
                const user = JSON.parse(storedUser);

                setToken(storedToken);
                setUserDp(user.picture || "");
                setUserId(user._id || "");
            } catch (error) {
                console.error("Unable to read stored user data:", error);
            }
        }
    }, []);

    // Logout
    const logout = () => {
        sessionStorage.clear();
        setAuthorizedUser(false)
        setToken("");
        setUserDp("");
        setUserId("");
        setDropDown(false);
        navigate("/login");
    };

    return (
        <>
            {/* Header */}
            <div className="grid grid-cols-3 p-3">
                {/* Logo */}
                <div className="flex items-center">
                    <img
                        src="https://png.pngtree.com/png-vector/20240515/ourmid/pngtree-open-book-logo-png-image_12467719.png"
                        alt="BookStore logo"
                        width="70"
                    />
                    <h1 className="text-2xl font-bold ms-3 md:hidden">
                        BookStore
                    </h1>
                </div>

                {/* Desktop title */}
                <div className="md:flex items-center justify-center hidden">
                    <h1 className="text-3xl font-bold">BookStore</h1>
                </div>

                {/* Desktop social links and profile */}
                <div className="md:flex justify-end items-center hidden">
                    <FontAwesomeIcon
                        className="text-2xl"
                        icon={faInstagram}
                    />
                    <FontAwesomeIcon
                        className="text-2xl"
                        icon={faXTwitter}
                    />
                    <FontAwesomeIcon
                        className="text-2xl"
                        icon={faFacebook}
                    />

                    {!token ? (
                        <Link
                            to="/login"
                            className="ms-5 border-black rounded py-2 px-3"
                        >
                            <FontAwesomeIcon
                                className="text-lg"
                                icon={faUser}
                            />
                            Login
                        </Link>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setDropDown(!dropdown)}
                                className="shadow-sm ms-4 rounded p-1"
                                aria-label="Open profile menu"
                            >
                                <ProfileImage
                                    width="40"
                                    height="40"
                                    className="rounded-full object-cover"
                                    picture={userDp}
                                    alt="Profile"
                                />
                            </button>

                            {dropdown && (
                                <div className="absolute right-0 top-12 z-50 ring-black/40 shadow w-40 rounded p-2 bg-white ring">
                                    <Link
                                        to={`/profile/${userId}`}
                                        className="block p-2"
                                        onClick={() => setDropDown(false)}
                                    >
                                        Profile
                                    </Link>

                                    <button
                                        className="p-2 block"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav
                className="md:flex items-center justify-center p-2"
                style={{ backgroundColor: "#0d0505" }}
            >
                {/* Mobile navigation controls */}
                <div className="flex justify-between items-center w-full md:hidden">
                    <button
                        onClick={() => setListStatus(!listStatus)}
                        aria-label="Toggle navigation"
                    >
                        <FontAwesomeIcon
                            className="text-2xl text-white"
                            icon={faBars}
                        />
                    </button>

                    {!token ? (
                        <Link
                            to="/login"
                            className="ms-5 text-white rounded py-2 px-3"
                        >
                            <FontAwesomeIcon
                                className="text-lg"
                                icon={faUser}
                            />
                            Login
                        </Link>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setDropDown(!dropdown)}
                                className="shadow-sm ms-4 rounded p-1"
                                aria-label="Open profile menu"
                            >
                                <ProfileImage
                                    width="40"
                                    height="40"
                                    className="rounded-full object-cover"
                                    picture={userDp}
                                    alt="Profile"
                                />
                            </button>

                            {dropdown && (
                                <div className="absolute right-0 top-12 z-50 ring-black/40 shadow w-40 rounded p-2 bg-white ring">
                                    <Link
                                        to={`/profile/${userId}`}
                                        className="block p-2"
                                        onClick={() => setDropDown(false)}
                                    >
                                        Profile
                                    </Link>

                                    <button
                                        className="p-2 block"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Navigation links */}
                <div
                    className={
                        listStatus
                            ? "flex flex-col text-white"
                            : "md:flex hidden text-white"
                    }
                >
                    <Link
                        to="/"
                        className="md:mx-4 mt-2"
                        onClick={() => setListStatus(false)}
                    >
                        Home
                    </Link>

                    <Link
                        to="/all-books"
                        className="md:mx-4 mt-2"
                        onClick={() => setListStatus(false)}
                    >
                        Books
                    </Link>

                    <Link
                        to="/contact"
                        className="md:mx-4 mt-2"
                        onClick={() => setListStatus(false)}
                    >
                        Contact
                    </Link>
                </div>
            </nav>
        </>
    );
}

export default UserHeader;
