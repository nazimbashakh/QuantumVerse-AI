import os

file_path = r'E:\OneDrive\Desktop\QUANTUM Verse AI\src\data\levels\level_3.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if len(line) > 1000:
        # Find the start of the garbage sequence
        # It typically starts with repeating adverbs
        if 'successfully' in line and 'cleanly' in line:
            # Keep the start of the string up to the point it gets repetitive
            parts = line.split('successfully')
            clean_line = parts[0] + 'successfully."' + '\n'
            new_lines.append(clean_line)
            print(f"Cleaned line: {len(line)} -> {len(clean_line)}")
        else:
            new_lines.append(line)
    else:
        new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
