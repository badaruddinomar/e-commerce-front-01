import "./dashboard.scss";
// Hooks--
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// Components--
import { backendUrl } from "../../helper";
import AdminSidebar from "./adminSidebar";
import MetaData from "./../MetaData";
// Chart Packages --
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  // Get all products list from the DATABASE--
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/v1/admin/products`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHandler();
  }, [dispatch]);

  // Get all orders list from the DB--
  useEffect(() => {
    const fetchHandler = async () => {
      const response = await fetch(`${backendUrl}/api/v1/admin/orders`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setOrders(data.orders);
    };
    fetchHandler();
  }, []);
  const totalAmountEarned = orders?.reduce((acc, order) => {
    return acc + order.totalPrice;
  }, 0);
  // Filter -  out of stock product --
  let outOfStock = 0;
  products?.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });
  const inStock = products.length - outOfStock;
  // Line chart data--
  const data = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        data: [0, totalAmountEarned],
        borderColor: "#FF7700",
        borderWidth: 2,
      },
    ],
  };
  // line chart options--
  const options = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
      },
      x: {
        type: "category",
      },
    },
  };
  // DoughnutData chart data--
  const doughnutData = {
    labels: ["Out OF Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["red", "#42F545"],
        hoverBackgroundColor: ["tomato", "#51F054"],
        data: [outOfStock, inStock],
      },
    ],
  };

  return (
    <>
      <MetaData title={"Admin Dashboard"} />
      <div className="dashboard-page">
        {/* Banner Div-- */}
        <div className="dashboard-banner">
          <h2>Admin Dashboard</h2>
        </div>
        {/* Sidebar Component-- */}
        <div className="dashboard-sidebar">
          <AdminSidebar />
        </div>
        {/* Container Div-- */}
        <div className="dashboard-container">
          <div className="line-chart">
            <Line data={data} options={options} className="chart" />
          </div>
          <div className="doughnut-chart">
            <Doughnut data={doughnutData} className="chart" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
