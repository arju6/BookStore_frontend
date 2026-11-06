import React, { useContext, useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify'
import { getHomeBookAPI } from "../../services/allApi";
import { SearchContext } from "../../context/SearchContext";


function Home() {
    const [homeBooks, setHomeBooks] = useState([]);
    console.log(homeBooks);
    const { searchKey, setSearchKey } = useContext(SearchContext)
    const navigate=useNavigate()


    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        const res = await getHomeBookAPI();
        if (res.status == 200) {
            setHomeBooks(res.data);
        }
    };

    const handleSearch=()=>{
        if(!searchKey){
            toast.warning("please enter a  book title")
        }
        else if(!sessionStorage.getItem("token")){
            toast.warning("please login!")
            setTimeout(() => {
                navigate('/login')
            },2000);
        }
        else if(searchKey && sessionStorage.getItem("token")){
                navigate('/all-books')
        }
        else{
            toast.error("something went wrong")
        }
    }

    return (
        <>
            <UserHeader />
            <section
                style={{ height: "500px" }}
className="bg-[url('https://s26162.pcdn.co/wp-content/uploads/sites/3/2023/02/used-books.jpg')] bg-cover bg-center flex justify-center items-center flex-col"            >
                <div
                    className="text-white text-center w-full flex items-center justify-center flex-col"
                    style={{ height: "500px", backgroundColor: "rgb(0,0,0,0,5)" }}
                >
                    <h1 className="text-5xl" style={{ fontFamily: "Dancing Script" }}>
                        Wonderfull Gifts
                    </h1>
                    <p className="mt-5">Give your family and friends a book</p>
                    <div className="mt-5">
                        <input
                            type="text"
                            placeholder="Search Book"
                            className="bg-white p-2 rounded-3xl placeholder-gray-600 w-100 text-black" onChange={(e)=>setSearchKey(e.target.value)}
                        />
                        <FontAwesomeIcon onClick={handleSearch}
                            icon={faMagnifyingGlass}
                            className="text-gray-600"
                            style={{ marginLeft: "-40px" }}
                        />
                    </div>
                </div>
            </section>

            <section className="flex items-center justify-center flex-col my-10">
                <h1 className="text-3xl font-bold">New Arrivals</h1>
                <h1 className="text-xl mt-4">Explore Our Latest Collections</h1>
                <div className="md:grid grid-cols-4 mt-5">
                    {homeBooks?.length > 0 ? (
                        homeBooks.map((book) => (
                            <div className="p-5" key={book._id}>
                                <div className="shadow p-3 rounded">
                                    <img src={book.imageUrl} alt={book.title} className="w-full h-70" />
                                    <div className="flex flex-col justify-center items-center mt-4">
                                        <p className="text-blue-900 font-bold text-lg">{book.author}</p>
                                        <p>{book.title}</p>
                                        <p>{book.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="font-bold text-center my-3">Loading...</p>
                    )}
                </div>
                <div className="text-center my-3">
                    <Link to={"/all-books"} className="bg-blue-500 p-3 text-white">
                        Explore More
                    </Link>
                </div>
            </section>

            <section className="md:grid grid-cols-2">
                <div className="p-5">
                    <h2 className="text-center text-3xl font-bold">Featured Authors</h2>
                    <h3 className="text-center text-2xl mt-1 font-bold">Captivates With Every Words</h3>
                    <p className="mt-3 text-justify">
                        Authors in a bookstore application are the visionaries behind the books that fill the shelves, each
                        contributing their own unique voice, creativity, and perspective to the world of literature. Whether
                        writing fiction, non-fiction, poetry, or educational works, authors bring stories, ideas, and
                        knowledge to life in ways that resonate with readers of all backgrounds.
                    </p>

                    <p className="mt-3 text-justify">
                        Their work spans a wide array of genres, from thrilling mysteries and heartwarming romances to
                        thought-provoking memoirs and insightful self-help books. Through their words, authors not only
                        entertain and inform but also inspire and challenge readers to think deeply, reflect, and grow. In a
                        bookstore application, authors' works become accessible to readers everywhere, offering a diverse
                        and rich tapestry of voices and experiences, all of which contribute to the evolving landscape of
                        modern literature.
                    </p>
                </div>

                <div className="p-3 flex justify-center items-center">
                    <img
                        src="https://www.shutterstock.com/image-photo/happy-attractive-african-business-leader-600nw-2451794349.jpg"
                        alt=""
                    />
                </div>
            </section>

            <section className="md:px-30 flex items-center justify-center flex-col my-10 p-5">
                <h1 className="text-3xl font-bold">TESTIMONALS</h1>
                <h1 className="text-xl mt-4">See What Others Are Saying</h1>
                <div className="flex items-center justify-center flex-col mt-5">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s"
                        alt=""
                        style={{ height: "100px", width: "100px", borderRadius: "50%" }}
                        className="rounded-3xl"
                    />
                    <h3 className="font-bold text-xl mt-3">Anna Sttef</h3>
                    <p className="text-justify mt-5 text-lg font-bold">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus nostrum molestias quisquam
                        accusantium quis, possimus deserunt rerum praesentium fuga officiis vitae enim incidunt, voluptatum
                        dolorem? Numquam optio quisquam dolor dolores!
                    </p>
                </div>
            </section>
            <ToastContainer position="top-center" theme="colored" autoClose={3000}></ToastContainer>
        </>
    );
}

export default Home;
