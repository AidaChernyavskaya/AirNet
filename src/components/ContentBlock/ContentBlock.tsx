import React, {useState} from 'react';
import {Badge, Calendar,} from "antd";
import {Content} from "antd/es/layout/layout";
import {Dayjs} from "dayjs";
import dayjs from 'dayjs';
import {getJSONFromStorage} from "../../localStorage";
import ModalBox from "../ModalBox/ModalBox";

export interface ITask {
    id: number;
    type: "success" | "processing" | undefined;
    content: string;
}

export interface ITasksList {
    date: string,
    tasks: ITask[]
}

export const listData: ITasksList[] = [
    {
        date: '08-01-2024',
        tasks: [
            {
                id: 1,
                type: 'success',
                content: 'This is warning event.',
            },
            {
                id: 2,
                type: 'processing',
                content: 'This is warning event.',
            }
        ]
    },
    {
        date: '01-07-2024',
        tasks: [
            {
                id: 3,
                type: 'success',
                content: 'This is warning event.',
            }
        ]

    },
];

export const getDateFormat = (value: Dayjs): string => {
    return dayjs(value).format('DD-MM-YYYY');
}

export const getTasksList = (value: Dayjs, tasksList: ITasksList[]): ITasksList[] => {
    const date = getDateFormat(value);
    return tasksList.filter(el => el.date === date);
}

export const getTasksForDate = (value: Dayjs, tasksList: ITasksList[]): ITask[] => {
    const data = getTasksList(value, tasksList);
    return data.length !== 0 ? data[0].tasks : [];
}

const ContentBlock = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dayjs().format('DD-MM-YYYY'));
    const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
    const [tasksList, setTasksList] = useState<Array<ITasksList>>(getJSONFromStorage('tasksList'));

    const showModal = (date: Dayjs) => {
        setSelectedDate(dayjs(date).format('DD-MM-YYYY'));
        setCurrentDate(date);
        setIsModalOpen(date.month() === currentDate.month());
    };

    const dateCellRender = (value: Dayjs) => {
    const tasks = getTasksForDate(value, tasksList);
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
            <ModalBox
                tasksList={tasksList} setTasksList={setTasksList} currentDate={currentDate}
                selectedDate={selectedDate} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
            />
        </Content>
    );
};

export default ContentBlock;