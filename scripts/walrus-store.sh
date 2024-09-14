#!/bin/bash

# Set the environment variables
PUBLISHER=${PUBLISHER:-"https://publisher-devnet.walrus.space"}

# Create a temporary file to store the JSON results
temp_file=$(mktemp)
echo "{" > "$temp_file"

# Counter for comma placement
counter=0

# Iterate through all files in the tarot directory
for file in tarot/*; do
    # Get the filename without extension
    filename=$(basename "$file")
    filename_no_ext="${filename%.*}"

    # Upload the file to Walrus and capture the response
    response=$(curl -s -X PUT "$PUBLISHER/v1/store" --upload-file "$file")

    # Extract the newlyCreated or alreadyCertified object from the response
    result=$(echo "$response" | jq '.newlyCreated // .alreadyCertified')

    # Print the result
    echo "$filename: $result"

    # Determine the type of result
    if [[ $(echo "$response" | jq 'has("newlyCreated")') == "true" ]]; then
        result_type="newlyCreated"
    elif [[ $(echo "$response" | jq 'has("alreadyCertified")') == "true" ]]; then
        result_type="alreadyCertified"
    else
        result_type="unknown"
    fi

    # If it's not the first item, add a comma
    if [ $counter -ne 0 ]; then
        echo "," >> "$temp_file"
    fi

    # Add the result to the temporary file
    echo "  \"$filename_no_ext\": {\"type\": \"$result_type\", \"data\": $result}" >> "$temp_file"

    ((counter++))
done

# Close the JSON object
echo "}" >> "$temp_file"

# Pretty print the JSON and save it to tarot-card-blobs.json
jq '.' "$temp_file" > app/data/tarot-card-blobs.json

# Remove the temporary file
rm "$temp_file"

echo "Upload complete. Results saved in app/data/tarot-card-blobs.json"
