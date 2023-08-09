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

  let selectedStatus = statusMap["Ditinjau"];
  if (statusMap[dataPerdin?.status])
    selectedStatus = statusMap[dataPerdin?.status];

  return (
    <div className="perdin-list">
      <h3>Daftar Permohonan Perjalanan Dinas {name}</h3>
      <table>
        <thead>
          <tr>
            <th>Kota</th>
            <th>Tanggal</th>
            <th>Keterangan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dataPerdin?.map((data) => (
            <tr key={data._id}>
              <td>
                <div className="perdin-data">
                  {data.fromCity}{" "}
                  <span style={{ fontSize: "1rem" }}>&rarr;</span>{" "}
                  {data.destinationCity}
                </div>
              </td>
              <td>
                <div className="perdin-data">
                  {data.startDate} <span style={{ fontSize: "1rem" }}>-</span>{" "}
                  {data.endDate}{" "}
                  <span style={{ color: "#6f6f6f" }}>
                    ({data.durationDay} Hari)
                  </span>
                </div>
              </td>
              <td>
                <div
                  className="perdin-data"
                  style={{ width: "300px", textAlign: "justify" }}
                >
                  {data.note}
                </div>
              </td>
              <td>
                <div
                  className="perdin-data perdin-status"
                  style={{
                    backgroundColor: selectedStatus.backgroundColor,
                    color: selectedStatus.color,
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
