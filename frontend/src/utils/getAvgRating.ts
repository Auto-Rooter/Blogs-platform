export const avgRating = (ratingsList: Array<number>) =>{
    return ratingsList.length > 0 ? ratingsList.reduce((sum, r) => sum + r, 0) / ratingsList.length : 0;
}