--
-- PostgreSQL database dump
--

\restrict j4DUyHXuT0oPFwQTyvfeS3YzQyLeJIDjOmOphZOTKkfTqSS3jlRtmtASwPe1iRJ

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2026-03-17 14:11:12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 24744)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 4991 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- TOC entry 258 (class 1255 OID 24781)
-- Name: set_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.set_updated_at() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 24782)
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locations (
    location_id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    building text,
    room text,
    floor integer,
    address_line text,
    latitude double precision,
    longitude double precision,
    notes text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24791)
-- Name: requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requests (
    request_id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_by_user_id uuid NOT NULL,
    request_type text DEFAULT 'message'::text NOT NULL,
    priority text DEFAULT 'normal'::text NOT NULL,
    title text NOT NULL,
    message_body text,
    payload_json jsonb,
    pickup_location_id uuid,
    dropoff_location_id uuid,
    assigned_robot_id uuid,
    assigned_at timestamp with time zone,
    status text DEFAULT 'queued'::text NOT NULL,
    status_reason text,
    requested_for timestamp with time zone,
    started_at timestamp with time zone,
    completed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.requests OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24802)
-- Name: robot_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.robot_status (
    robot_id uuid DEFAULT gen_random_uuid() NOT NULL,
    robot_name text NOT NULL,
    status text DEFAULT 'idle'::text NOT NULL,
    battery_percent integer,
    last_seen_at timestamp with time zone DEFAULT now() NOT NULL,
    current_location_id uuid,
    active_request_id uuid,
    error_code text,
    error_message text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT robot_status_battery_percent_check CHECK (((battery_percent >= 0) AND (battery_percent <= 100)))
);


ALTER TABLE public.robot_status OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24813)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    full_name text NOT NULL,
    role text DEFAULT 'requester'::text NOT NULL,
    phone text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4813 (class 2606 OID 24824)
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (location_id);


--
-- TOC entry 4820 (class 2606 OID 24826)
-- Name: requests requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (request_id);


--
-- TOC entry 4824 (class 2606 OID 24828)
-- Name: robot_status robot_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.robot_status
    ADD CONSTRAINT robot_status_pkey PRIMARY KEY (robot_id);


--
-- TOC entry 4826 (class 2606 OID 24830)
-- Name: robot_status robot_status_robot_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.robot_status
    ADD CONSTRAINT robot_status_robot_name_key UNIQUE (robot_name);


--
-- TOC entry 4828 (class 2606 OID 24832)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4830 (class 2606 OID 24834)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4814 (class 1259 OID 24835)
-- Name: idx_requests_assigned_robot; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_requests_assigned_robot ON public.requests USING btree (assigned_robot_id);


--
-- TOC entry 4815 (class 1259 OID 24836)
-- Name: idx_requests_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_requests_created_at ON public.requests USING btree (created_at DESC);


--
-- TOC entry 4816 (class 1259 OID 24837)
-- Name: idx_requests_created_by; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_requests_created_by ON public.requests USING btree (created_by_user_id);


--
-- TOC entry 4817 (class 1259 OID 24838)
-- Name: idx_requests_payload_gin; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_requests_payload_gin ON public.requests USING gin (payload_json);


--
-- TOC entry 4818 (class 1259 OID 24839)
-- Name: idx_requests_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_requests_status ON public.requests USING btree (status);


--
-- TOC entry 4821 (class 1259 OID 24840)
-- Name: idx_robot_last_seen; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_robot_last_seen ON public.robot_status USING btree (last_seen_at DESC);


--
-- TOC entry 4822 (class 1259 OID 24841)
-- Name: idx_robot_status_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_robot_status_status ON public.robot_status USING btree (status);


--
-- TOC entry 4837 (class 2620 OID 24842)
-- Name: locations trg_locations_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_locations_updated_at BEFORE UPDATE ON public.locations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- TOC entry 4838 (class 2620 OID 24843)
-- Name: requests trg_requests_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_requests_updated_at BEFORE UPDATE ON public.requests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- TOC entry 4839 (class 2620 OID 24844)
-- Name: robot_status trg_robot_status_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_robot_status_updated_at BEFORE UPDATE ON public.robot_status FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- TOC entry 4840 (class 2620 OID 24845)
-- Name: users trg_users_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- TOC entry 4835 (class 2606 OID 24846)
-- Name: robot_status fk_robot_active_request; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.robot_status
    ADD CONSTRAINT fk_robot_active_request FOREIGN KEY (active_request_id) REFERENCES public.requests(request_id) ON DELETE SET NULL;


--
-- TOC entry 4831 (class 2606 OID 24851)
-- Name: requests requests_assigned_robot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_assigned_robot_id_fkey FOREIGN KEY (assigned_robot_id) REFERENCES public.robot_status(robot_id) ON DELETE SET NULL;


--
-- TOC entry 4832 (class 2606 OID 24856)
-- Name: requests requests_created_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_created_by_user_id_fkey FOREIGN KEY (created_by_user_id) REFERENCES public.users(user_id) ON DELETE RESTRICT;


--
-- TOC entry 4833 (class 2606 OID 24861)
-- Name: requests requests_dropoff_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_dropoff_location_id_fkey FOREIGN KEY (dropoff_location_id) REFERENCES public.locations(location_id) ON DELETE SET NULL;


--
-- TOC entry 4834 (class 2606 OID 24866)
-- Name: requests requests_pickup_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pickup_location_id_fkey FOREIGN KEY (pickup_location_id) REFERENCES public.locations(location_id) ON DELETE SET NULL;


--
-- TOC entry 4836 (class 2606 OID 24871)
-- Name: robot_status robot_status_current_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.robot_status
    ADD CONSTRAINT robot_status_current_location_id_fkey FOREIGN KEY (current_location_id) REFERENCES public.locations(location_id) ON DELETE SET NULL;


-- Completed on 2026-03-17 14:11:12

--
-- PostgreSQL database dump complete
--

\unrestrict j4DUyHXuT0oPFwQTyvfeS3YzQyLeJIDjOmOphZOTKkfTqSS3jlRtmtASwPe1iRJ

