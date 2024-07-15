import React, {FC, useState} from 'react';
import {Button, Form, Input} from "antd";
import {useForm} from "antd/es/form/Form";
import {getDateFormat, ITask, ITasksList} from "../ContentBlock/ContentBlock";
import dayjs, {Dayjs} from "dayjs";

export interface InputTaskFormProps {
    tasksList: ITasksList[];
    setTasksList: Function;
    currentDate: Dayjs;
    tasksForDate: ITask[];
    setTasksForDate: Function;
}

const InputTaskForm: FC<InputTaskFormProps> = ({tasksList, setTasksList, currentDate, tasksForDate, setTasksForDate}) => {
    const [form] = useForm();
    const [task, setTask] = useState('');

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

    return (
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
    );
};

export default InputTaskForm;
