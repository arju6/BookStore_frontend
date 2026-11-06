import React from "react";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUsers, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faUserAlt } from "@fortawesome/free-regular-svg-icons/faUserAlt";
import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";
import { faEmpire } from "@fortawesome/free-brands-svg-icons";
import { ResponsiveContainer } from "recharts";
import { generateMockData, RechartsDevtools } from "@recharts/devtools";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Pie, PieChart } from "recharts";
import AdminHeader from "../components/AdminHeader";


const data = generateMockData(6, 823);
// #region Sample data
const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
];

function Dashboard() {
  return (
    <>
      <AdminHeader />
      <div className="md:grid md:grid-cols-[minmax(14rem,1fr)_3fr]">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="min-w-0 md:col-span-1">
          <div className="md:grid grid-cols-3 mx-5 my-5 gap-10 mt-5">
            <div className="bg-blue-900 p-5 rounded flex">
              <FontAwesomeIcon icon={faBook} className="text-5xl text-white" />
              <div className="text-white text-center ml-5">
                <h1>Total Number of books</h1>
                <h1>100+</h1>
              </div>
            </div>
            <div className="bg-green-900 p-5 rounded flex">
              <FontAwesomeIcon icon={faUsers} className="text-5xl text-white" />
              <div className="text-white text-center ml-5">
                <h1>Total Number of Users</h1>
                <h1>100+</h1>
              </div>
            </div>
            <div className="bg-yellow-500 p-5 rounded flex">
              <FontAwesomeIcon
                icon={faUserTie}
                className="text-5xl text-white"
              />
              <div className="text-white text-center ml-5">
                <h1>Total Number of Employee</h1>
                <h1>100+</h1>
              </div>
            </div>
          </div>

          {/*grid chart*/}
          <div className="md:grid grid-cols-2 p-5 mt-10">
            <div className="font-bold">
              {/* Book Purchase Ratio */}
              <ResponsiveContainer width={"100%"} height={"300"}>
                <BarChart
                  responsive
                  data={data}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid />
                  <XAxis dataKey="label" />
                  <YAxis width="auto" />
                  <Tooltip />
                  <Legend />
                  <Bar fill="#241bdc" dataKey="x" radius={[10, 10, 0, 0]} />
                  <Bar fill="#023b18" dataKey="y" radius={[10, 10, 0, 0]} />
                  <RechartsDevtools />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="font-bold">
              {/* Growth Ratio(Yearly) */}
              <ResponsiveContainer>
                <PieChart responsive>
                  <Pie
                    data={data01}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius="50%"
                    fill="#0b0493"
                    stroke="white"
                  />
                  <Pie
                    data={data02}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    fill="#025020"
                    stroke="white"
                    label
                  />
                  <RechartsDevtools />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
