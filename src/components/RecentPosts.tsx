import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
type Post = {
  id: string;
  description: string;
  location: string;
  timestamp: Timestamp;
};
function RecentPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const postsRef = collection(db, 'posts');
      const q = query(postsRef, orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      const postsData = snapchot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(postsData);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <h2>Recent Sightings</h2>
      {posts.length === 0 ? (
        <p>No posts yet...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: '1rem' }}>
              <strong>Description:</strong> {post.description} <br />
              <strong>Location:</strong> {post.location} <br />
              <small>
                {new Date(post.timestamp.seconds * 1000).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentPosts;
