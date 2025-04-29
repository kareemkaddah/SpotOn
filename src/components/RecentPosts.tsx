import './RecentPosts.css';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

type Post = {
  id: string;
  activity: string;
  gender: string;
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
      <div className='posts-container'>
        {posts.map((post) => (
          <div className='post-box' key={post.id}>
            <div className='location-text'>
              <p> {post.location}</p>{' '}
            </div>

            <div className='time-box'>
              <p>
                {new Date(post.timestamp.seconds * 1000)
                  .toLocaleString('en-GB', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })
                  .replace(',', '')}
              </p>
            </div>
            <div className='gender'>
              <p>{post.gender}</p>
            </div>
            <div className='gender'>
              <p>{post.activity}</p>
            </div>
            <p className='description-text'>{post.description} </p>
          </div>
        ))}
      </div>
      <div></div>
    </>
  );
};

export default RecentPosts;
