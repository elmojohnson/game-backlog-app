create trigger handle_updated_at before update on backlogs
  for each row execute procedure moddatetime (updated_at);