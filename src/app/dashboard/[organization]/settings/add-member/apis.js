import { headers } from 'next/headers';
import { permanentRedirect } from 'next/navigation';
import { getMembers } from './crud'; // Import your CRUD operations function
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import requireSession from '~/lib/user/require-session';
import initializeServerI18n from '~/i18n/i18n.server';
import getLanguageCookie from '~/i18n/get-language-cookie';
import { getUserById } from '~/lib/user/database/queries';
import configuration from '~/configuration';

export async function fetchData(userId) {
  const client = getSupabaseServerComponentClient();
  const session = await requireSession(client);

  const { data, error } = await getMembers(client); // Assuming you have a function to fetch members data
  if (error) {
    throw error;
  }

  const i18n = await initializeServerI18n(getLanguageCookie());
  const csrfToken = headers().get('X-CSRF-Token') ?? '';

  return data;
}

export async function useFetchMembers(userId) {
  try {
    const data = await fetchData(userId);
    return data;
  } catch (error) {
    console.error('Error fetching members:', error);
    return null;
  }
}
