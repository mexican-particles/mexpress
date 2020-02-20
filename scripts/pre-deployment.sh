#!/bin/bash -eu
echo 'START: backend build'
cd backend
npm run build
cd ..
echo 'END: backend build'
