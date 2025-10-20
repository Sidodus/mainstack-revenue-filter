import React from "react";
import Sidebar from "./Components/Layout/Sidebar";
import MainContent from "./Components/Layout/MainContent";
import Transactions from "./Components/Transactions";

const Page = () => {
  return (
    <div>
      <Sidebar />
      <MainContent />
      <Transactions />
    </div>
  );
};

export default Page;
