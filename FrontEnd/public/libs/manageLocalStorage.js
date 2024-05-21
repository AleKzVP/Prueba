//COOKIES

export default function manageLocalStorage(action, key, value) {
    // Verifica que action y key no sean undefined o null
    if (!action || !key) {
        console.error('Action and key are required.');
        return;
    }

    // Verifica que action sea uno de los valores esperados
    const validActions = ['insert', 'delete', 'edit', 'get'];
    if (!validActions.includes(action)) {
        console.error('Invalid action. Use "insert", "delete", "edit", or "get".');
        return;
    }

    switch (action) {
        case 'insert':
            // Verifica que value no sea undefined o null
            if (value === undefined || value === null) {
                console.error('Value is required for insert action.');
                return;
            }
            // Inserta un nuevo elemento en localStorage
            localStorage.setItem(key, JSON.stringify(value));
            console.log(`Inserted: ${key} - ${JSON.stringify(value)}`);
            break;
            
        case 'delete':
            // Elimina un elemento de localStorage
            if (localStorage.getItem(key) !== null) {
                localStorage.removeItem(key);
                console.log(`Deleted: ${key}`);
            } else {
                return null;
            }
            break;

        case 'edit':
            // Verifica que value no sea undefined o null
            if (value === undefined || value === null) {
                console.error('Value is required for edit action.');
                return;
            }
            // Edita un elemento existente en localStorage
            if (localStorage.getItem(key) !== null) {
                localStorage.setItem(key, JSON.stringify(value));
                console.log(`Edited: ${key} - ${JSON.stringify(value)}`);
            } else {
                return null;
            }
            break;

        case 'get':
            // Obtiene el valor del elemento de localStorage
            const storedValue = localStorage.getItem(key);
            if (storedValue !== null) {
                const parsedValue = JSON.parse(storedValue);
                console.log(`Value of ${key}:`, parsedValue);
                return parsedValue;
            } else {
                return null;
            }
            break;

        default:
            console.error('Unknown action.');
            break;
    }
}
