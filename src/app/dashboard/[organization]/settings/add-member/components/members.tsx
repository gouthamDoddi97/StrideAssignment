'use client';

import React, { useEffect, useState } from 'react';
import Container from '~/core/ui/Container';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@mui/material';
import { PencilIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { createMember, updateMember, deleteMember, getAllOrg } from '../crud';
import { Member } from '../page';

interface MembersProps {
  allMembers: Member[];
}

const Members: React.FC<MembersProps> = ({ allMembers }) => {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [allOrg, setAllOrg] = useState<any[]>([]);
  const [newMemberData, setNewMemberData] = useState<Member>({
    id: 0,
    name: '',
    position: '',
    organization: '',
    number: 0,
    created_at: '',
    level: '',
    experience: 0,
    email: '',
  });

  useEffect(() => {
    (async function iffe() {
      const data = await getAllOrg();
      if (data?.length) {
        console.log(data);
        setAllOrg(data);
      }
    })();
  }, []);

  const handleEditClick = (member: Member) => {
    setIsEditing(member.id);
  };

  const handleSaveClick = async () => {
    if (isEditing) {
      // Update existing member
      const { data, error } = await updateMember(isEditing, newMemberData);
      if (error) {
        console.error('Error updating member:', error);
        return;
      }
    }
    setIsEditing(null);
  };

  const handleAddMemberClick = () => {
    setIsAdding(true);
  };

  const handleDeleteClick = async (id: number) => {
    const { data, error } = await deleteMember(id);
    if (error) {
      console.error('Error deleting member:', error);
      return;
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
  };

  const handleCloseDialog = () => {
    setIsAdding(false);
  };

  const handleAddNewMember = async () => {
    console.log(newMemberData, 'here');
    const { data, error } = await createMember(newMemberData);
    if (error) {
      console.error('Error creating member:', error);
      return;
    }
    setIsAdding(false);
    setNewMemberData({
      id: 0,
      name: '',
      position: '',
      organization: '',
      number: 0,
      created_at: '',
      level: '',
      experience: 0,
      email: '',
    });
  };

  return (
    <Container>
      <div className="flex justify-between mb-4">
        <p>All Users</p>
        <Tooltip title="Add a member">
          <Button
            onClick={handleAddMemberClick}
            variant="outlined"
            endIcon={<PlusCircleIcon />}
          >
            Add Member
          </Button>
        </Tooltip>
      </div>
      <Grid container spacing={2}>
        {allMembers.map((member) => (
          <Grid key={member.id} item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardContent>
                <Avatar
                  src={'https://via.placeholder.com/150'}
                  alt={member.name}
                  sx={{ width: 64, height: 64 }}
                />
                <TextField
                  label="Name"
                  value={member.name}
                  disabled={isEditing !== member.id}
                  fullWidth
                  variant="standard"
                  sx={{ mt: 1 }}
                />
                <TextField
                  label="Designation"
                  value={member.position}
                  disabled={isEditing !== member.id}
                  fullWidth
                  variant="standard"
                  sx={{ mt: 1 }}
                />
                <TextField
                  label="Organization"
                  value={member.organization}
                  disabled={isEditing !== member.id}
                  fullWidth
                  variant="standard"
                  sx={{ mt: 1 }}
                />
                {/* Add the remaining fields here */}
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {isEditing === member.id ? (
                    <>
                      <Button
                        onClick={handleSaveClick}
                        variant="outlined"
                        endIcon={<PencilIcon />}
                        sx={{ mt: 1 }}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={handleCancelEdit}
                        variant="outlined"
                        sx={{ mt: 1 }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => handleEditClick(member)}
                      variant="outlined"
                      endIcon={<PencilIcon />}
                      sx={{ mt: 1 }}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDeleteClick(member.id)}
                    variant="outlined"
                    sx={{ mt: 1 }}
                    color="error"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={isAdding} onClose={handleCloseDialog}>
        <DialogTitle>Add Member</DialogTitle>
        <DialogContent>
          {/* Add fields to add a new member */}
          <TextField
            label="Name"
            value={newMemberData.name}
            onChange={(e) =>
              setNewMemberData({ ...newMemberData, name: e.target.value })
            }
            fullWidth
            variant="standard"
            sx={{ mt: 1 }}
          />
          <TextField
            label="Designation"
            value={newMemberData.position}
            onChange={(e) =>
              setNewMemberData({ ...newMemberData, position: e.target.value })
            }
            fullWidth
            variant="standard"
            sx={{ mt: 1 }}
          />
          <Select
            value={allOrg[0]}
            onChange={(e) =>
              setNewMemberData({
                ...newMemberData,
                organization: e.target.value,
              })
            }
          >
            {allOrg?.map((option, index) => (
              <MenuItem key={index} value={option.uuid}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
          {/* Add the remaining fields here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log('Dialog');
              handleAddNewMember();
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Members;
