import React, {useEffect, useState} from 'react';
import {Badge, Button, Calendar, Checkbox, Col, Flex, Form, Input, Modal, Row} from "antd";
import {Content} from "antd/es/layout/layout";
import {Dayjs} from "dayjs";
import dayjs from 'dayjs';
import {useForm} from "antd/es/form/Form";
import {getJSONFromStorage, setJSONToStorage} from "../../localStorage";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {DeleteFilled, DragOutlined, EditFilled} from "@ant-design/icons";

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

const ContentBlock = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dayjs().format('DD-MM-YYYY'));
    const [tasksForDate, setTasksForDate] = useState<Array<ITask>>([]);
    const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
    const [form] = useForm();
    const [task, setTask] = useState('');
    const [tasksList, setTasksList] = useState<Array<ITasksList>>(getJSONFromStorage('tasksList'));

    useEffect(() => {
        if (tasksList.length === 0) {
            setJSONToStorage('tasksList', JSON.stringify(listData));
            setTasksList(listData);
        }
    },[])

    useEffect(() => {
        setJSONToStorage('tasksList', JSON.stringify(tasksList));
    },[tasksList])

    useEffect(() => {
        const tasks = getTasksForDate(currentDate);
        setTasksForDate([...tasks]);
    }, [currentDate]);

    const showModal = (date: Dayjs) => {
        setSelectedDate(dayjs(date).format('DD-MM-YYYY'));
        setCurrentDate(date);
        setIsModalOpen(date.month() === currentDate.month());
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleClick = () => {
        const newTask: ITask = {
            type: 'processing',
            content: task,
        };
        if (tasksForDate.length === 0) {
            const newDate: ITasksList = {
                date: dayjs(currentDate).format('DD-MM-YYYY'),
                tasks: [newTask]
            };
            setTasksList([...tasksList, newDate]);
        } else {
            const tasksListCopy = [...tasksList];
            tasksListCopy.map((el) => {
                if (el.date === getDateFormat(currentDate)) {
                    el.tasks = [...el.tasks, newTask];
                }
            });
            setTasksList([...tasksListCopy]);
        }
        setTasksForDate([...tasksForDate, newTask]);
        setTask('');
        form.resetFields();
    }

    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    }

    const getTasksList = (value: Dayjs): ITasksList[] => {
        const date = getDateFormat(value);
        return tasksList.filter(el => el.date === date);
    }

    const getTasksForDate = (value: Dayjs): ITask[] => {
        const data = getTasksList(value);
        return data.length !== 0 ? data[0].tasks : [];
    }

    const dateCellRender = (value: Dayjs) => {
    const tasks = getTasksForDate(value);
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
                <p className="current_date">Current date: {selectedDate}</p>
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
                {tasksForDate.length === 0
                    ? <p>No tasks for this date</p>
                    : tasksForDate.map((task, index) => (
                        <Row className='row' align={'middle'}>
                            <Col flex={'20px'} className='col'>
                                <Checkbox onChange={onChangeCheckbox}></Checkbox>
                            </Col>
                            <Col flex={"auto"} className='col'>
                                <p key={index}>{task.content}</p>
                            </Col>
                            <Col flex={'25px'} className='col'>
                                <Button icon={<EditFilled />} size={"small"}/>
                            </Col>
                            <Col flex={'25px'} className='col'>
                                <Button icon={<DeleteFilled />} size={"small"}/>
                            </Col>
                            <Col flex={'25px'} className='col'>
                                <Button icon={<DragOutlined />} size={"small"}/>
                            </Col>
                        </Row>
                ))}
            </Modal>
        </Content>
    );
};

export default ContentBlock;