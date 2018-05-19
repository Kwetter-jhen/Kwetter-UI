import {Link} from './link';

export class KwetterUser {
  id: number;
  username: string;
  website: string;
  bio: string;
  email: string;
  userType: string;
  _links: Link[];
}
