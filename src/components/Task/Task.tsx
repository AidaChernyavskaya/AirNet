import React, {ChangeEvent, DetailedHTMLProps, FC, HTMLAttributes, useEffect, useState} from 'react';
import {Button, Checkbox, Col, Input, Row} from "antd";
import {CheckOutlined, CloseOutlined, DeleteFilled, DragOutlined, EditFilled} from "@ant-design/icons";
import {getDateFormat, ITask, ITasksList} from "../ContentBlock/ContentBlock";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {Dayjs} from "dayjs";

interface TaskProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    task: ITask;
    tasksList: ITasksList[];
    setTasksList: Function;
    currentDate: Dayjs;
    setTasksForDate: Function;
}

const Task: FC<TaskProps> = ({task, tasksList, setTasksList, currentDate, setTasksForDate, ...props}) => {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [taskContent, setTaskContent] = useState(task.content);

    useEffect(() => {
        setTaskContent(task.content);
    }, [currentDate, isDisabled])

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

    const editTask = (task: ITask) => {
        setIsDisabled(!isDisabled);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskContent(e.target.value);
    }

    const handleClickDelete = (task: ITask) => {
        deleteTask(task);
    }

    const onChangeCheckbox = (e: CheckboxChangeEvent, task: ITask) => {
        toggleTask(task);
    }

    const handleClickEdit = (task: ITask) => {
        editTask(task);
    }

    const handleChangeTask = (task: ITask) => {
        const tasksListCopy = [...tasksList];
        tasksListCopy.map((el) => {
            if (el.date === getDateFormat(currentDate)) {
                el.tasks.map(elem => {
                    if (elem.id === task.id) {
                        elem.content = taskContent;
                    }
                })
            }
        });
        setTasksList([...tasksListCopy]);
        setIsDisabled(true);
    }

    const handleCancelChanges = (task: ITask) => {
        setTaskContent(task.content);
        setIsDisabled(true);
    }

    return (
        <Row className='row' align={'middle'} {...props}>
            <Col flex={'20px'} className='col'>
                <Checkbox
                    onChange={(e) => onChangeCheckbox(e, task)}
                    checked={task.type === 'success'}
                ></Checkbox>
            </Col>
            <Col flex={"auto"} className='col'>
                <Input
                    variant={'borderless'} value={isDisabled ? task.content : taskContent}
                    disabled={isDisabled} style={{color: isDisabled ? 'black' : 'red'}}
                    onChange={(e) => handleChange(e)} onPressEnter={() => handleChangeTask(task)}
                />
            </Col>
            <Col flex={'25px'} className='col'>
                {isDisabled
                    ? <Button icon={<EditFilled />} size={"small"} onClick={() => handleClickEdit(task)}/>
                    : <Button icon={<CheckOutlined />} size={"small"} onClick={() => handleChangeTask(task)}/>
                }
            </Col>
            <Col flex={'25px'} className='col'>
                {isDisabled
                    ? <Button icon={<DeleteFilled />} size={"small"} onClick={() => handleClickDelete(task)}/>
                    : <Button icon={<CloseOutlined />} size={"small"} onClick={() => handleCancelChanges(task)}/>
                }
            </Col>
            <Col flex={'25px'} className='col'>
                <Button icon={<DragOutlined />} size={"small"}/>
            </Col>
        </Row>
    );
};

export default Task;
