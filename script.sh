#!/bin/bash

echo "Choose an operation:"
echo "1. Copy file"
echo "2. Move file"
echo "3. Remove file"
echo "4. Change file permissions"
echo "5. Change file ownership"
read -p "Enter choice (1-5): " choice

case $choice in
    1)
        read -p "Enter source file: " src
        read -p "Enter destination: " dest
        cp "$src" "$dest"
        echo "File copied successfully."
        ;;
    2)
        read -p "Enter source file: " src
        read -p "Enter destination: " dest
        mv "$src" "$dest"
        echo "File moved successfully."
        ;;
    3)
        read -p "Enter file to remove: " file
        rm "$file"
        echo "File removed successfully."
        ;;
    4)
        read -p "Enter file: " file
        read -p "Enter permissions (e.g., 755): " perm
        chmod "$perm" "$file"
        echo "Permissions changed successfully."
        ;;
    5)
        read -p "Enter file: " file
        read -p "Enter new owner: " owner
        read -p "Enter new group (optional): " group
        if [ -z "$group" ]; then
            chown "$owner" "$file"
        else
            chown "$owner":"$group" "$file"
        fi
        echo "Ownership changed successfully."
        ;;
    *)
        echo "Invalid choice. Exiting."
        ;;
esac


