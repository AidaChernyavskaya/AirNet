import React, {useState} from 'react';
import {Badge, Button, Calendar, Form, Input, Modal} from "antd";
import {Content} from "antd/es/layout/layout";
import {Dayjs} from "dayjs";
import dayjs from 'dayjs';
import {useForm} from "antd/es/form/Form";

export interface ITask {
    type: "warning" | "success" | "processing" | "error" | "default" | undefined;
    content: string;
}

export interface ITasksList {
    date: string,
    tasks: ITask[]
}

const listData: ITasksList[] = [
    {
        date: '08-01-2024',
        tasks: [
            {
                type: 'success',
                content: 'This is warning event.',
            },
            {
                type: 'processing',
                content: 'This is warning event.',
            }
        ]
    },
    {
        date: '01-07-2024',
        tasks: [
            {
                type: 'warning',
                content: 'This is warning event.',
            }
        ]

    },
];

const getDateFormat = (value: Dayjs): string => {
    return dayjs(value).format('DD-MM-YYYY');
}

const getListData = (value: Dayjs): ITasksList[] => {
    const date = getDateFormat(value);
    return listData.filter(el => el.date === date);
}

const ContentBlock = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dayjs().format('DD-MM-YYYY'));
    const [form] = useForm();
    const [task, setTask] = useState('');
    const showModal = (date: Dayjs) => {
        setSelectedDate(dayjs(date).format('DD-MM-YYYY'));
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleClick = () => {
        setTask('');
        form.resetFields();
    }

    const dateCellRender = (value: Dayjs) => {
    const data = getListData(value);
    const tasks = data.length !== 0 ? data[0].tasks : [];
        return (
            <ul className="events">
                {tasks.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    }

    const cellRender = (current: Dayjs, info: any) => {
        if (info.type === 'date') return dateCellRender(current);
    }

    return (
        <Content className="content">
            <Calendar className="calendar" cellRender={cellRender} onSelect={showModal}></Calendar>

            <Modal title="Day tasks" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Current date: {selectedDate}</p>
                <Form
                    layout={"inline"} className="form" autoComplete={'off'}
                    onFinish={handleClick} form={form}
                >
                    <Form.Item
                        className="input" name={'task'}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your task!',
                            },
                        ]}
                    >
                        <Input placeholder="input task" value={task} onChange={(event) => setTask(event.target.value)}/>
                    </Form.Item>
                    <Form.Item className="button_submit">
                        <Button type="primary" htmlType={"submit"}>Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Content>
    );
};

export default ContentBlock;