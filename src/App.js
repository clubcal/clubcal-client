import React, { useEffect, useState, Fragment } from "react";

import Tabletop from "tabletop";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  dateFilter
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import Moment from 'react-moment';
import 'moment-timezone';

import "./App.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      Tabletop.init({
        key:
          "https://docs.google.com/spreadsheets/u/1/d/1EoVnDcOIu9UbrVCsZrIlX0aNj0wVkIGEjuLMtaXWDVA/pubhtml",
        simpleSheet: true,
      })
        .then((data) => {
          setData(data);
          setTimeout(fetchData, 5000);
        })
        .catch((err) => console.warn(err));
    }
    fetchData();
  }, []);

  const columns = [{
    dataField: 'Datetime_iso',
    text: 'Datetime',
    formatter: (cell, row, rowIndex, extraData) => (
      row['Datetime']
    ),
    sort: true
  },{
    dataField: 'Room',
    text: 'Room',
    filter: textFilter()
  }, {
    dataField: 'Description',
    text: 'Description',
    filter: textFilter()
  }, {
    dataField: 'Moderators',
    text: 'Moderators',
    filter: textFilter()
  }, {
    dataField: 'Event Link',
    text: 'Link',
    formatter: (cell, row, rowIndex, extraData) => (
      <div>
        <a href={row['Event Link']} target="_blank">Join room</a>
      </div>
    )
  }, {
    dataField: 'Calendar',
    text: 'Calendar',
    formatter: (cell, row, rowIndex, extraData) => (
      <div> 
        <a href={row['Calendar']} target="_blank">+</a>
      </div>
    )
  }];

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
