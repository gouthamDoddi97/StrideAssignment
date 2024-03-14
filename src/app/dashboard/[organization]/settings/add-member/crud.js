import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxa2lpdGxpcGxremVtcGhncHNuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMDI0NTEwMCwiZXhwIjoyMDI1ODIxMTAwfQ.RJ1kFQvbxqriiJBi-oeMFNpQFblWoV8mahxyatrd_b4';

// Create a Supabase client instance

export async function getAllOrg() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { data: organizations, error: organizationsError } = await supabase
    .from('organizations')
    .select('*');
  return organizations;
}

async function getMembers() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data: members, error: membersError } = await supabase
      .from('members')
      .select('*');

    if (membersError) {
      throw membersError;
    }

    // Extract UUIDs of organizations from members
    const organizationUUIDs = members.map((member) => member.organization);

    // Query to fetch organization names
    const { data: organizations, error: organizationsError } = await supabase
      .from('organizations')
      .select('*')
      .in('uuid', organizationUUIDs);

    if (organizationsError) {
      throw organizationsError;
    }

    // Map organization UUIDs to names in members data
    const membersWithOrgNames = members.map((member) => {
      const organization = organizations.find(
        (org) => org.uuid === member.organization,
      );
      return {
        ...member,
        organization: organization ? organization.name : null,
      };
    });
    return membersWithOrgNames || [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function createMember(memberData) {
  try {
    console.log(SUPABASE_URL, SUPABASE_ANON_KEY);
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data, error } = await supabase.from('members').insert([memberData]);
    if (error) {
      throw error;
    }
    return { data: data || [] };
  } catch (error) {
    return { error };
  }
}

async function updateMember(memberId, updatedMemberData) {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data, error } = await supabase
      .from('members')
      .update(updatedMemberData)
      .eq('id', memberId);
    if (error) {
      throw error;
    }
    return { data: data || [] };
  } catch (error) {
    return { error };
  }
}

async function deleteMember(memberId) {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data, error } = await supabase
      .from('members')
      .delete()
      .eq('id', memberId);
    if (error) {
      throw error;
    }
    return { data: data || [] };
  } catch (error) {
    return { error };
  }
}

export { getMembers, createMember, updateMember, deleteMember };
