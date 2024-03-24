import { useMutation } from '@tanstack/react-query';
import { apiV1Instance } from '../../api';

export const useSignInUser = () => {
    
    const mutation = useMutation({
    mutationFn: async function({ email, password}){
        const data = await apiV1Instance.post('/auth/signin/', {
            email,
            password
    });
    
    return data;
    }
    });
    return mutation;
}