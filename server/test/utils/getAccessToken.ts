export const getAccessToken = (setCookies: string | string[]) => {
    const cookies = Array.isArray(setCookies) ? setCookies : [setCookies];

    const accessToken = cookies
        .map((cookie: string) => cookie.split(';')[0])
        .find((c) => c.startsWith('accessToken='))
        ?.split('=')[1];

    return accessToken ?? '';
};
