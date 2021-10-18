import { firebaseAuth, firebaseDatabase } from './firebase';

export type GuardObject = {
  videoId: string;
  title: string;
  start: number;
  end: number;
};

class GuardRepository {
  saveGuard(guard: GuardObject) {
    const id = Date.now();
    const userId = firebaseAuth.currentUser?.uid;

    if (!userId) {
      return;
    }

    firebaseDatabase.ref(`${userId}/guards/${id}`).set(guard);
  }
}

export default GuardRepository;
