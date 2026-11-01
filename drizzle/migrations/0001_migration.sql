-- profile-media: anyone may read (avatars/banners shown on public profiles), owners write in their own folder
create policy "Profile media is readable" on storage.objects for select to anon, authenticated using (bucket_id = 'profile-media');
create policy "Users upload own profile media" on storage.objects for insert to authenticated with check (bucket_id = 'profile-media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Users update own profile media" on storage.objects for update to authenticated using (bucket_id = 'profile-media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Users delete own profile media" on storage.objects for delete to authenticated using (bucket_id = 'profile-media' and (storage.foldername(name))[1] = auth.uid()::text);

-- creations: owners manage their files; public creations' files readable by anyone
create policy "Owners read own creation files" on storage.objects for select to authenticated using (bucket_id = 'creations' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Public creation files are readable" on storage.objects for select to anon, authenticated using (
  bucket_id = 'creations' and exists (
    select 1 from public.creations c join public.profiles p on p.id = c.owner_id
    where c.file_path = storage.objects.name and c.visibility = 'public' and p.is_public and p.show_creations
  )
);
create policy "Owners upload creation files" on storage.objects for insert to authenticated with check (bucket_id = 'creations' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Owners delete creation files" on storage.objects for delete to authenticated using (bucket_id = 'creations' and (storage.foldername(name))[1] = auth.uid()::text);
