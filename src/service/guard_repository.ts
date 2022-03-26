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

const defaultGuardList: GuardObject[] = [
  {
    end: 5,
    start: 3,
    title: '누구세요',
    videoId: 'rkdpe_vg_Fk',
  },
  {
    end: 18,
    start: 15,
    title: '네 잠시만요',
    videoId: 'rkdpe_vg_Fk',
  },
  {
    end: 21,
    start: 18,
    title: '네',
    videoId: 'rkdpe_vg_Fk',
  },
  {
    end: 27,
    start: 24,
    title: '아니요',
    videoId: 'rkdpe_vg_Fk',
  },
  {
    end: 33,
    start: 30,
    title: '괜찮습니다',
    videoId: 'rkdpe_vg_Fk',
  },
  {
    end: 37,
    start: 33,
    title: '문 앞에 놓고가주세요',
    videoId: 'rkdpe_vg_Fk',
  },
  {
    end: 42,
    start: 37,
    title: '카드결제 했어요',
    videoId: 'rkdpe_vg_Fk',
  },
];

class GuardRepository {
  syncGuard(onUpdate: (value: GuardObjectList) => void) {
    const userId = firebaseAuth.currentUser?.uid;

    const ref = firebaseDatabase.ref(`${userId}/guards`);
    ref.on('value', (snapshot) => {
      const value = snapshot.val();
      onUpdate(value);
    });

    return () => ref.off();
  }

  async isFirstUser() {
    const userId = firebaseAuth.currentUser?.uid;

    if (!userId) {
      return;
    }

    const userData = await firebaseDatabase
      .ref(`${userId}`)
      .get()
      .then((snapshot) => {
        return snapshot.val();
      })
      .catch((error) => {
        console.error(error);
      });

    if (userData !== null) {
      return;
    }

    this.guardDefault();
  }

  guardDefault() {
    const id = Date.now();
    const userId = firebaseAuth.currentUser?.uid;

    if (!userId) {
      return;
    }

    let result: { [key: string]: GuardObject } = {};

    for (const i in defaultGuardList) {
      const guardId = id + i;
      result[guardId] = defaultGuardList[i];
    }

    firebaseDatabase.ref(`${userId}/guards`).set(result);
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
