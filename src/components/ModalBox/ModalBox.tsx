import React, {FC, useEffect, useState} from 'react';
import {Modal} from "antd";
import {getTasksForDate, ITask, ITasksList} from "../ContentBlock/ContentBlock";
import {setJSONToStorage} from "../../localStorage";
import {Dayjs} from "dayjs";
import InputTaskForm from "../InputTaskForm/InputTaskForm";
import TasksList from "../TasksList/TasksList";

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
            setJSONToStorage('tasksList', JSON.stringify([]));
            setTasksList([]);
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

    return (
        <Modal title="Задачи на день" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p className="current_date">Выбранная дата: {selectedDate}</p>
            <InputTaskForm
                tasksList={tasksList} setTasksList={setTasksList} currentDate={currentDate}
                tasksForDate={tasksForDate} setTasksForDate={setTasksForDate}
            />
            <TasksList
                tasksForDate={tasksForDate} setTasksForDate={setTasksForDate}
                tasksList={tasksList} setTasksList={setTasksList} currentDate={currentDate}
            />
        </Modal>
    );
};

export default ModalBox;
