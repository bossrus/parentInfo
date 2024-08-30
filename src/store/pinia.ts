import { defineStore } from 'pinia';
import { IPeopleInfo } from '@/types/types.ts';

interface IPeopleState {
  parent: IPeopleInfo;
  kids: IPeopleInfo[];
}

export const usePeopleStore = defineStore('peopleStore', {
  state: (): IPeopleState => ({
    parent: { name: '', age: 0 },
    kids: [],
  }),
  actions: {
    updatePeople(parent: IPeopleInfo) {
      this.parent = parent;
    },
    updateKids(kids: IPeopleInfo[]) {
      this.kids = kids;
    },
  },
});