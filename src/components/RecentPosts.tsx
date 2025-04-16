import './RecentPosts.css';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

type Post = {
  id: string;
  description: string;
  location: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
};

const RecentPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      const fetchedPosts: Post[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Post, 'id'>),
      }));
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className='posts-text'>updated View</div>
      <div className='posts-container'>
        {posts.map((post) => (
          <div className='post-box' key={post.id}>
            <p>
              <strong>Descripiton </strong>
              {post.description}
            </p>
            <p>
              <strong>Location </strong> {post.location}{' '}
            </p>
            <p>
              <strong>Time </strong>{' '}
              {new Date(post.timestamp.seconds * 1000).toLocaleString()}{' '}
            </p>
          </div>
        ))}
      </div>
      <div></div>
    </>
  );
};

export default RecentPosts;
