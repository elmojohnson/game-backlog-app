import supabase from "./supabase";

export class ApiUtil {
  constructor() {}

  signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: "Tester",
        },
      },
    });

    return {
      data,
      error,
    };
  };

  signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return {
      data,
      error,
    };
  };

  deleteAllBacklogs = async (user_id: string) => {
    const { status, statusText, error } = await supabase
      .from("backlogs")
      .delete()
      .eq("user_id", user_id);

    return { status, statusText, error };
  };
}
