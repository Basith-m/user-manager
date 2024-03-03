import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from './redux/userSlice/userSlice';

const useFetch = (url) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                const users = response.data.data;
                users.forEach((user) => {
                    dispatch(addUser({
                        id: user.id,
                        firstname: user.first_name,
                        lastname: user.last_name,
                        image: user.avatar,
                        email: user.email
                    }));
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [url, dispatch]);

};

export default useFetch;