import React, { useEffect, useState } from "react";
import { dealerwisereport, Users } from "../../axios/Service";
import { DashboradDataProps } from "../../../@types/dashboardobject";
import { useToken } from "../../../utility/hooks";
import { Helmet } from "react-helmet";
import Chart from "react-apexcharts";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ListDashboard() {
  const token: string = useToken();
  const [people, setPeople] = useState<DashboradDataProps[]>([]);
  const [chartOptions, setChartOptions] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: 0,
                to: 100,
                color: "#002244",
              },
            ],
          },
        },
      },
      xaxis: {
        categories: [] as string[],
      },
    },
    series: [
      {
        name: "Leads Data",
        data: [] as number[],
      },
    ],
  });

  const handle = () => {
    let formdata = new FormData();
    formdata.append("token", token);
    Users(formdata).then((response) => {
      console.log("API Response:", response?.data);
      setPeople(response?.data?.data);
    });
  };

  useEffect(() => {
    if (token) {
      handle();
    }
  }, [token]);

  const handlewisereport = (page: number = 1, size: number = 10) => {
    let formdata = new FormData();
    formdata.append("token", token);
    dealerwisereport(page, size, formdata).then((response) => {
      console.log("Dealerwise Report:", response?.data?.data?.items);

      const categories = response.data.data.items.map(
        (item: any) => item.Dealer
      );
      const seriesData = response.data.data.items.map(
        (item: any) => item.totalLead
      );

      setChartOptions({
        options: {
          ...chartOptions.options,
          xaxis: {
            categories: categories,
          },
        },
        series: [
          {
            name: "Leads Data",
            data: seriesData,
          },
        ],
      });
    });
  };

  useEffect(() => {
    if (token) {
      handlewisereport(1, 10);
    }
  }, [token]);

  return (
    <>
      <Helmet>
        <title>Dashboard List</title>
        <meta name="keywords" content="dashboard,dash,home" />
      </Helmet>

      <div>
        <h1>Welcome</h1>

        {/* Card Section */}
        <div
          className="row"
          style={{
            width: "90%",
            maxWidth: "1600px",
            margin: "0 auto",
            padding: "8px 16px",
          }}
        >
          {people?.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-12 g-3" key={index}>
              <div
                className="card p-3"
                style={{ backgroundColor: "#002244", color: "white" }}
              >
                <div>
                  <strong>
                    <p style={{ fontSize: "18px" }}>{item.displayName}</p>
                  </strong>
                </div>
                <p style={{ fontSize: "14px" }}>{item.type}</p>
                <p style={{ fontSize: "14px" }}>
                  {item.leads.displayName} {": " + item.leads.value}
                </p>
                <p style={{ fontSize: "14px" }}>
                  {item.over_due.displayName} {": " + item.over_due.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <br />

        {/* Chart Section */}
        <div className="d-flex justify-content-center align-items-center">
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "16px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "100%",
              maxWidth: "700px",
            }}
          >
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
              type="bar"
              width="100%"
              height="350"
            />
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 500,
              }}
            >
              DealerWise Report
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
