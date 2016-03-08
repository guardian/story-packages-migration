# Migrate story packages

Old packages are in R2, this script converts the old format to the one used by packages editor.

## Usage

```js
export CONTENT_API=https://capi.host/

node migrate-packages.js exported_list.csv
```

The script filters out all articles mentioned in `exported_list` that don't exist in CAPI anymore and generates a list of files in `tmp`.

* `errors.logs` Filtered out packages and articles
* `dynamo.txt` File that can be used to import packages in DynamoDB
* `distribution.csv` Distribution of package size length
* `collections/**/collection.json` Files with the content of packages

## Import

### dynamo.txt

* Upload the file in S3
* Create a data pipeline to import this file into dynamo table

### collection.json

* Run
```js
s3cmd sync --dry-run --add-header=Cache-Control:no-cache,no-store --add-header=Content-Type:application/json --acl-private tmp/collections/ s3://bucket/CODE/frontsapi/collection/
```

You might need to install [http://s3tools.org/s3cmd](s3cmd) and configure your API keys with `S3cmd --configure`
