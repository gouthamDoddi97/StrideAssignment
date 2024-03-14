import React from 'react';
import { headers } from 'next/headers';
import { permanentRedirect } from 'next/navigation';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import requireSession from '~/lib/user/require-session';
import initializeServerI18n from '~/i18n/i18n.server';
import getLanguageCookie from '~/i18n/get-language-cookie';
import { getUserById } from '~/lib/user/database/queries';
import AppHeader from '../../components/AppHeader';
import { withI18n } from '~/i18n/with-i18n';
import Members from './components/members';
import { createMember, updateMember, deleteMember, getMembers } from './crud';
import configuration from '~/configuration';
import { useFetchMembers } from './apis';
import { createClient } from '@supabase/supabase-js';

export interface Member {
  id: number;
  number: number;
  created_at: string;
  name: string;
  position: string;
  level: string;
  experience: number;
  email: string;
  organization: string;
}

async function AddMembers() {
  // Create a Supabase client instance
  const client = getSupabaseServerComponentClient();
  const session = await requireSession(client);
  const userId = session.user.id;

  let allMembers: Member[] = await getMembers();

  // const handleCreateMember = async (memberData) => {
  //   // Call the createMember function from CRUD operations
  //   await createMember(client, memberData);
  //   setCreateMemberData([]);
  //   // Update the allMembers state with the newly created member
  //   setAllMembers([...allMembers, memberData]);
  // };

  // const handleUpdateMember = async (memberData) => {
  //   // Call the updateMember function from CRUD operations
  //   await updateMember(client, memberData);
  //   // Update the allMembers state with the updated member
  //   setAllMembers(
  //     allMembers.map((member) =>
  //       member.id === memberData.id ? memberData : member,
  //     ),
  //   );
  //   setEditUID(null);
  // };

  // const handleDeleteMember = async (memberID: bigint) => {
  //   // Call the deleteMember function from CRUD operations
  //   await deleteMember(client, memberID);
  //   // Remove the deleted member from the allMembers state
  //   setAllMembers(allMembers.filter((member) => member.id !== memberID));
  //   setDeleteUID(null);
  // };

  return (
    <div style={{ padding: '0.5rem', width: '90%', height: '90% !important' }}>
      <AppHeader
        title={'Members'}
        description={'Manage members within your organization.'}
      ></AppHeader>
      <Members
        // setDeleteUID={setDeleteUID}
        allMembers={allMembers}
        // setCreateMemberData={setCreateMemberData}
        // onCreateMember={handleCreateMember}
        // onUpdateMember={handleUpdateMember}
        // onDeleteMember={handleDeleteMember}
      />
    </div>
  );
}

export default withI18n(AddMembers);
