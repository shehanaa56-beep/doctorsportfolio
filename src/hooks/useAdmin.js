import { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function useAdmin() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoading(true);
      try {
        if (u && u.email) {
          const d = await getDoc(doc(db, 'site', 'admins'));
          if (d.exists()) {
            const data = d.data();
            const list = (data.emails || []).map(e => (typeof e === 'string' ? e.trim().toLowerCase() : e));
            const current = u.email ? u.email.trim().toLowerCase() : '';
            setIsAdmin(list.includes(current));
          } else {
            // no admins doc - default to false
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (e) {
        console.error('useAdmin', e);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  return { user, isAdmin, loading };
}
