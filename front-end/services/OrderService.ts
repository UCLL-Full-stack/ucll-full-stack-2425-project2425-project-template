const createOrder = async (token: string) => {
    const response = await fetch('http://localhost:3000/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        const errorText = await response.text();
        try {
            const errorData = JSON.parse(errorText);
            throw new Error(errorData.errorMessage || 'Failed to create order');
        } catch {
            throw new Error(errorText || 'Failed to create order');
        }
    }
    return await response.json();
};

export default {
    createOrder,
};
