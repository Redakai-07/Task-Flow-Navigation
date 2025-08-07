import React from "react";
import { Card, Row, Col } from "antd";
import { useState, useEffect } from "react";
import "./Cards.css";
import task1 from "../../requirements/task-complete.png";
import task2 from "../../requirements/task-incomplete.png";

const Cards = ({ currentPage }) => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = datas.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setDatas(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (

    <div className="cards">
      <Row gutter={[16, 16]} justify="center">
        {currentData.map((data) => (
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card className="card" key={data.id}>
            <div className="image">
                <img src={data.completed ? task1 : task2} alt="task logo" />
            </div>
            <div className="cardDesc">
              <p className="title">{data.title}</p>
              <p>UserId: {data.userId}</p>
              <p>Id: {data.id}</p>
              <p>Status: {data.completed ? "Completed" : "Pending"}</p>
            </div>
          </Card>
        </Col>
      ))}
      </Row>
    </div>
  );
};

export default Cards;
