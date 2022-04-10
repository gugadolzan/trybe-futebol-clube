interface Indexable {
  id: number;
}

export interface SafeUser extends Indexable {
  username: string;
  role: string;
  email: string;
}
