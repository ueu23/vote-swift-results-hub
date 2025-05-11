
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVote } from '@/context/VoteContext';
import { Candidate } from '@/types';
import { Edit, Trash, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CandidateManager: React.FC = () => {
  const { currentElection, updateCandidates } = useVote();
  const { toast } = useToast();
  const [candidates, setCandidates] = useState<Candidate[]>(
    currentElection?.candidates || []
  );
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Candidate>({
    id: '',
    name: '',
    party: '',
    manifesto: '',
    photo: '/placeholder.svg',
    votes: 0
  });

  const handleAddCandidate = () => {
    const newCandidate: Candidate = {
      id: Date.now().toString(),
      name: 'New Candidate',
      party: 'Party Name',
      manifesto: 'Candidate manifesto goes here...',
      photo: '/placeholder.svg',
      votes: 0
    };
    
    const updatedCandidates = [...candidates, newCandidate];
    setCandidates(updatedCandidates);
    updateCandidates(updatedCandidates);
    setIsEditing(newCandidate.id);
    setEditForm(newCandidate);
    
    toast({
      title: 'Candidate Added',
      description: 'A new candidate has been added to the election.',
    });
  };

  const startEditing = (candidate: Candidate) => {
    setIsEditing(candidate.id);
    setEditForm({ ...candidate });
  };

  const handleSave = () => {
    const updatedCandidates = candidates.map((c) =>
      c.id === editForm.id ? { ...editForm } : c
    );
    
    setCandidates(updatedCandidates);
    updateCandidates(updatedCandidates);
    setIsEditing(null);
    
    toast({
      title: 'Changes Saved',
      description: 'Candidate details have been updated.',
    });
  };

  const handleDelete = (id: string) => {
    const updatedCandidates = candidates.filter((c) => c.id !== id);
    setCandidates(updatedCandidates);
    updateCandidates(updatedCandidates);
    
    if (isEditing === id) {
      setIsEditing(null);
    }
    
    toast({
      title: 'Candidate Removed',
      description: 'The candidate has been removed from the election.',
      variant: 'destructive',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-vote-purple">Manage Candidates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="border rounded-md p-4 bg-white"
            >
              {isEditing === candidate.id ? (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={editForm.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="party">Party</Label>
                    <Input
                      id="party"
                      name="party"
                      value={editForm.party}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="manifesto">Manifesto</Label>
                    <Textarea
                      id="manifesto"
                      name="manifesto"
                      value={editForm.manifesto}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>
                  <div className="pt-2 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(null)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="bg-vote-purple hover:bg-vote-purple-dark">
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{candidate.name}</h3>
                    <p className="text-sm text-gray-500">{candidate.party}</p>
                    <p className="text-xs mt-2 text-gray-600">{candidate.manifesto.substring(0, 100)}...</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEditing(candidate)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(candidate.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}

          <Button 
            onClick={handleAddCandidate} 
            className="w-full mt-4 bg-vote-purple hover:bg-vote-purple-dark"
          >
            <Plus size={16} className="mr-2" />
            Add Candidate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateManager;
