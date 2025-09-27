import { getStorageItem, setStorageItem } from '@/lib/storage';

export interface UserLists {
  [listName: string]: string[]; // contentId arrays
}

const LISTS_STORAGE_KEY = 'hexshow:lists';

// Default lists structure
const defaultLists: UserLists = {
  'My List': []
};

export const getList = (listName: string): string[] => {
  const lists = getStorageItem(LISTS_STORAGE_KEY, defaultLists);
  return lists[listName] || [];
};

export const getAllLists = (): UserLists => {
  return getStorageItem(LISTS_STORAGE_KEY, defaultLists);
};

export const createList = (listName: string): void => {
  const lists = getAllLists();
  if (!lists[listName]) {
    lists[listName] = [];
    setStorageItem(LISTS_STORAGE_KEY, lists);
  }
};

export const deleteList = (listName: string): void => {
  if (listName === 'My List') return; // Cannot delete default list
  
  const lists = getAllLists();
  delete lists[listName];
  setStorageItem(LISTS_STORAGE_KEY, lists);
};

export const renameList = (oldName: string, newName: string): void => {
  if (oldName === 'My List') return; // Cannot rename default list
  
  const lists = getAllLists();
  if (lists[oldName] && !lists[newName]) {
    lists[newName] = lists[oldName];
    delete lists[oldName];
    setStorageItem(LISTS_STORAGE_KEY, lists);
  }
};

export const addToList = (listName: string, contentId: string): void => {
  const lists = getAllLists();
  if (!lists[listName]) {
    lists[listName] = [];
  }
  
  if (!lists[listName].includes(contentId)) {
    lists[listName].push(contentId);
    setStorageItem(LISTS_STORAGE_KEY, lists);
  }
};

export const removeFromList = (listName: string, contentId: string): void => {
  const lists = getAllLists();
  if (lists[listName]) {
    lists[listName] = lists[listName].filter(id => id !== contentId);
    setStorageItem(LISTS_STORAGE_KEY, lists);
  }
};

export const isInList = (listName: string, contentId: string): boolean => {
  const lists = getAllLists();
  return lists[listName]?.includes(contentId) || false;
};