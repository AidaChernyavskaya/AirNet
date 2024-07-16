import React, {FC, useRef, useState} from 'react';
import {getDateFormat, ITask, ITasksList} from "../ContentBlock/ContentBlock";
import {Dayjs} from "dayjs";
import Task from "../Task/Task";

interface TasksListProps {
    tasksForDate: ITask[];
    setTasksForDate: Function;
    tasksList: ITasksList[];
    setTasksList: Function;
    currentDate: Dayjs;
}

const TasksList: FC<TasksListProps> = ({tasksForDate, setTasksForDate, setTasksList, tasksList, currentDate}) => {
    const [idNumber, setIDNumber] = useState<number>(0);
    const dragItem = useRef<number>(0);
    const dragOverItem = useRef<number>(0);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, id: number, index: number): void => {
        setIDNumber(id);
        dragItem.current = index;
    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>, index: number): void => {
        event.preventDefault();
        dragOverItem.current = index;
    };

    const handleDragEnd = (event: React.DragEvent<HTMLDivElement>): void => {
        setIDNumber(0);
        const copyTasksForDate = [...tasksForDate];
        const dragItemContent = copyTasksForDate[dragItem.current];
        copyTasksForDate.splice(dragItem.current, 1);
        copyTasksForDate.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = 0;
        dragOverItem.current = 0;

        setTasksForDate([...copyTasksForDate]);
        const tasksListCopy = [...tasksList];
        tasksListCopy.map((el) => {
            if (el.date === getDateFormat(currentDate)) {
                el.tasks = [...copyTasksForDate];
            }
        });
        setTasksList([...tasksListCopy]);
    };

    return (
        <div>
            {tasksForDate.length === 0
                ? <p>No tasks for this date</p>
                : tasksForDate.map((task, index) => (
                    <Task
                        className={idNumber === task.id ? 'selected' : ''}
                        task={task} tasksList={tasksList} setTasksList={setTasksList}
                        currentDate={currentDate} setTasksForDate={setTasksForDate} key={index}
                        draggable={"true"}
                        onDragStart={(event):void => {handleDragStart(event, task.id, index);}}
                        onDragOver={(event): void => {handleDragEnter(event, index);}}
                        onDragEnd={handleDragEnd}
                    />
                ))}
        </div>
    );
};

export default TasksList;
