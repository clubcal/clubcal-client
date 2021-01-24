import React, { useEffect, useState, Fragment } from "react";

import Tabletop from "tabletop";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

import "./App.css";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Tabletop.init({
      key:
        "https://docs.google.com/spreadsheets/u/1/d/1EoVnDcOIu9UbrVCsZrIlX0aNj0wVkIGEjuLMtaXWDVA/pubhtml",
      simpleSheet: true,
    })
      .then((data) => setData(data))
      .catch((err) => console.warn(err));
  }, []);

  const columns = [
    {
      dataField: "Datetime",
      text: "Datetime",
      sort: true,
    },
    {
      dataField: "Room",
      text: "Room",
      filter: textFilter(),
    },
    {
      dataField: "Description",
      text: "Description",
      filter: textFilter(),
    },
    {
      dataField: "Moderators",
      text: "Moderators",
      filter: textFilter(),
    },
    {
      dataField: "Event Link",
      text: "Link",
    },
  ];

  const defaultSorted = [
    {
      dataField: "Datetime",
      order: "desc",
    },
  ];

  return (
    <>
      <h1>Clubhouse Events</h1>
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
        defaultSorted={defaultSorted}
        filter={filterFactory()}
        pagination={paginationFactory()}
      />
    </>
  );
}
