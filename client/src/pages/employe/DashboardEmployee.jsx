import React, { useEffect, useState } from "react";
import { getPerdinByName } from "../../utils/api";
import { statusMap } from "../../utils/perdin-helper";

export default function DashboardEmployeer({ name }) {
  const [dataPerdin, setDataPerdin] = useState(null);

  useEffect(() => {
    getPerdinByName(name).then((perdin) => {
      console.log(perdin.perdin);
      setDataPerdin(perdin.perdin);
    });
  }, [name]);

  return (
    <div className="perdin-list">
      <h3>Daftar Permohonan Perjalanan Dinas {name}</h3>
      <div className="refresh-btn">
        <button onClick={() => window.location.reload()}>Segarkan Data</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Kota</th>
            <th>Tanggal</th>
            <th>Keterangan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dataPerdin?.map((data, index) => (
            <tr key={data._id}>
              <td className="perdin-data">
                <div>{index + 1}</div>
              </td>
              <td className="perdin-data">
                <div>
                  {data.fromCity}{" "}
                  <span style={{ fontSize: "1rem" }}>&rarr;</span>{" "}
                  {data.destinationCity}
                </div>
              </td>
              <td className="perdin-data">
                <div>
                  {data.startDate} <span style={{ fontSize: "1rem" }}>-</span>{" "}
                  {data.endDate}{" "}
                  <span style={{ color: "#6f6f6f" }}>
                    ({data.durationDay} Hari)
                  </span>
                </div>
              </td>
              <td className="perdin-data">
                <div
                  style={{
                    width: "300px",
                    textAlign: "justify",
                    margin: "0 auto",
                  }}
                >
                  {data.note}
                </div>
              </td>
              <td>
                <div
                  className="perdin-status"
                  style={{
                    backgroundColor: statusMap[data.status].backgroundColor,
                    color: statusMap[data.status].color,
                    textAlign: "center",
                  }}
                >
                  {data.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
