import { useEffect, useState } from "react"

import moment from "moment"
import Moment from "react-moment"

import BootstrapTable from "react-bootstrap-table-next"
import filterFactory, { textFilter } from "react-bootstrap-table2-filter"
import paginationFactory from "react-bootstrap-table2-paginator"

// const API_URL = "http://0.0.0.0:8080/events/"
const API_URL = "https://clubcal-server.herokuapp.com/events/?limit=150"

export default function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = () => {
      fetch(API_URL)
        .then((response) => response.json())
        .then((data: never[]) => {
          setData(data)
          setTimeout(fetchData, 5000)
        })
        .catch((err: Object) => console.warn(err))
    }
    fetchData()
  }, [])

  const columns = [
    {
      dataField: "scheduled_for",
      text: "Datetime",
      formatter: (cell: any, row: any, rowIndex: Number, extraData: any) => (
        <Moment date={row["scheduled_for"]} />
      ),
      sort: true
    },
    {
      dataField: "name",
      text: "Room",
      filter: textFilter()
    },
    {
      dataField: "description",
      text: "Description",
      filter: textFilter()
    },
    {
      dataField: "moderators",
      text: "Moderators",
      filter: textFilter()
    },
    {
      dataField: "link",
      text: "Link",
      formatter: (cell: any, row: any, rowIndex: Number, extraData: any) => (
        <div>
          <a href={row["link"]} target="_blank" rel="noreferrer">
            Join room
          </a>
        </div>
      )
    },
    {
      dataField: "Calendar",
      text: "Calendar",
      formatter: (cell: any, row: any, rowIndex: Number, extraData: any) => {
        const frmStr = "yyyyMMDDTHHmmss\\Z"
        const eventStart = moment.utc(row["scheduled_for"])
        const eventEnd = moment.utc(row["scheduled_for"]).add(1, "hours")
        return (
          <div>
            <a
              href={`https://calendar.google.com/calendar/r/eventedit?text=${
                row["name"]
              }&details=${encodeURI(row["description"])}+${encodeURI(
                row["link"]
              )}&dates=${encodeURI(eventStart.format(frmStr))}/${encodeURI(
                eventEnd.format(frmStr)
              )}`}
              target="_blank"
              rel="noreferrer">
              +
            </a>
          </div>
        )
      }
    }
  ]

  const defaultSorted = [
    {
      dataField: "Datetime",
      order: "desc"
    }
  ]

  return (
    <div className="main">
      <h1>Clubhouse Events</h1>
      <BootstrapTable
        classes="table-responsive"
        keyField="ID"
        data={data}
        columns={columns}
        defaultSorted={defaultSorted}
        filter={filterFactory()}
        pagination={paginationFactory()}
      />
    </div>
  )
}
