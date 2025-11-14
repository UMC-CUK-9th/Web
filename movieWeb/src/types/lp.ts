export interface Like {
  id: number;
  userId: number;
  lpId: number;
}

export interface LpItem {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  updatedAt?: string;
  authorId?: number;
  published?: boolean;
  tags?: Array<string | { id: number; name: string }>;
  likes?: Like[];
}
