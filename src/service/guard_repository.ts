import { firebaseAuth, firebaseDatabase } from './firebase';

export type GuardObject = {
  videoId: string;
  title: string;
  start: number;
  end: number;
};

export type GuardObjectList = {
  [index: string]: GuardObject;
};

class GuardRepository {
  syncGuard(onUpdate: (value: GuardObjectList) => void) {
    const userId = firebaseAuth.currentUser?.uid;

    console.log(userId);

    const ref = firebaseDatabase.ref(`${userId}/guards`);
    ref.on('value', (snapshot) => {
      const value = snapshot.val();
      onUpdate(value);
    });

    return () => ref.off();
  }

  saveGuard(guard: GuardObject) {
    const id = Date.now();
    const userId = firebaseAuth.currentUser?.uid;

    if (!userId) {
      return;
    }

    firebaseDatabase.ref(`${userId}/guards/${id}`).set(guard);
  }

  removeGuard(id: string) {
    const userId = firebaseAuth.currentUser?.uid;

    if (!userId) {
      return;
    }

    firebaseDatabase.ref(`${userId}/guards/${id}`).remove();
  }
}

export default GuardRepository;
