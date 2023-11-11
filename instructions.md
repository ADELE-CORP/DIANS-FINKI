We used nodejs, npm, jq, and osmtogeojson npm package globally installed!

osmtogeojson to convert .osm xml to .geojson

node --max_old_space_size=8192 `which osmtogeojson` macedonia-latest.osm > mkd.geojson

jq to filter only for tourism|historic|cultural

jq '.features | map(select(.properties.tourism or .properties.cultural or .properties.historic)) | { "type": "FeatureCollection", "features": . }' mkd.geojson > filteredMkd.geojson
