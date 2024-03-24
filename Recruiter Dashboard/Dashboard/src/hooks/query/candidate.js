import { useQuery } from '@tanstack/react-query';
import { apiV1Instance } from '../../api';

export const useCandidate = () => {
  const query = useQuery({
    queryKey: ['candidates'],
    queryFn: async () => {
      try {
        const response = await apiV1Instance.get('/auth/candidateData');
        if (response.status >= 200 && response.status < 300) {
          return response.data; // Return response data if the request is successful
        } else {
          throw new Error('Failed to fetch candidate data');
        }
      } catch (error) {
        throw new Error('Failed to fetch candidate data: ' + error.message);
      }
    }
  });

  return query;
};
