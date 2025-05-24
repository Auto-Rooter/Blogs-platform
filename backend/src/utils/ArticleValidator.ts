export const isValidArticle = (article: any): boolean => {
    const hasRequiredProperties =
        typeof article.title === "string" &&
        typeof article.body === "string"
    
    const isTitleNotEmpty = article.title.trim() !== "";
    
    const isBodyNotEmpty = article.body.trim() !== "";
    
    return (
        hasRequiredProperties &&
        isTitleNotEmpty &&
        isBodyNotEmpty
    );
}