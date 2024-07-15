import React, {FC} from 'react';
import {Button, Checkbox, Col, Input, Row} from "antd";
import {DeleteFilled, DragOutlined, EditFilled} from "@ant-design/icons";
import {getDateFormat, ITask, ITasksList} from "../ContentBlock/ContentBlock";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {Dayjs} from "dayjs";

interface TaskProps {
    task: ITask;
    tasksList: ITasksList[];
    setTasksList: Function;
    currentDate: Dayjs;
    setTasksForDate: Function;
}

const Task: FC<TaskProps> = ({task, tasksList, setTasksList, currentDate, setTasksForDate}) => {

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
        <Row className='row' align={'middle'}>
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
    );
};

export default Task;
