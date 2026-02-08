import supabase from "./supabase";

export class ApiUtil {
  constructor() {}

  signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data.user.id;
  };

  deleteAllBacklogs = async (user_id: string) => {
    const { status, statusText, error } = await supabase
      .from("backlogs")
      .delete()
      .eq("user_id", user_id);

    if (error) {
      throw new Error(error.message);
    }

    return {
      status,
      statusText,
    };
  };
}
