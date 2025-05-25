export const getFilenameWithTimestamp = () => {
    // pad to two digits
    const pad2 = (n: number) => n.toString().padStart(2, '0');

    const now = new Date();
    const timestamp = [
        now.getFullYear(),
        pad2(now.getMonth() + 1),
        pad2(now.getDate()),
        pad2(now.getHours()),
        pad2(now.getMinutes()),
        pad2(now.getSeconds())
    ].join('_');

    return `articles_${timestamp}.json`;
}