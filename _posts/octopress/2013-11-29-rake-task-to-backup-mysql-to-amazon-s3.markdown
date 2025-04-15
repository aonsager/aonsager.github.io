---
layout: post
title: Rake task to backup MySQL to Amazon S3
description: A simple rake task to dump the contents of a MySQL database and save
  it to an Amazon S3 bucket
keywords: ruby, rake, mysql, backup, s3, automation
date: 2013-11-29 01:54
comments: true
nav_category: posts
nav_category_color: blue
slug_color: blue-light
link:
tags:
- programming
- ruby
- tech
- script
- aws
colors:
- "#B0B0B0"
- "#A8ABB1"
- "#35276B"
- "#56CA09"
- "#919191"
archive:
- coding
---

A simple rake task to dump the contents of a MySQL database and save it to an Amazon S3 bucket. Use together with [whenever](https://github.com/javan/whenever) to automate it.

``` ruby
namespace :backup do

  task :nightly do
    timestamp = Time.now.strftime("%Y-%m-%d_%H-%M-%S")
    backup_file = "tmp/backups/#{timestamp}_dump.sql.gz"
    `mkdir -p tmp/backups`
    `mysqldump -u root {DATABASE_NAME} | gzip -c > #{backup_file}`

    send_to_s3 backup_file
  end

  def send_to_s3(file_path)
    bucket = "{BUCKET_NAME}"
    file_name = File.basename(file_path)
    AWS::S3::DEFAULT_HOST.replace "s3-us-west-2.amazonaws.com"

    AWS::S3::Base.establish_connection!(
      :access_key_id => '{KEY}',
      :secret_access_key => '{SECRET}')

    AWS::S3::S3Object.store(
      "backups/#{file_name}",
      File.open("#{file_path}"),
      bucket)
  end

end
```
