import { useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

// ✅ TypeScript type to define the structure of a Post
type Post = {
  id: string;
  description: string;
  location: string;
  timestamp: Timestamp; // or `any` if you're unsure for now
};

function RecentPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempPosts: Post[] = [];
      querySnapshot.forEach((doc) => {
        tempPosts.push({ id: doc.id, ...doc.data() } as Post);
      });
      setPosts(tempPosts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section style={{ marginTop: '40px' }}>
      <div id='main-text'>Recent Spots</div>
      {posts.map((post) => (
        <div key={post.id} className='post-card'>
          <p>
            <strong>Location:</strong> {post.location}
          </p>
          <p>{post.description}</p>
        </div>
      ))}
    </section>
  );
}

export default RecentPosts;
