const { supabaseAdmin } = require('../supabaseAdmin');

class MedicalProfile {
  static async create(data) {
    const { data: profile, error } = await supabaseAdmin
      .from('medical_profiles')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return profile;
  }

  static async get(id) {
    const { data: profile, error } = await supabaseAdmin
      .from('medical_profiles')
      .select('*')
      .eq('id', id)
      .single();
  
    if (error) {
      if (error.code === 'PGRST116') return null; // No rows returned
      throw error;
    }
    return profile;
  }

  static async update(id, data) {
    const { data: profile, error } = await supabaseAdmin
      .from('medical_profiles')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows returned
      throw error;
    }
    return profile;
  }

  static async delete(id) {
    const { error } = await supabaseAdmin
      .from('medical_profiles')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  static async getAll() {
    const { data: profiles, error } = await supabaseAdmin
      .from('medical_profiles')
      .select('*');

    if (error) throw error;
    return profiles;
  }
}

module.exports = MedicalProfile;