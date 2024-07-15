import React, {FC, useEffect, useState} from 'react';
import {Button, Checkbox, Col, Form, Input, Modal, Row} from "antd";
import {DeleteFilled, DragOutlined, EditFilled} from "@ant-design/icons";
import {getDateFormat, getTasksForDate, ITask, ITasksList, listData} from "../ContentBlock/ContentBlock";
import {useForm} from "antd/es/form/Form";
import {setJSONToStorage} from "../../localStorage";
import dayjs, {Dayjs} from "dayjs";
import {CheckboxChangeEvent} from "antd/es/checkbox";

export interface ModalBoxProps {
    tasksList: ITasksList[];
    setTasksList: Function;
    currentDate: Dayjs;
    selectedDate: string;
    isModalOpen: boolean;
    setIsModalOpen: Function;
}

const ModalBox: FC<ModalBoxProps> = ({tasksList, setTasksList, currentDate, selectedDate, isModalOpen, setIsModalOpen}) => {
    const [tasksForDate, setTasksForDate] = useState<Array<ITask>>([]);
    const [form] = useForm();
    const [task, setTask] = useState('');

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
        const tasks = getTasksForDate(currentDate, tasksList);
        setTasksForDate([...tasks]);
    }, [currentDate]);

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleClick = () => {
        const newTask: ITask = {
            id: Date.now(),
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

    const toggleTask = (task: ITask) => {
        const tasksListCopy = [...tasksList];
        tasksListCopy.map((el) => {
            if (el.date === getDateFormat(currentDate)) {
                el.tasks.map(elem => {
                    if (elem.id === task.id) {
                        elem.type = elem.type === 'success' ? 'processing' : 'success';
                    }
                })
            }
        });
        setTasksList([...tasksListCopy]);
    }

    const deleteTask = (task: ITask) => {
        const tasksListCopy = [...tasksList];
        let index = 0;
        tasksListCopy.map((el) => {
            if (el.date === getDateFormat(currentDate)) {
                el.tasks.map((elem, i) => {
                    if (elem.id === task.id) {
                        index = i;
                    }
                });
                el.tasks.splice(index, 1);
                setTasksForDate([...el.tasks]);
            }
        });
        setTasksList([...tasksListCopy]);
    }

    const handleClickDelete = (task: ITask) => {
        deleteTask(task);
    }

    const onChangeCheckbox = (e: CheckboxChangeEvent, task: ITask) => {
        toggleTask(task);
    }

    return (
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
                    <Row className='row' align={'middle'} key={index}>
                        <Col flex={'20px'} className='col'>
                            <Checkbox
                                onChange={(e) => onChangeCheckbox(e, task)}
                                checked={task.type === 'success'}
                            ></Checkbox>
                        </Col>
                        <Col flex={"auto"} className='col'>
                            <Input
                                variant={'borderless'} value={task.content}
                                disabled={true} style={{color: 'black'}}
                            />
                        </Col>
                        <Col flex={'25px'} className='col'>
                            <Button icon={<EditFilled />} size={"small"}/>
                        </Col>
                        <Col flex={'25px'} className='col'>
                            <Button icon={<DeleteFilled />} size={"small"} onClick={() => handleClickDelete(task)}/>
                        </Col>
                        <Col flex={'25px'} className='col'>
                            <Button icon={<DragOutlined />} size={"small"}/>
                        </Col>
                    </Row>
                ))}
        </Modal>
    );
};

export default ModalBox;
