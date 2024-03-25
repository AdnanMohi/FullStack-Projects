import { useQuery } from "@tanstack/react-query";
import { apiV1Instance } from "../../api";

export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const {data} = await apiV1Instance.get('/auth/profile');
           console.log(data);
            const profile = data.profile;
              return profile;
        }
    });

 return {
     ...query,
     user: query.data}
}