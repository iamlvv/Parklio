import ReactPaginate from "react-paginate";

const Paginate = ({ pageCount, handlePageClick }) => {
    return (
        <ReactPaginate
            previousLabel={"Previous"}
            breakLabel={"..."}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"previousBtn"}
            nextLinkClassName={"nextBtn"}
            disabledClassName={"paginationDisabled"}
            activeClassName="font-bold text-2xl cursor-pointer"
            pageClassName="py-2 px-3 hover:shadow-md hover:bg-black hover:text-white bg-white text-black transition ease-in rounded-md cursor-pointer"
            className="flex justify-center items-center px-5 font-medium rounded-md mb-5 gap-x-5"
        />
    );
};

export default Paginate;