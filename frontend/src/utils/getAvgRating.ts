export const avgRating = (ratingsList: number[]): number => {
    if (ratingsList.length === 0) return 0;
    const sum = ratingsList.reduce((total, r) => total + r, 0);
    const avg = sum / ratingsList.length;
    return Math.round(avg * 10) / 10;
};