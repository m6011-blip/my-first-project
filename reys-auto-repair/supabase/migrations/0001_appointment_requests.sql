-- Appointment requests from the website form.
-- Visitors (anon) may insert only. Nobody can read, change or delete through the public API;
-- staff read the rows in the Supabase dashboard or with the service role key (server-side only).

create table public.appointment_requests (
  id              bigint generated always as identity primary key,
  created_at      timestamptz not null default now(),
  status          text not null default 'new' check (status in ('new', 'contacted', 'booked', 'done', 'cancelled')),
  name            text not null check (char_length(name) between 2 and 100),
  phone           text not null check (phone ~ '^[0-9]{10,15}$'),
  email           text check (email is null or char_length(email) <= 254),
  vehicle_year    smallint not null check (vehicle_year between 1960 and 2100),
  vehicle_make    text not null check (char_length(vehicle_make) between 1 and 60),
  vehicle_model   text not null check (char_length(vehicle_model) between 1 and 60),
  service         text not null check (char_length(service) between 1 and 60),
  preferred_date  date not null,
  preferred_time  text not null check (preferred_time ~ '^[0-2][0-9]:[0-5][0-9]$'),
  notes           text check (notes is null or char_length(notes) <= 1000)
);

-- Staff view the newest requests first.
create index appointment_requests_created_at_idx on public.appointment_requests (created_at desc);

alter table public.appointment_requests enable row level security;

create policy "Visitors can request an appointment"
  on public.appointment_requests
  for insert
  to anon
  with check (status = 'new');

-- No select/update/delete policy for anon: the table is write-only from the website.
-- The REST call uses "Prefer: return=minimal", so it never needs to read the row back.
