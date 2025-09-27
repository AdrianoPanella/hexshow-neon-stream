import { useState } from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ContentCarousel from '@/components/ContentCarousel';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAllLists, createList, deleteList, renameList } from '@/store/listsStore';
import { mockContent } from '@/data/mockData';

const MyList = () => {
  const [lists, setLists] = useState(getAllLists());
  const [newListName, setNewListName] = useState('');
  const [editingList, setEditingList] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const refreshLists = () => {
    setLists(getAllLists());
  };

  const handleCreateList = () => {
    if (newListName.trim()) {
      createList(newListName.trim());
      setNewListName('');
      refreshLists();
    }
  };

  const handleDeleteList = (listName: string) => {
    if (listName !== 'My List' && confirm(`Delete "${listName}"?`)) {
      deleteList(listName);
      refreshLists();
    }
  };

  const handleStartEdit = (listName: string) => {
    if (listName !== 'My List') {
      setEditingList(listName);
      setEditName(listName);
    }
  };

  const handleSaveEdit = () => {
    if (editingList && editName.trim() && editName !== editingList) {
      renameList(editingList, editName.trim());
      setEditingList(null);
      setEditName('');
      refreshLists();
    } else {
      setEditingList(null);
      setEditName('');
    }
  };

  // Create content rows for each list
  const contentRows = Object.entries(lists).map(([listName, contentIds]) => ({
    id: `list-${listName}`,
    title: listName,
    items: contentIds.map(id => mockContent.find(item => item.id === id)).filter(Boolean) as any[]
  })).filter(row => row.items.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-brand text-neon-green">
                My Lists
              </h1>
              <p className="text-muted-foreground mt-2">
                Organize and manage your saved content
              </p>
            </div>
          </div>

          {/* Create New List */}
          <div className="bg-cyber-card border border-cyber-border rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Create New List</h3>
            <div className="flex gap-3">
              <Input
                placeholder="Enter list name..."
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateList()}
                className="flex-1 bg-cyber-dark border-cyber-border"
              />
              <Button
                onClick={handleCreateList}
                className="bg-neon-green hover:bg-neon-green/90 text-black"
                disabled={!newListName.trim()}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create
              </Button>
            </div>
          </div>

          {/* List Management */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-foreground">Manage Lists</h3>
            <div className="space-y-2">
              {Object.keys(lists).map((listName) => (
                <div
                  key={listName}
                  className="flex items-center justify-between bg-cyber-card border border-cyber-border rounded-lg p-4"
                >
                  <div className="flex items-center gap-3">
                    {editingList === listName ? (
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                        className="w-48 bg-cyber-dark border-cyber-border"
                        autoFocus
                      />
                    ) : (
                      <span className="font-medium text-foreground">{listName}</span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      ({lists[listName].length} items)
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    {editingList === listName ? (
                      <Button
                        size="sm"
                        onClick={handleSaveEdit}
                        className="bg-neon-green hover:bg-neon-green/90 text-black"
                      >
                        Save
                      </Button>
                    ) : (
                      <>
                        {listName !== 'My List' && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleStartEdit(listName)}
                              className="hover:bg-cyber-border"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteList(listName)}
                              className="hover:bg-destructive/20 text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Lists */}
      {contentRows.length > 0 ? (
        <div className="space-y-8 pb-12">
          {contentRows.map((row) => (
            <ContentCarousel key={row.id} row={row} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No lists created yet. Start by adding content to your lists!</p>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default MyList;