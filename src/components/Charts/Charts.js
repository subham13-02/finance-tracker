import React,{useState} from "react";
import { Line, Pie } from "@ant-design/plots";
import "./Charts.css";
import { Select} from "antd";

const Charts=({ sortedTransactions })=> {
  const { Option } = Select;
  const [pieType,setPieType]=useState("expense");

  let finalAmount=0;
  const data = sortedTransactions.map((item) => {
    if(item.type==="income"){
        finalAmount+=item.amount;
    }else if(item.type==="expense"){
      finalAmount-=item.amount;
    }
    return { date: item.date, amount: finalAmount };
  });

  const pieData = sortedTransactions.filter((transaction) => {
    
    if (transaction.type === pieType) {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });

  let finalSpendings = pieData.reduce((acc, obj) => {
    let key = obj.tag;
    if(!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount }; // create a new object with the same properties
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});

  const config = {
    data: data,
    width: 400,
    autoFit: true,
    xField: "date",
    yField: "amount",
    point:{
      size:5,
      shape:"diamond"
    },
    label:{
      style:{
        fill:"grey",
      },
    },// or seriesField in some cases
    color:'rgb(207, 56, 245)',
  };
  const spendingConfig = {
    data: Object.values(finalSpendings),
    width: 400,
    angleField: "amount",
    colorField: "tag", 
  };

  let chart;
  let pieChart;
  return (
    <div className="chartBlock">
      <div className="lineChart">
        <h2 style={{ marginBottom: "2rem" }}>Your Analytics</h2>
        <Line
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
      </div>
      <div className="pieChart">
        <div className="pie-filter">
          <h2>Your Spendings & Earnings</h2>
          <Select
              className="select-input"
              onChange={(value) => setPieType(value)}
              value={pieType}
              placeholder="Filter Type"
              allowClear
              >
              <Option value="income">Income</Option>
              <Option value="expense">Expense</Option>
          </Select>
        </div>
        
        <Pie
          {...spendingConfig}
          onReady={(chartInstance) => (pieChart = chartInstance)}
        />
      </div>
    </div>
  );
}
export default Charts;