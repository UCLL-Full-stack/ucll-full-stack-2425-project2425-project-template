const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const getColumnById = async (columnId: string) => {
    const response = await fetch(`${API_URL}/api/columns/${columnId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

const updateColumn = async (columnId: string, column: any) => {
    const response = await fetch(`${API_URL}/api/columns/${columnId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(column),
    });
    return await response.json();
};

const deleteColumn = async (columnId: string) => {
    const response = await fetch(`${API_URL}/api/columns/${columnId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to delete column: ${response.statusText}`);
    }
    if (response.status !== 204) {
        await response.json();
    }};

const addTaskToColumn = async (columnId: string, task: any) => {
    const response = await fetch(`${API_URL}/api/columns/${columnId}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return await response.json();
}

const addColumn = async (column: any) => {
    const response = await fetch(`${API_URL}/api/columns`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(column),
    });
    return await response.json();
};

const ColumnService = {
    getColumnById,
    updateColumn,
    deleteColumn,
    addTaskToColumn,
    addColumn,
};

export default ColumnService;