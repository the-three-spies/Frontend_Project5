import axios from "axios";
import React, { useState, useEffect } from "react";
// import JsonData from "./MOCK_DATA.json";
import ReactPaginate from "react-paginate";
import "./styleApi.css";
function ApiPagination() {
  const [users, setUsers] = useState([]); //JsonData.slice(0, 50)
  const [pageNumber, setPageNumber] = useState(0);
  useEffect(() => {
    axios.get("https://api.itbook.store/1.0/new").then((result) => {
      console.log(result.data.books);
      setUsers(result.data.books);
    });
  }, []);
  
  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => {
      return (
        <div className="book">
          <img src={user.image}></img>
          <div className="book_info">
            <h4 className="book_title">{user.title}</h4>
            <p className="book_price">{user.price}</p>
            <button className="book_btn">Buy Now</button>
          </div>
        </div>
      );
    });
  const pageCount = Math.ceil(users.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <>
      <div className="books_container">
      <section className="books" >
          <h2>Donation Books</h2>
          <h3>Buy it... And saving a child from starving</h3>
        <div className="all_books">
          <div className="maimpagination">{displayUsers}</div>
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
        </div>
        </section>
      </div>
    </>
  );
}
export default ApiPagination;
