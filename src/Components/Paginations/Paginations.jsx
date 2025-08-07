import React, { useState } from "react";
import { Pagination } from "antd";
import Cards from "../Cards/Cards";
import "./Paginations.css";

const Paginations = ({current, setCurrent, markStepCompleted}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);

  const onChange = (page) => {
    setCurrentPage(page);
    
    // Mark step as completed when user interacts with pagination
    if (!hasInteracted) {
      setHasInteracted(true);
      markStepCompleted(current);
    }
  };

  return (
    <>   
        <div className="pagination">
          <div className="heading">Pagination</div>
          <Cards currentPage={currentPage} />
          <Pagination
            className="page"
            current={currentPage}
            onChange={onChange}
            total={200}
          />
        </div>
    </>
  );
};

export default Paginations;
