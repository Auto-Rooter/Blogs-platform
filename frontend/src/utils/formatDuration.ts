export const formateDuration = (seconds: number): string => {
    if(seconds <= 0) return "0s";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    let parts: string[] = [];

    if(hours > 0) parts.push(`${hours} h`);
    if(minutes > 0) parts.push(`${minutes} m`);

    if(hours === 0 && minutes === 0) parts.push(`${secs} s`);

    return parts.join(" ");
}