import { Tag } from '../tag/tag.model';

export class Content {
    // tslint:disable-next-line: variable-name
    _id: string;
    title: string;
    body: string;
    // tslint:disable-next-line: variable-name
    is_deleted: boolean;
    date: Date;
    tags: Tag [];
}
