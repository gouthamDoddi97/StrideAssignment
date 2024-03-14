import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxa2lpdGxpcGxremVtcGhncHNuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMDI0NTEwMCwiZXhwIjoyMDI1ODIxMTAwfQ.RJ1kFQvbxqriiJBi-oeMFNpQFblWoV8mahxyatrd_b4';

// Create a Supabase client instance

async function getBots() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data: bots, error: botsError } = await supabase
      .from('bots')
      .select('*');

    return bots || [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function createBot(botData) {
  try {
    console.log(SUPABASE_URL, SUPABASE_ANON_KEY);
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data, error, status } = await supabase
      .from('bots')
      .insert([botData]);
    if (error) {
      throw error;
    }
    return status;
  } catch (error) {
    return { error };
  }
}

async function updateBot(botId, updatedBotData) {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data, error, status } = await supabase
      .from('bots')
      .update(updatedBotData)
      .eq('id', botId);
    if (error) {
      throw error;
    }
    return status;
  } catch (error) {
    console.log(error);
    return '0000';
  }
}

async function deleteBot(botId) {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data, error, status } = await supabase
      .from('bots')
      .delete()
      .eq('id', botId);
    if (error) {
      throw error;
    }
    return status;
  } catch (error) {
    console.error(error);
    return '0000';
  }
}

export { getBots, createBot, updateBot, deleteBot };
