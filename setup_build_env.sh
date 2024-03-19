#!/bin/bash

set -o allexport
source .env
set +o allexport

export SUPABASE_URL_PARAM=$SUPABASE_URL=$SUPABASE_URL
export SUPABASE_ANON_KEY_PARAM=$SUPABASE_ANON_KEY
export CRYPTER_KEY_PARAM=$CRYPTER_KEY
export PUBLIC_SUPABASE_URL_PARAM=$SUPABASE_URL
export PUBLIC_SUPABASE_ANON_KEY_PARAM=$SUPABASE_ANON_KEY
export RESEND_KEY_PARAM=$RESEND_KEY