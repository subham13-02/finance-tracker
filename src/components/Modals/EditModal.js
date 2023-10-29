import React from "react";
import {Modal,Form,Input,DatePicker,Select} from "antd";
import Button from "../Button/Button";

const AddIncome=(props)=>{
   const {cancelEditModal, isEditModalVisible, onEdit, toBeUpdated}=props;
   const [form] =Form.useForm();
   const { Option } = Select;
   return (
        <div className="modal">
            <Modal
                title="Edit Transaction"
                open={isEditModalVisible}
                onCancel={cancelEditModal}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        name:toBeUpdated.name,
                        amount:toBeUpdated.amount,
                        tag:toBeUpdated.tag
                    }}
                    onFinish={(values)=>{
                        onEdit(values,toBeUpdated.type);
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
                        <DatePicker className="custom-input"/>
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
                        <Select placeholder="Select your tag">
                        <Option value="salary">Salary</Option>
                        <Option value="freelencing">Freelencing</Option>
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
export default AddIncome