import React from 'react';
import {Badge, Calendar} from "antd";
import {Content} from "antd/es/layout/layout";
import {Dayjs} from "dayjs";
import dayjs from 'dayjs';

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

const getListData = (value: Dayjs): ITasksList[] => {
    console.log(value, dayjs(value).format('DD-MM-YYYY'));
    const date = getDateFormat(value);
    return listData.filter(el => el.date === date);
}

const ContentBlock = () => {
    const dateCellRender = (value: Dayjs) => {
    const data = getListData(value);
    const tasks = data.length !== 0 ? data[0].tasks : [];
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
            <Calendar className="calendar" cellRender={cellRender}></Calendar>
        </Content>
    );
};

export default ContentBlock;