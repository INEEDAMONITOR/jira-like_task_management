import React from 'react';
import { Kanban } from 'types/kanban';
import { useTasks } from 'utils/tasks';
import { useKanbansQueryKey, useTaskModal, useTaskSearchParam } from './util';
import { useTaskTypes } from 'utils/task-types';
import taskIcon from 'asset/task.svg';
import bugIcon from 'asset/bug.svg';
import styled from '@emotion/styled';
import { Button, Card, Dropdown, MenuProps, Modal } from 'antd';
import { CreateTask } from './create-task';
import { Task } from 'types/task';
import { MarkedKeyWordText } from 'components/mark';
import { useDeleteKanban } from 'utils/kanban';
import { ButtonNoPadding, Row } from 'components/lib';
const TaskTypeIcon = ({ id }: { id: number }) => {
	const { data: taskTypes } = useTaskTypes();
	const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
	if (!name) {
		return null;
	}
	return (
		<img
			src={name === 'task' ? taskIcon : bugIcon}
			alt={name === 'task' ? 'task' : 'bug'}
		/>
	);
};
const TaskCard = ({
	task,
	searchName,
}: {
	task: Task;
	searchName?: string;
}) => {
	const { startEdit } = useTaskModal();
	return (
		<Card
			style={{ marginBottom: '0.5rem' }}
			key={task.id}
			onClick={() => {
				startEdit(task.id);
			}}
		>
			<div>
				<MarkedKeyWordText str={task?.name} keyWord={searchName} />
			</div>
			<TaskTypeIcon id={task.typeId} />
		</Card>
	);
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
	const { data: allTasks } = useTasks(useTaskSearchParam());
	const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
	const { name } = useTaskSearchParam();
	return (
		<Container>
			<Row between={true}>
				<h3>{kanban.name}</h3>
				<More kanban={kanban} />
			</Row>
			<TaskContainer>
				{tasks?.map((task) => (
					<TaskCard task={task} searchName={name} />
				))}
				<CreateTask kanbanId={kanban.id} />
			</TaskContainer>
		</Container>
	);
};

export const More = ({ kanban }: { kanban: Kanban }) => {
	const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbansQueryKey());
	const startEdit = () => {
		Modal.confirm({
			okText: 'Delete',
			cancelText: 'Cancel',
			title: 'Are you sure to delete this Kanban?',
			onOk() {
				deleteKanban({ id: kanban.id });
			},
		});
	};
	const dropDownItems: MenuProps['items'] = [
		{
			key: 'delete',
			label: (
				<>
					<ButtonNoPadding type="link" onClick={startEdit}>
						Delete
					</ButtonNoPadding>
				</>
			),
		},
	];
	return (
		<Dropdown menu={{ items: dropDownItems }}>
			<Button type="link">...</Button>
		</Dropdown>
	);
};

export const Container = styled.div`
	min-width: 27rem;
	border-radius: 6px;
	background-color: rgb(244, 245, 247);
	display: flex;
	flex-direction: column;
	padding: 0.7rem 0.7rem 1rem;
	margin-right: 1.5rem;
`;

const TaskContainer = styled.div`
	overflow: scroll;
	flex: 1;
	::-webkit-scrollbar {
		display: none;
	}
`;
