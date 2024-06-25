import React, { useState } from "react";
import "../styles/nameservice.css";
import { MdArrowDropDown, MdArrowDropUp, MdVerified } from "react-icons/md";


const nameServiceData = [
  {
    id: 1,
    src: "https://meta.image.space.id/mkt-logo/eth-tld-logo-colored.jpg",
    name: "ENS: Ethereum Name Service",
    tld: ".eth",
    by: "By ens",
    volume: "0.72203",
    usd: "$2,471.19",
    domainsRegistered: 1176,
    totalRegistered: 1797520,
    uniqueHolders: 489454,
    color: "rgb(82, 132, 255)",
  },
  {
    id: 2,
    src: "https://cdn.meta.image.space.id/mkt-logo/taiko/taiko-logo-main.webp",
    name: "DotTaiko Name Service",
    tld: ".taiko",
    by: "By taiko",
    volume: "--",
    usd: "$0.00",
    domainsRegistered: 107,
    totalRegistered: 730,
    uniqueHolders: 426,
    color: "rgb(232, 24, 153)",
  },
  {
    id: 3,
    src: "https://meta.image.space.id/mkt-logo/bnb-tld-logo-colored.jpg",
    name: ".bnb Name Service",
    tld: ".bnb",
    by: "By spaceid",
    volume: "0.0068",
    usd: "$3.93",
    domainsRegistered: 14,
    totalRegistered: 280642,
    uniqueHolders: 250707,
    color: "rgb(241, 123, 44)",
  },
  {
    id: 4,
    src: "https://cdn.meta.image.space.id/mkt-logo/mode/mode-logo-design.png",
    name: "Mode Name Service",
    tld: ".mode",
    by: "By mode",
    volume: "0.00098",
    usd: "$3.40",
    domainsRegistered: 9,
    totalRegistered: 94980,
    uniqueHolders: 88004,
    color: "rgb(240, 185, 11)",
  },
  {
    id: 5,
    src: "https://meta.image.space.id/mkt-logo/arb-tld-logo-colored.jpg",
    name: ".arb Name Service",
    tld: ".arb",
    by: "By spaceid",
    volume: "--",
    usd: "$0.00",
    domainsRegistered: 5,
    totalRegistered: 83662,
    uniqueHolders: 74306,
    color: "rgb(223, 254, 0)",
  },
  {
    id: 6,
    src: "https://cdn.meta.image.space.id/mkt-logo/alien/alien-logo.jpeg",
    name: "ALIENX Name Service",
    tld: ".alien",
    by: "By alienx",
    volume: "--",
    usd: "$0.00",
    domainsRegistered: 2,
    totalRegistered: 42,
    uniqueHolders: 5,
    color: "rgb(212, 244, 98)",
  },
  {
    id: 7,
    src: "https://meta.image.space.id/mkt-logo/gno-logo.jpg",
    name: "Genome",
    tld: ".gno",
    by: "By genome",
    volume: "--",
    usd: "$0.00",
    domainsRegistered: 2,
    totalRegistered: 1965,
    uniqueHolders: 1044,
    color: "rgb(51, 211, 75)",
  },
  {
    id: 8,
    src: "https://meta.image.space.id/mkt-logo/inj/inj-logo.png",
    name: "Injective Name Service",
    tld: ".inj",
    by: "By inj",
    volume: "--",
    usd: "$0.00",
    domainsRegistered: 1,
    totalRegistered: 19757,
    uniqueHolders: 13660,
    color: "rgb(78, 181, 255)",
  },
  {
    id: 9,
    src: "https://meta.image.space.id/mkt-logo/sei/sei-logo.png",
    name: "Sei Name Service",
    tld: ".sei",
    by: "By sei",
    volume: "--",
    usd: "$0.00",
    domainsRegistered: 0,
    totalRegistered: 20538,
    uniqueHolders: 8958,
    color: "rgb(152, 15, 73)",
  },
  {
    id: 10,
    src: "https://cdn.meta.image.space.id/mkt-logo/zkf/zkf-logo.png",
    name: "ZKFair",
    tld: ".zkf",
    by: "By zkfair",
    volume: "--",
    usd: "$0.00",
    domainsRegistered: 0,
    totalRegistered: 13475,
    uniqueHolders: 9153,
    color: "rgb(77, 167, 255)",
  },
];

function NameServices() {
  const [data, setData] = useState(nameServiceData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortData = (key) => {
    let sortedData = [...data];
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      sortedData.reverse();
      setSortConfig({ key, direction: "descending" });
    } else {
      sortedData.sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      });
      setSortConfig({ key, direction: "ascending" });
    }
    setData(sortedData);
  };

  const renderSortArrow = (key) => {
    const isActive = sortConfig.key === key;
    const isAscending = sortConfig.direction === "ascending";

    return (
      <div className="arrow">
        <MdArrowDropUp style={{ marginBottom: "-5px",color: isActive && isAscending ? "#fff" : "#888" }} />
        <MdArrowDropDown style={{ color: isActive && !isAscending ? "#fff" : "#888" }} />
      </div>
    );
  };


  return (
    <div className="nameservice">
      <h3 className="nameservice-header">Name Service</h3>
      <div className="tablediv">
      <table>
        <thead>
          <tr>
            <th>#</th>

            <th onClick={() => sortData("name")}>
              <div>
              <p>Name Service</p>
              {renderSortArrow("name")}
              </div>
            </th>

            <th onClick={() => sortData("volume")}>
              <div>
                <p>Volume</p> 
                {renderSortArrow("volume")}
              </div>
            </th>

            <th onClick={() => sortData("domainsRegistered")}>
              <div>
              <p>Domain Registered</p> 
              {renderSortArrow("domainsRegistered")}
              </div>
            </th>

            <th onClick={() => sortData("totalRegistered")}>
              <div>
              <p>Total Registered </p>{renderSortArrow("totalRegistered")}
              </div>
            </th>

            <th onClick={() => sortData("uniqueHolders")}>
              <div>
              <p>Unique Holders</p>
              {renderSortArrow("uniqueHolders")}
              </div>
              </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <div className="column2">
                  <img src={item.src} alt={item.name} className="service-img" />
                  <div>
                    <p className="name">{item.name} (<span style={{ color: item.color }}>{item.tld}</span>) <span style={{ color: "white", marginLeft: "10px", marginTop: "4px" }}><MdVerified /></span></p>
                    <p className="by">{item.by}<span style={{ color: item.color }}>{item.tld}</span></p>
                  </div>
                </div>
              </td>
              <td>{item.volume}</td>
              <td>{item.domainsRegistered}</td>
              <td>{item.totalRegistered}</td>
              <td>{item.uniqueHolders}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default NameServices;
