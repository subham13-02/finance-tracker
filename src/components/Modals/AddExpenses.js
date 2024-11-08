import React from "react";
import {Modal, Form, Input, DatePicker, Select} from "antd";
import Button from "../Button/Button";

const  AddExpenses=(props)=>{
   const {isExpensesModalVisible,cancelExpensesModal,onFinish}=props;
   const [form] =Form.useForm();
   const { Option } = Select;

   return (
        <div className="modal">
            <Modal
                title="Add Expenses"
                open={isExpensesModalVisible}
                onCancel={cancelExpensesModal}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values)=>{
                        onFinish(values,"expense");
                        form.resetFields();
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                        {
                            required: true,
                            message: 'Please enter Name of the transition!',
                        },
                        ]}
                    >
                        <Input type="text" className="custom-input" placeholder="Name"/>
                    </Form.Item>

                    <Form.Item
                        name="amount"
                        label="Amount (in Rupees)"
                        rules={[
                        {
                            required: true,
                            message: 'Please enter Amount!',
                        },
                        ]}
                    >
                        <Input type="number" className="custom-input" placeholder="Amount"/>
                    </Form.Item>

                    <Form.Item 
                        name="date" 
                        label="Date" 
                        
                        rules= {[{ 
                            required: true, 
                            type: 'object', 
                            message: 'Please select time!' }
                        ]}
                    >
                        <DatePicker className="custom-input" />
                    </Form.Item>
                    <Form.Item
                        name="tag"
                        label="Tag"
                        rules={[
                        {
                            required: true,
                            message: 'Please select tag!',
                        },
                        ]}
                    >
                        <Select placeholder="Select your tag" >
                        <Option value="family">Family</Option>
                        <Option value="food">Food</Option>
                        <Option value="investment">Investment</Option>
                        <Option value="investment">Grocery</Option>
                        <Option value="investment">Travel</Option>
                        </Select>
                    </Form.Item>
                    <Button 
                        content={"Add Expense"} 
                        theme={true}
                    />
                </Form>
            </Modal>
        </div>
   )

}
export default AddExpenses;