#!/usr/bin/bash

# Create S3 bucket
set -x
awslocal s3 mb s3://avatar-bucket
set +x
