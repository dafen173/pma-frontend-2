export interface TaskInputInterface {
    title: string;
    order: number;
    description: string;
    userId: number;
    users: (string | null)[]
}
