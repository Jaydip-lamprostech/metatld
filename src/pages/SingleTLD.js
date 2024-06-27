import React, { useState } from "react";
import { Button, Input, Select, Table, message } from "antd";
import "antd/dist/reset.css";
import { MdVerified } from "react-icons/md";
import "../styles/singletld.css";
import { Option } from "antd/es/mentions";
import Search from "antd/es/input/Search";
import { BiRefresh } from "react-icons/bi";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";

const columns = [
  {
    title: "Domains",
    dataIndex: "Domains",
    key: "Domains",
    render: (text) => (
      <span style={{ fontSize: "16px" }}>
        {text}
        <span style={{ color: "blue", fontSize: "16px" }}>
          .eth
        </span>
      </span>
    ),
  },
  {
    title: "Name Service",
    dataIndex: "Name Service",
    key: "Name Service",
    render: (text) => (
      <span className="text-table">
        {text}
        <MdVerified style={{ color: "green", marginTop: "5px" }} />
      </span>
    ),
  },
  {
    title: "Current Price",
    dataIndex: "Current Price",
    key: "Current Price",
  },
  {
    title: "Last Sale",
    dataIndex: "Last Sale",
    key: "Last Sale",
  },
  {
    title: "Expiration Date",
    dataIndex: "Expiration Date",
    key: "Expiration Date",
  },
];

const initialdata = [
  {
    Domains: "pam-vault",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "998 years",
  },
  {
    Domains: "petrarca-m",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "998 years",
  },
  {
    Domains: "iwantqq",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "997 years",
  },
  {
    Domains: "willjasen",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "577 years",
  },
  {
    Domains: "n0b0dy",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "508 years",
  },
  {
    Domains: "underground",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "499 years",
  },
  {
    Domains: "juggalosla",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "498 years",
  },
  {
    Domains: "siblings",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "476 years",
  },
  {
    Domains: "roguegod",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "6943 years",
  },
  {
    Domains: "shytoshiku..",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "2248 years",
  },
  {
    Domains: "rogueempi..",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "1419 years",
  },
  {
    Domains: "roguesolip..",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "999 years",
  },
  {
    Domains: "rogueempire..",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "999 years",
  },
  {
    Domains: "inthecrowd",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "999 years",
  },
  {
    Domains: "inshallah",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "998 years",
  },
  {
    Domains: "btcblade",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "381 years",
  },
  {
    Domains: "xenes1s",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "367 years",
  },
  {
    Domains: "thesensat..",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "326 years",
  },
  {
    Domains: "websage",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "288 years",
  },
  {
    Domains: "tianpu",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "254 years",
  },
  {
    Domains: "statelessd..",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "248 years",
  },
  {
    Domains: "schwarzma..",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "248 years",
  },
  {
    Domains: "privacypar..",
    "Name Service": "ENS: Ethereum",
    "Current Price": "--",
    "Last Sale": "--",
    "Expiration Date": "248 years",
  },
];
function SingleTLD() {
  const [data, setData] = useState(initialdata);
  const [searchText, setSearchText] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("ascend");

  const onSearch = (value) => {
    if (value.trim() === "") {
      message.warning("Please enter something to search.");
      return;
    }
    setSearchText(value);
    const filteredData = initialdata.filter((item) =>
      item.Domains.toLowerCase().startsWith(value.toLowerCase())
    );
    setData(filteredData);
  };

  const handleRefresh = () => {
    setSearchText("");
    setSelectedColumn("");
    setSortOrder("ascend");
    setData(initialdata);
    message.success("Data refreshed.");

  };

  const handleColumnSelect = (value) => {
    setSelectedColumn(value);
  };

  const handleSort = () => {
    if (!selectedColumn) {
      message.warning("Please select a column to sort.");
      return;
    }

    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === "ascend") {
        return a[selectedColumn].localeCompare(b[selectedColumn]);
      }
      return b[selectedColumn].localeCompare(a[selectedColumn]);
    });
    setSortOrder(sortOrder === "ascend" ? "descend" : "ascend");
    setData(sortedData);

    const orderMessage = sortOrder === "ascend" ? "ascending" : "descending";
    message.info(`Sorted data based on ${selectedColumn} in ${orderMessage} order.`);
  };

  return (
    <div className="singletld">
      <div className="single-header">
        <h3 className="domain-text">100K+ Domains</h3>

        <div className="parts">
          <Search
            placeholder="Search"
            onSearch={onSearch}
            enterButton
            className="custom-search"
          />
          <Button
            icon={
              <BiRefresh style={{ fontSize: "18px" }}/>
            }
            onClick={handleRefresh}
            style={{ height: "40px", width: "40px" }}

          />

        </div>

        <div className="parts">
          <Select
            placeholder="Select"
            onChange={handleColumnSelect}
            className="custom-select"
          >
            {columns.map((col) => (
              <Option key={col.key} value={col.dataIndex}>
                {col.title}
              </Option>
            ))}
          </Select>

          <Button
            icon={
              sortOrder === "ascend" ? (
                <TbSortAscending style={{ fontSize: "18px" }}/>
              ) : (
                <TbSortDescending style={{ fontSize: "18px" }}/>
              )
            }
            onClick={handleSort}
            style={{ height: "40px", width: "40px" }}

          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="Domains"
        pagination={false}
        scroll={{
          y: 450,
        }}
      />
    </div>
  );
}

export default SingleTLD;
