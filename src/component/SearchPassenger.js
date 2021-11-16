import React from "react";

const SearchPassenger = ({ onSearch }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(e.target.value);
        // if (e.target.value === "") {
        //     refetch({ id: {} });
        // } else {
        //     refetch({ id: { _eq: e.target.value } });
        // }
    };

    return (
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="id">Search by ID</label>
                <br />
                <input type="text" className="form-control" id="id" placeholder="Enter ID" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default SearchPassenger;