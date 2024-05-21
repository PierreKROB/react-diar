import { useState } from 'react';
import Cookies from 'js-cookie';

const usePutRequest = (url, token) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const fetchData = async (data) => {
        try {
            const token = Cookies.get('token');
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL_BACKEND}${url}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSuccess(true);
                setError(null);
            } else {
                const errorMessage = await response.text();
                setError(`Erreur ${response.status}: ${errorMessage}`);
                setSuccess(false);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError("Une erreur s'est produite lors de la requête. Veuillez réessayer plus tard.");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, success, fetchData };
};

export default usePutRequest;
