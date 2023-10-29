import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Radio, Select, Table } from "antd";
import "./TransactionTable.css"
import {parse,unparse} from "papaparse";
import {FaSearch,FaEdit} from "react-icons/fa"
import {MdOutlineDeleteForever} from "react-icons/md"

const TransactionTable=(props)=>{
    const { transactions, addTransaction, fetchTransactions ,deleteTransaction, showEditModal}=props;
    const { Option } = Select;
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Tag",
        dataIndex: "tag",
        key: "tag",
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title:"Action",
        render:(record)=>(
          <>
            <Button type="link" className="action-table-btn" onClick={()=>{showEditModal(record)}} ><FaEdit color="var(--grey)"/></Button>
            <Button type="link" className="action-table-btn" onClick={()=>{deleteTransaction(record.id)}}><MdOutlineDeleteForever color="var(--theme)"/></Button>
          </>
        )
      }
    ];
  
    let filteredTransactions = transactions.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        item.type.includes(typeFilter)
    );
  
    let sortedTransactions = filteredTransactions.sort((a, b) => {
      if (sortKey === "date") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortKey === "amount") {
        return a.amount - b.amount;
      } else {
        return 0;
      }
    });

    const exportCSV=()=>{
      var csv=unparse({
          fields:["name","type","tag","date","amount"],
          data:transactions,
      });
      var blob = new Blob([csv], {type: 'text/csv ;chartset=utf-8'});
      var csvURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = csvURL;
      link.setAttribute('download', 'transactions.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    function importFromCsv(event) {
      event.preventDefault();
      try{
        parse(event.target.files[0],{
          header: true,
          complete: async function (results) {
            //Now results.data is an array of objects representing  CSV rows
            for (const transaction of results.data) {
              //Writen each transaction to Firebase ,  canuse the addTransaction function here 
              const newTransaction ={
                ...transaction,
                amount: parseFloat(transaction.amount),
              };
              await addTransaction(newTransaction, true);
            }         
          },
        });
        toast.success("All were Transactions Added!");
        fetchTransactions();
        event.target.files = null;
      } catch(e) {
          toast.error(e.message)
      }
    }
  
    return (
        <div className="TransationTable">
            <div className="my-table">
                <div className="searchName">
                    <div className="searchBar">
                      <FaSearch/>
                      <input
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search by name"
                          className="search-input"
                      />
                    </div>
                    <Select
                      className="select-input"
                      onChange={(value) => setTypeFilter(value)}
                      value={typeFilter}
                      placeholder="Filter"
                      allowClear
                    >
                    <Option value="">All</Option>
                    <Option value="income">Income</Option>
                    <Option value="expense">Expense</Option>
                    </Select>
                </div>
                <div className="tableFilters">
                    <h2>My Transactions</h2>
                    <>
                    <Radio.Group
                    className="input-radio"
                    onChange={(e) => setSortKey(e.target.value)}
                    value={sortKey}
                    >
                    <Radio.Button value="">No Sort</Radio.Button>
                    <Radio.Button value="date">Sort by Date</Radio.Button>
                    <Radio.Button value="amount">Sort by Amount</Radio.Button>
                    </Radio.Group>
                    </>
                    <div className="csv-btns">
                      <button className="btn-csv" onClick={exportCSV}>
                          Export to CSV
                      </button>
                      <label htmlFor="file-csv" className="btn-csv">
                          Import from CSV
                      </label>
                      <input 
                        id="file-csv" 
                        type="file" 
                        accept=".csv" 
                        required onChange={importFromCsv} 
                        style={{display:"none"}} />
                    </div>
                </div>
                <div className="Table">
                  <Table dataSource={sortedTransactions} columns={columns} />
                </div>
            </div>
        </div>
  );
}

export default TransactionTable;