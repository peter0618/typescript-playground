import { pipe, sort, sortBy, toArray } from '@fxts/core';

type UserInGroup = {
  id: number;
  orderId: number;
  groupId: number;
};

describe('sorting', () => {
  describe('기본 sorting', () => {
    let array: any[] = [];
    beforeAll(() => {
      array = [
        { id: 3, orderId: 3 },
        { id: 1, orderId: 1 },
        { id: 2, orderId: 2 },
      ];
    });

    it('sort by sort 메서드', () => {
      const sortedArray = array.sort((a, b) => a.orderId - b.orderId);
      expect(sortedArray[0].id).toEqual(1);
      expect(sortedArray[1].id).toEqual(2);
      expect(sortedArray[2].id).toEqual(3);
    });

    it('sort by FxTS sortBy 메서드', () => {
      const sortedArray = sortBy((item) => item.orderId, array);
      expect(sortedArray[0].id).toEqual(1);
      expect(sortedArray[1].id).toEqual(2);
      expect(sortedArray[2].id).toEqual(3);
    });
  });

  describe('필드 2개에 대한 sorting', () => {
    let array: UserInGroup[];
    // 필드 2개에 대한 정렬은 아래와 같이 comparator 를 작성하여 사용할 수 있습니다.
    // (groupId, orderId) 에 대한 복합 정렬을 가정합니다.
    const comparator = (a: UserInGroup, b: UserInGroup) => {
      const deltaGroupId = a.groupId - b.groupId;
      return deltaGroupId !== 0 ? deltaGroupId : a.orderId - b.orderId;
    };

    beforeAll(() => {
      array = [
        { id: 1, orderId: 1, groupId: 1 },
        { id: 6, orderId: 3, groupId: 2 },
        { id: 5, orderId: 2, groupId: 2 },
        { id: 2, orderId: 2, groupId: 1 },
        { id: 4, orderId: 1, groupId: 2 },
        { id: 3, orderId: 3, groupId: 1 },
      ];
    });

    it('sort by sort 메서드', () => {
      const sortedArray = array.sort(comparator);
      expect(sortedArray[0].id).toEqual(1);
      expect(sortedArray[1].id).toEqual(2);
      expect(sortedArray[2].id).toEqual(3);
      expect(sortedArray[3].id).toEqual(4);
      expect(sortedArray[4].id).toEqual(5);
      expect(sortedArray[5].id).toEqual(6);
    });

    it('sort by FxTS sort 메서드', () => {
      const sortedArray = pipe(array, sort(comparator), toArray);
      expect(sortedArray[0].id).toEqual(1);
      expect(sortedArray[1].id).toEqual(2);
      expect(sortedArray[2].id).toEqual(3);
      expect(sortedArray[3].id).toEqual(4);
      expect(sortedArray[4].id).toEqual(5);
      expect(sortedArray[5].id).toEqual(6);
    });
  });
});
