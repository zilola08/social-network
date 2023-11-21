import { useContext } from 'react';
import { host } from '../http/index';
import { Context } from '../main';

const useRefreshToken = () => {

    const { user } = useContext(Context);

    const refresh = async () => {
        //to generate new access token when it expires, after verifying our refresh token
        const response = await host.get('/api/refreshToken', {
            withCredentials: true
        });
        user.setAccessToken(response.data.accessToken);
        return response.data.accessToken;
    }

    return refresh;
};

export default useRefreshToken;