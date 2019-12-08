export interface Pageable<T> {
    content: T[];
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export class PageableConstants {
    public static EMPTY_PAGEABLE = {
        content: [],
        first: false,
        last: false,
        number: 0,
        numberOfElements: 0,
        size: 0,
        totalElements: 0,
        totalPages: 0,
    };
}
