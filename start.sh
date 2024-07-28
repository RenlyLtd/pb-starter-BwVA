#!/bin/sh

# Start PocketBase to initialize directories
/usr/local/bin/pocketbase serve --http=0.0.0.0:8090 --dir=/root/pocketbase &

# Wait for PocketBase to create necessary directories
sleep 5

# Stop the PocketBase server
pkill pocketbase

# Copy hooks after directories are created
cp -r /tmp/pb_hooks /root/pocketbase/
cp -r /tmp/pb_migrations /root/pocketbase/

# Restart PocketBase
/usr/local/bin/pocketbase serve --http=0.0.0.0:8090 --dir=/root/pocketbase/pb_data
