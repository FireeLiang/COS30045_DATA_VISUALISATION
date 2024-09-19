<?php

// Function to get file size in human-readable format
function human_filesize($size, $precision = 2) {
    if ($size == 0) {
        return '0 B'; // Return '0 B' for zero-sized files
    }
    $units = ['B', 'KB', 'MB', 'GB', 'TB'];
    $unitIndex = floor(log($size, 1024));
    return round($size / pow(1024, $unitIndex), $precision) . ' ' . $units[$unitIndex];
}

// Function to get MIME type
function get_mime_type($file) {
    return mime_content_type($file);
}

// Function to sort by columns
function sort_by($files, $sort_column, $order = 'asc') {
    usort($files, function($a, $b) use ($sort_column, $order) {
        if ($order === 'asc') {
            return strcmp($a[$sort_column], $b[$sort_column]);
        } else {
            return strcmp($b[$sort_column], $a[$sort_column]);
        }
    });
    return $files;
}

// Get sort parameters from query
$sort_column = isset($_GET['sort']) ? $_GET['sort'] : 'name';
$order = isset($_GET['order']) && $_GET['order'] === 'desc' ? 'desc' : 'asc';

// Scan the current directory and filter out '.' and '..'
$files = array_diff(scandir('.'), ['.', '..']);
$file_data = [];

// Loop through each file and get its data
foreach ($files as $file) {
    $file_data[] = [
        'name' => $file,
        'is_dir' => is_dir($file),
        'size' => is_dir($file) ? '-' : human_filesize(filesize($file)),
        'modified' => date("d-M-Y H:i", filemtime($file)),
        'mime_type' => is_dir($file) ? 'Directory' : get_mime_type($file),
    ];
}

// Sort files by selected column
$file_data = sort_by($file_data, $sort_column, $order);

// Function to build sortable table header links
function build_sort_link($column, $label, $current_column, $current_order) {
    $new_order = ($current_column === $column && $current_order === 'asc') ? 'desc' : 'asc';
    return "<a href=\"?sort=$column&order=$new_order\">$label</a>";
}

// Function to check if we are in the root directory
$is_root = realpath('.') === realpath($_SERVER['DOCUMENT_ROOT']);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Directory Listing</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th a {
            text-decoration: none;
            color: black;
        }
        th a:hover {
            text-decoration: underline;
        }
        td.return-btn {
            /** 
            text-align: center; 
            **/
            font-weight: bold;
        }
    </style>
</head>
<body>

<h2>Index of <?php echo basename(__DIR__); ?></h2>

<table>
    <thead>
        <tr>
            <th><?php echo build_sort_link('name', 'Name', $sort_column, $order); ?></th>
            <th><?php echo build_sort_link('mime_type', 'Type', $sort_column, $order); ?></th>
            <th><?php echo build_sort_link('size', 'Size', $sort_column, $order); ?></th>
            <th><?php echo build_sort_link('modified', 'Last Modified', $sort_column, $order); ?></th>
        </tr>
    </thead>
    <tbody>
        <!-- Return button to go back to parent directory -->
        <?php if (!$is_root): // Only show if we're not in the root directory ?>
        <tr>
            <td class="return-btn" colspan="4">
                <a href="../">...</a>
            </td>
        </tr>
        <?php endif; ?>

        <!-- Loop through and display files and directories -->
        <?php foreach ($file_data as $file): ?>
        <tr>
            <td>
                <?php if ($file['is_dir']): ?>
                    <a href="<?php echo $file['name']; ?>/"><?php echo $file['name']; ?>/</a>
                <?php else: ?>
                    <a href="<?php echo $file['name']; ?>"><?php echo $file['name']; ?></a>
                <?php endif; ?>
            </td>
            <td><?php echo $file['mime_type']; ?></td>
            <td><?php echo $file['size']; ?></td>
            <td><?php echo $file['modified']; ?></td>
        </tr>
        <?php endforeach; ?>
    </tbody>
</table>

</body>
</html>
