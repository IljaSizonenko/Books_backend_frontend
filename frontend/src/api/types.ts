export interface Book { 
    id: number; 
    title: string; 
    isbn: string;
    publishedYear: number; 
    pageCount: number;
    language: string;
    description: string;
    coverImage?: string;
    authorId: number;
    publisherId: number;
    genreIds: number[];
    createdAt: string;
    updatedAt: string;
}
export interface Review {
    id: number;
    bookId: number;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}