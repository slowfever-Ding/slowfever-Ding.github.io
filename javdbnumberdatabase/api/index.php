<?php
header('Content-Type: application/json');

/*
// api key
$validKeys = ['2964481261', '147258369'];

// 从 Header 获取 Authorization
$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
$apiKey = '';

// 如果有 Bearer token 格式，提取 key
if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    $apiKey = $matches[1];
}

// 验证 API Key
if (!in_array($apiKey, $validKeys)) {
    echo json_encode([
        'code' => 401,
        'message' => '无效的 API Key',
        'data' => null
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}
*/

// JSON 文件路径
$dataFile = __DIR__ . '/../db/db.json'; // 本地 JSON 文件

// 读取 JSON
$data = file_get_contents($dataFile);
if ($data === false) {
    echo json_encode([
        'code' => 500,
        'message' => '无法读取数据文件',
        'data' => []
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// 解析 JSON
$rawData = json_decode($data, true);
if (!is_array($rawData)) {
    echo json_encode([
        'code' => 500,
        'message' => 'JSON 解析失败或格式不正确',
        'data' => []
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// 扁平化数据并生成 type 字段，同时替换 fanhao => cod
$movies = [];
foreach ($rawData as $type => $items) {
    if (!is_array($items)) continue;

    foreach ($items as $item) {
        if (!is_array($item)) continue;

        $movies[] = [
            'code'  => $item['fanhao'] ?? '', // 替换 fanhao => code
            'title' => $item['title'] ?? '',
            'type'  => $type,
            'url'   => $item['url'] ?? '',
            'cover' => $item['cover'] ?? ''
        ];
    }
}

// 获取搜索参数
$q     = trim($_GET['q'] ?? '');
$code  = trim($_GET['code'] ?? '');
$title = trim($_GET['title'] ?? '');
$type  = trim($_GET['type'] ?? '');

$results = [];

// 遍历数据进行搜索
foreach ($movies as $movie) {
    $match = true;

    // q 模糊搜索 title/code/type
    if ($q !== '') {
        $match = false;
        foreach (['title','code','type'] as $field) {
            if (!empty($movie[$field]) && stripos($movie[$field], $q) !== false) {
                $match = true;
                break;
            }
        }
    }

    // 单独字段搜索
    if ($match && $code  !== '') $match = stripos($movie['code'], $code) !== false;
    if ($match && $title !== '') $match = stripos($movie['title'], $title) !== false;
    if ($match && $type  !== '') $match = stripos($movie['type'], $type) !== false;

    if ($match) $results[] = $movie;
}

// 返回 JSON
echo json_encode([
    'code' => 200,
    'message' => '成功',
    'data' => !empty($results) ? $results : null
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
