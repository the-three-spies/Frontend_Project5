
import axios from "axios";
import React, { useState ,useEffect} from "react";
// import JsonData from "./MOCK_DATA.json";
import ReactPaginate from "react-paginate";
import "./styleApi.css"
function ApiPagination() {


  const [users, setUsers] = useState([]);//JsonData.slice(0, 50)
  const [pageNumber, setPageNumber] = useState(0);



useEffect(()=>{
    axios.get("https://api.itbook.store/1.0/new")
    .then(result=>{
        console.log(result.data.books)
        setUsers(result.data.books)
    })
},[])

  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => {
      return (
        <div className="user">
          <h3>{user.title}</h3>
          <h3>{user.price}</h3>
          <h3>{ <img className="imageAPIE" src={user.image} ></img>}</h3>
        </div>
      );
    });

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
    <div className="maimpagination">
        
      {displayUsers}

      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    
    </>
  );
}

export default ApiPagination;