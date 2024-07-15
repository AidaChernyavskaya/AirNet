import React, {FC, useEffect, useState} from 'react';
import {Button, Checkbox, Col, Form, Input, Modal, Row} from "antd";
import {DeleteFilled, DragOutlined, EditFilled} from "@ant-design/icons";
import {getDateFormat, getTasksForDate, ITask, ITasksList, listData} from "../ContentBlock/ContentBlock";
import {setJSONToStorage} from "../../localStorage";
import {Dayjs} from "dayjs";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import InputTaskForm from "../InputTaskForm/InputTaskForm";

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
            <InputTaskForm
                tasksList={tasksList} setTasksList={setTasksList} currentDate={currentDate}
                tasksForDate={tasksForDate} setTasksForDate={setTasksForDate}
            />
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
