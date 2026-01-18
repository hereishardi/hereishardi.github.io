export const getImagePath = (path: string) => {
    const basePath = process.env.NODE_ENV === 'production' ? '/hardichittaliya.com' : '';
    return `${basePath}${path}`;
};