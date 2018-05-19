import { KwetterUser } from './kwetterUser';
import {Link} from './link';

export class Tweet {
    id: number;
    text: string;
    creationDate: string;
    reported: boolean;
    kwetterUser: KwetterUser;
    _links: Link[];
}
