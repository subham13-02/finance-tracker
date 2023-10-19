import React from "react";
import {Modal, Form, Input, DatePicker, Select} from "antd";
import Button from "../../Button/Button";

const  AddExpenses=(props)=>{
   const {isExpansesModalVisible,cancleExpensesModal,onFinish}=props;
   const [form] =Form.useForm();
   const { Option } = Select;

   return (
        <div className="modal">
            <Modal
                title="Add Expanses"
                open={isExpansesModalVisible}
                onCancel={cancleExpensesModal}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values)=>{
                        onFinish(values,"expence");
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
                        <Input type="text" className="custon-input" placeholder="Name"/>
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
                        <Input type="number" className="custon-input" placeholder="Amount"/>
                    </Form.Item>

                    <Form.Item 
                        name="date-picker" 
                        label="DatePicker" 
                        
                        rules= {[{ 
                            required: true, 
                            type: 'object', 
                            message: 'Please select time!' }
                        ]}
                    >
                        <DatePicker className="custon-input" />
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
                        </Select>
                    </Form.Item>
                    <Button 
                        content={"Add Income"} 
                        theme={true}
                    />
                </Form>
            </Modal>
        </div>
   )

}
export default AddExpenses;