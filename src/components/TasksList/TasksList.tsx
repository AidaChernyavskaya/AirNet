import React, {FC} from 'react';
import {ITask, ITasksList} from "../ContentBlock/ContentBlock";
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

    return (
        <div>
            {tasksForDate.length === 0
                ? <p>No tasks for this date</p>
                : tasksForDate.map((task, index) => (
                    <Task
                        task={task} tasksList={tasksList} setTasksList={setTasksList}
                        currentDate={currentDate} setTasksForDate={setTasksForDate} key={index}
                    />
                ))}
        </div>
    );
};

export default TasksList;
