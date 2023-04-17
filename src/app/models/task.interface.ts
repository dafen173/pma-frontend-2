export interface TaskInterface {
    title: string;

    boardId: string;
    columnId: string;
    _id: string;

    order: number;
    description: string;
    userId: number;
    users: string[];
}
